import { LuSlidersHorizontal, LuArrowUpDown } from "react-icons/lu";
import { DashNav } from "../components/navbar";
import { useState } from "react";
export default function Subscriptions() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Name");
  const [showPopUp, setShowPopUp] = useState(false);
  const [newSub, setNewSub] = useState({
    name: "",
    category: "",
    cost: "",
    date: "",
    per: "mo",
  });
  const categories = [
    "All",
    "Productivity",
    "Streaming",
    "Education",
    "Gaming",
    "Storage",
  ];
  const sortValues = ["Name", "Category", "Cost", "Date"];
  const [subscriptions, setSubscriptions] = useState([
    {
      name: "Netflix",
      category: "Streaming",
      cost: "1400",
      date: "25/11/2025",
      per: "mo",
    },
    {
      name: "Notion",
      category: "Productivity",
      cost: "450",
      date: "06/11/2025",
      per: "yr",
    },
    {
      name: "Spotify",
      category: "Streaming",
      cost: "320",
      date: "17/11/2025",
      per: "mo",
    },
    {
      name: "DropBox Plus",
      category: "Storage",
      cost: "600",
      date: "05/11/2025",
      per: "yr",
    },
  ]);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
  };
  const handleAddSubscription = (e) => {
    e.preventDefault();
    if (!newSub.name || !newSub.category || !newSub.cost || !newSub.date)
      return;
    setSubscriptions([...subscriptions, newSub]);
    setNewSub({ name: "", category: "", cost: "", date: "", per: "mo" });
    setShowPopUp(false);
  };
  const filteredSubscriptions =
    selectedCategory === "All"
      ? subscriptions
      : subscriptions.filter((sub) => sub.category == selectedCategory);
  const sortedSubscriptions = [...filteredSubscriptions].sort((a, b) => {
    switch (selectedSort) {
      case "Name":
        return a.name.localeCompare(b.name);
      case "Category":
        return a.category.localeCompare(b.category);
      case "Cost":
        return parseFloat(a.cost) - parseFloat(b.cost);
      case "Date":
        const [dayA, monthA, yearA] = a.date.split("/").map(Number);
        const [dayB, monthB, yearB] = b.date.split("/").map(Number);
        return (
          new Date(yearA, monthA - 1, dayA) - new Date(yearB, monthB - 1, dayB)
        );
      default:
        return 0;
    }
  });
  return (
    <div>
      <DashNav />
      <main className="relative top-16 left-50 p-4 w-[calc(100vw-200px)] flex flex-col gap-4">
        <header className="text-left">
          <h2 className="text-3xl font-bold my-2">Subscriptions</h2>
          <p>Manage all your subscriptions</p>
        </header>
        <div className="w-full p-4 h-16 flex justify-between border-border border rounded-lg items-center bg-border/40">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LuSlidersHorizontal />
                Filters
              </div>
              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-border rounded-lg text-foreground w-32 h-8 px-2 text-sm"
              >
                {categories.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <LuArrowUpDown />
                Sort
              </div>
              <select
                value={selectedSort}
                onChange={handleSortChange}
                className="border border-border rounded-lg text-foreground w-32 h-8 px-2 text-sm"
              >
                {sortValues.map((sort) => (
                  <option value={sort} key={sort} className=" accent-primary">
                    {sort}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowPopUp(true)}
            className="text-sm p-2 items-center flex bg-primary"
          >
            + Add Subscription
          </button>
        </div>
        <div className="flex items-center gap-4 flex-wrap">
          {sortedSubscriptions.map((subscription, index) => (
            <div
              key={index}
              className="h-64 w-[90%] min-w-60 max-w-90 md:w-[45%] border border-border rounded-2xl bg-border/40 hover:border-primary flex flex-col items-baseline justify-evenly p-4"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-2 rounded-lg bg-primary/20 aspect-square w-10 font-semibold">
                  {subscription.name[0]}
                </div>
                <div className="bg-background rounded-full px-3 text-sm text-muted-foreground py-1">
                  {subscription.category}
                </div>
              </div>
              <div className="text-lg font-bold">{subscription.name}</div>
              <div className="text-2xl font-semibold">
                KSh {subscription.cost}{" "}
                <span className="text-muted-foreground text-md">
                  /{subscription.per}
                </span>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="text-muted-foreground">Next Renewal</div>
                <div className="font-semibold">{subscription.date}</div>
              </div>
            </div>
          ))}
          {filteredSubscriptions.length === 0 && (
            <h3 className="text-xl font-semibold my-2">
              No Subscriptions found.
            </h3>
          )}
        </div>
        {showPopUp && (
          <div className="fixed inset-0 bg-black/60 z-345 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-[#11131a] border border-border rounded-2xl p-6 w-[90%] max-w-xl flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Add Subscription</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddSubscription(e);
                }}
                className="flex flex-col gap-4"
              >
                <input
                  type="text"
                  placeholder="Name"
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.name}
                  onChange={(e) =>
                    setNewSub({ ...newSub, name: e.target.value })
                  }
                />
                <select
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.category}
                  onChange={(e) =>
                    setNewSub({ ...newSub, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories
                    .filter((c) => c !== "All")
                    .map((category) => (
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
                  onChange={(e) =>
                    setNewSub({ ...newSub, cost: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Renewal Date (DD/MM/YYYY)"
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.date}
                  onChange={(e) =>
                    setNewSub({ ...newSub, date: e.target.value })
                  }
                />
                <select
                  className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
                  value={newSub.per}
                  onChange={(e) =>
                    setNewSub({ ...newSub, per: e.target.value })
                  }
                >
                  <option value="mo">Monthly</option>
                  <option value="yr">Yearly</option>
                </select>
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
                    className="bg-primary rounded-lg px-4 py-2"
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
