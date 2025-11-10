import { LuSlidersHorizontal, LuPlus } from "react-icons/lu";
import { DashNav } from "../components/navbar";
import { useState, useEffect } from "react";

// Add Payment Modal Component
function AddPaymentModal({ show, onClose, onPaymentAdded }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [paymentData, setPaymentData] = useState({
    subscriptionId: "",
    amount: "",
    paymentDate: new Date().toISOString().split('T')[0],
    paymentMethod: "Visa",
    notes: ""
  });

  const API_BASE_URL = "https://saas-subscription-management.onrender.com";

  // Fetch subscriptions for dropdown
  const fetchSubscriptions = async () => {
    try {
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

      if (response.ok) {
        const data = await response.json();
        setSubscriptions(data);
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        setError("Request timeout - failed to load subscriptions");
      } else {
        console.error('Error fetching subscriptions:', error);
      }
    }
  };

  useEffect(() => {
    if (show) {
      fetchSubscriptions();
      // Reset form when modal opens
      setPaymentData({
        subscriptionId: "",
        amount: "",
        paymentDate: new Date().toISOString().split('T')[0],
        paymentMethod: "Visa",
        notes: ""
      });
      setError("");
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!paymentData.subscriptionId || !paymentData.amount) {
      setError("Please fill all required fields");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("authToken");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/payments`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...paymentData,
          amount: parseFloat(paymentData.amount)
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment');
      }

      const createdPayment = await response.json();
      onPaymentAdded(createdPayment);
      onClose();
    } catch (error) {
      if (error.name === 'AbortError') {
        setError("Request timeout - failed to create payment");
      } else {
        console.error('Error creating payment:', error);
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-[#11131a] border border-border rounded-2xl p-6 w-[90%] max-w-md flex flex-col gap-4">
        <h3 className="text-xl font-semibold">Add Manual Payment</h3>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <select
            className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
            value={paymentData.subscriptionId}
            onChange={(e) => setPaymentData({ ...paymentData, subscriptionId: e.target.value })}
            required
          >
            <option value="">Select Subscription</option>
            {subscriptions.map((sub) => (
              <option key={sub._id} value={sub._id}>
                {sub.name} - KSh {sub.cost}
              </option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Amount (KSh)"
            className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
            value={paymentData.amount}
            onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
            step="0.01"
            min="0"
            required
          />

          <input
            type="date"
            className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
            value={paymentData.paymentDate}
            onChange={(e) => setPaymentData({ ...paymentData, paymentDate: e.target.value })}
            required
          />

          <select
            className="h-10 px-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent"
            value={paymentData.paymentMethod}
            onChange={(e) => setPaymentData({ ...paymentData, paymentMethod: e.target.value })}
            required
          >
            <option value="Visa">Visa</option>
            <option value="Mastercard">Mastercard</option>
            <option value="M-Pesa">M-Pesa</option>
            <option value="PayPal">PayPal</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
          </select>

          <textarea
            placeholder="Notes (optional)"
            className="h-20 px-2 py-2 rounded-lg border border-border outline-none focus:border-primary bg-transparent resize-none"
            value={paymentData.notes}
            onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-border rounded-lg px-4 py-2 hover:bg-border/30"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-primary rounded-lg px-4 py-2 hover:opacity-90 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Payments Component
export default function Payments() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddPayment, setShowAddPayment] = useState(false);

  const API_BASE_URL = "https://saas-subscription-management.onrender.com";

  const statuses = ["All", "Pending", "Completed", "Failed"];

  // Fetch payments from backend
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const response = await fetch(`${API_BASE_URL}/api/payments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error('Failed to fetch payments');
      }

      const data = await response.json();
      setPayments(data.payments || data);
    } catch (error) {
      if (error.name === 'AbortError') {
        setError("Request timeout - backend server may be down");
      } else {
        console.error('Error fetching payments:', error);
        setError("Failed to load payments");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handlePaymentAdded = (newPayment) => {
    setPayments(prev => [newPayment, ...prev]);
  };

  // Format date from ISO to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get subscription name from populated data or payment data
  const getSubscriptionName = (payment) => {
    if (payment.subscriptionId && typeof payment.subscriptionId === 'object') {
      return payment.subscriptionId.name;
    }
    return payment.subscriptionName || 'Unknown Subscription';
  };

  // Get first letter for avatar
  const getFirstLetter = (payment) => {
    const name = getSubscriptionName(payment);
    return name ? name[0].toUpperCase() : '?';
  };

  // Filter payments based on selected status
  const filteredPayments = selectedStatus === "All" 
    ? payments 
    : payments.filter((payment) => payment.status.toLowerCase() === selectedStatus.toLowerCase());

  if (loading) {
    return (
      <div>
        <DashNav />
        <main className="relative top-16 md:left-50 p-4 md:w-[calc(100vw-200px)] flex flex-col gap-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading payments...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <DashNav />
      <main className="relative top-16 md:left-50 p-4 md:w-[calc(100vw-200px)] flex flex-col gap-4">
        <header className="text-left">
          <h2 className="text-3xl font-bold my-2">Payments</h2>
          <p>Track your subscription payment history</p>
        </header>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg">
            {error}
          </div>
        )}

        <div className="w-full p-4 min-h-16 flex flex-col sm:flex-row justify-between gap-4 border-border border rounded-lg items-start sm:items-center bg-border/40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LuSlidersHorizontal />
              Filter
            </div>
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="border border-border rounded-lg text-foreground w-32 h-8 px-2 text-sm bg-transparent"
            >
              {statuses.map((status) => (
                <option value={status} key={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => setShowAddPayment(true)}
            className="flex items-center gap-2 bg-primary rounded-lg px-4 py-2 hover:opacity-90 whitespace-nowrap"
          >
            <LuPlus className="text-lg" />
            Add Payment
          </button>
        </div>

        {payments.length === 0 ? (
          <div className="flex justify-center items-center h-32">
            <div className="text-lg text-muted-foreground">
              No payment history found.
            </div>
          </div>
        ) : (
          <div className="border-separate rounded-lg w-full border border-border bg-border/40 overflow-x-auto">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className="text-left pl-4 py-1.5">Subscription</th>
                  <th className="text-center pr-4 py-1.5">Amount</th>
                  <th className="text-left pl-4 py-1.5">Date</th>
                  <th className="text-left pl-4 py-1.5">Status</th>
                  <th className="text-left pl-4 py-1.5">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment._id} className="odd:bg-background/40 py-2">
                    <td className="pl-4 py-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/20 aspect-square w-10 font-semibold flex items-center justify-center">
                          {getFirstLetter(payment)}
                        </div>
                        {getSubscriptionName(payment)}
                      </div>
                    </td>
                    <td className="text-center pr-4 py-2">KSh {payment.amount}</td>
                    <td className="text-left pl-4 py-2">{formatDate(payment.paymentDate)}</td>
                    <td
                      className={`text-left pl-4 py-2 ${
                        payment.status.toLowerCase() === "completed" 
                          ? "text-green-500" 
                          : payment.status.toLowerCase() === "pending" 
                          ? "text-yellow-500" 
                          : "text-red-500"
                      }`}
                    >
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </td>
                    <td className="text-left pl-4 py-2">
                      {payment.paymentMethod || 'Not specified'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredPayments.length === 0 && payments.length > 0 && (
          <div className="flex justify-center items-center h-32">
            <div className="text-lg text-muted-foreground">
              No payments found with status: {selectedStatus}
            </div>
          </div>
        )}

        <AddPaymentModal 
          show={showAddPayment}
          onClose={() => setShowAddPayment(false)}
          onPaymentAdded={handlePaymentAdded}
        />
      </main>
    </div>
  );
}