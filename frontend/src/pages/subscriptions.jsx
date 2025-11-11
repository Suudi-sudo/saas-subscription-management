import { LuSlidersHorizontal, LuArrowUpDown } from "react-icons/lu";
import { DashNav } from "../components/navbar";
import { useState, useEffect } from "react";

export default function Subscriptions() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("renewal");
  const [showPopUp, setShowPopUp] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  const [newSub, setNewSub] = useState({
    name: "",
    category: "",
    cost: "",
    billingCycle: "monthly",
    nextRenewalDate: "",
  });

  const API_BASE_URL = "https://saas-subscription-management.onrender.com";

  // Use the exact same categories that your backend expects
  const categories = [
    "All",
    "Productivity",
    "Entertainment", // Changed from "Streaming"
    "Education", 
    "Utilities", // Changed from "Gaming"
    "Software", // Changed from "Storage"
  ];

  // Categories for the dropdown (without "All")
  const categoryOptions = categories.filter(c => c !== "All");

  const sortValues = [
    { value: "name", label: "Name" },
    { value: "category", label: "Category" },
    { value: "cost", label: "Cost" },
    { value: "renewal", label: "Date" }
  ];

  // Fetch subscriptions from backend
  const fetchSubscriptions = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/subscriptions`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions');
      }

      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      if (error.name === 'AbortError') {
        setError("Request timeout - backend server may be down");
      } else {
        console.error('Error fetching subscriptions:', error);
        setError("Failed to load subscriptions");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };

  const handleAddSubscription = async (e) => {
    e.preventDefault();
    
    if (!newSub.name || !newSub.category || !newSub.cost || !newSub.nextRenewalDate) {
      setError("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      const subscriptionData = {
        name: newSub.name,
        category: newSub.category,
        cost: parseFloat(newSub.cost),
        billingCycle: newSub.billingCycle,
        nextRenewalDate: newSub.nextRenewalDate,
        isActive: true
      };

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/subscriptions`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscriptionData),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create subscription');
      }

      // Refresh the subscriptions list
      await fetchSubscriptions();
      
      // Reset form and close modal - FIXED: This was missing
      setNewSub({ 
        name: "", 
        category: "", 
        cost: "", 
        billingCycle: "monthly", 
        nextRenewalDate: "" 
      });
      setShowPopUp(false); // FIXED: Close the modal after successful addition
      setError("");
    } catch (error) {
      if (error.name === 'AbortError') {
        setError("Request timeout - failed to create subscription");
      } else {
        console.error('Error creating subscription:', error);
        setError(error.message || "Failed to create subscription");
      }
    }
  };

  const handleDeleteSubscription = async (subscriptionId) => {
    try {
      const token = localStorage.getItem("authToken");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/subscriptions/${subscriptionId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to delete subscription');
      }

      // Refresh the subscriptions list
      await fetchSubscriptions();
    } catch (error) {
      if (error.name === 'AbortError') {
        setError("Request timeout - failed to delete subscription");
      } else {
        console.error('Error deleting subscription:', error);
        setError("Failed to delete subscription");
      }
    }
  };

  // Filter subscriptions based on selected category
  const filteredSubscriptions = selectedCategory === "All" 
    ? subscriptions 
    : subscriptions.filter((sub) => sub.category === selectedCategory);

  // Sort subscriptions based on selected sort
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    switch (selectedSort) {
      case "name":
        return a.name.localeCompare(b.name);
      case "category":
        return a.category.localeCompare(b.category);
      case "cost":
        return a.cost - b.cost;
      case "renewal":
        return new Date(a.nextRenewalDate) - new Date(b.nextRenewalDate);
      default:
        return 0;
    }
  });

  // Format date from ISO to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Format billing cycle for display
  const getBillingDisplay = (billingCycle) => {
    return billingCycle === "monthly" ? "mo" : "yr";
  };

  if (loading) {
    return (
      <div>
        <DashNav />
        <main className="relative top-16 left-0 md:left-50 p-4 w-full md:w-[calc(100vw-200px)] flex flex-col gap-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading subscriptions...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <DashNav />
      <main className="relative top-16 left-0 md:left-50 p-4 w-full md:w-[calc(100vw-200px)] flex flex-col gap-4">
        <header className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold my-2">Subscriptions</h2>
          <p className="text-sm md:text-base">Manage all your subscriptions</p>
        </header>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="w-full p-3 md:p-4 min-h-16 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0 border-border border rounded-lg items-start sm:items-center bg-border/40">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8 w-full sm:w-auto">
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
                <LuSlidersHorizontal />
                Filters
              </div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-border rounded-lg text-foreground w-full sm:w-32 h-8 px-2 text-sm bg-transparent"
              >
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
                <LuArrowUpDown />
                Sort
              </div>
              <select
                value={selectedSort}
                onChange={handleSortChange}
                className="border border-border rounded-lg text-foreground w-full sm:w-32 h-8 px-2 text-sm bg-transparent"
              >
                {sortValues.map((sort) => (
                  <option value={sort.value} key={sort.value}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPopUp(true)}
            className="text-sm p-2 items-center flex bg-primary rounded-lg w-full sm:w-auto justify-center whitespace-nowrap"
          >
            + Add Subscription
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedSubscriptions.map((subscription) => (
            <div
              key={subscription._id}
              className="h-64 w-full border border-border rounded-2xl bg-border/40 hover:border-primary flex flex-col items-baseline justify-evenly p-4"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-2 rounded-lg bg-primary/20 aspect-square w-10 font-semibold flex items-center justify-center">
                  {subscription.name[0]}
                </div>
                <div className="bg-background rounded-full px-3 text-xs md:text-sm text-muted-foreground py-1">
                  {subscription.category}
                </div>
              </div>
              <div className="text-base md:text-lg font-bold">
                {subscription.name}
              </div>
              <div className="text-xl md:text-2xl font-semibold">
                KSh {subscription.cost}{" "}
                <span className="text-muted-foreground text-sm md:text-md">
                  /{getBillingDisplay(subscription.billingCycle)}
                </span>
              </div>
              <div className="flex items-center justify-between w-full text-sm md:text-base">
                <div className="text-muted-foreground">Next Renewal</div>
                <div className="font-semibold">{formatDate(subscription.nextRenewalDate)}</div>
              </div>
              <div className="flex items-center justify-between w-full mt-2">
                <button
                  onClick={() => handleDeleteSubscription(subscription._id)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Delete
                </button>
                <div className={`text-xs px-2 py-1 rounded ${subscription.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {subscription.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
            </div>
          ))}
          
          {sortedSubscriptions.length === 0 && (
            <div className="col-span-full flex justify-center items-center h-32">
              <h3 className="text-lg md:text-xl font-semibold text-muted-foreground">
                No subscriptions found.
              </h3>
            </div>
          )}
        </div>

        {showPopUp && (
          <div className="fixed inset-0 bg-black/60 z-345 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#11131a] border border-border rounded-2xl p-6 w-[90%] max-w-xl flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Add Subscription</h3>
              <form onSubmit={handleAddSubscription} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.name}
                  onChange={(e) => setNewSub({ ...newSub, name: e.target.value })}
                  required
                />
                <select
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.category}
                  onChange={(e) => setNewSub({ ...newSub, category: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Cost (KSh)"
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.cost}
                  onChange={(e) => setNewSub({ ...newSub, cost: e.target.value })}
                  step="0.01"
                  min="0"
                  required
                />
                <select
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.billingCycle}
                  onChange={(e) => setNewSub({ ...newSub, billingCycle: e.target.value })}
                  required
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
                <input
                  type="date"
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.nextRenewalDate}
                  onChange={(e) => setNewSub({ ...newSub, nextRenewalDate: e.target.value })}
                  required
                />
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPopUp(false)}
                    className="border border-border rounded-lg px-4 py-2 hover:bg-border/30"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-primary rounded-lg px-4 py-2 hover:opacity-90"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}