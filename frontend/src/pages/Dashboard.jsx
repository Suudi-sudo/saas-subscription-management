import {
  LuDollarSign,
  LuTrendingUp,
  LuInfo,
  LuCreditCard,
} from "react-icons/lu";
import { CategoryPie, SpendingChart } from "../components/chart";
import { parse, differenceInCalendarDays, startOfDay } from "date-fns";
import { DashNav } from "../components/navbar";
import { useState, useEffect } from "react";

function Dashboard() {
  const [overview, setOverview] = useState({
    totalMonthly: 7652,
    totalYearly: 91824,
    activeSubscriptions: 8,
    highestCost: "N/A",
    highestCostAmount: 1130,
    categorySpending: {}
  });
  const [renewals, setRenewals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_BASE_URL = "https://saas-subscription-management.onrender.com";

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setError("No authentication token found");
        return;
      }

      // Fetch overview data
      const overviewController = new AbortController();
      const overviewTimeout = setTimeout(() => overviewController.abort(), 15000);

      const overviewResponse = await fetch(`${API_BASE_URL}/api/analytics/overview`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: overviewController.signal
      });

      clearTimeout(overviewTimeout);

      if (overviewResponse.ok) {
        const overviewData = await overviewResponse.json();
        setOverview(overviewData);
      } else {
        console.warn('Failed to fetch overview data');
      }

      // Fetch upcoming renewals
      const renewalsController = new AbortController();
      const renewalsTimeout = setTimeout(() => renewalsController.abort(), 15000);

      const renewalsResponse = await fetch(`${API_BASE_URL}/api/subscriptions/upcoming/renewals`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        signal: renewalsController.signal
      });

      clearTimeout(renewalsTimeout);

      if (renewalsResponse.ok) {
        const renewalsData = await renewalsResponse.json();
        setRenewals(renewalsData);
      } else {
        console.warn('Failed to fetch renewals data');
      }

    } catch (error) {
      if (error.name === 'AbortError') {
        setError("Request timeout - please check your internet connection");
      } else {
        console.error('Error fetching dashboard data:', error);
        setError("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const todate = startOfDay(new Date());
  const getColorDate = (dateStr) => {
    const date = parse(dateStr, "dd/MM/yyyy", new Date());
    const diff = differenceInCalendarDays(date, todate);
    let tag, color;
    if (diff == 0) {
      tag = "Today";
      color = "bg-red-500";
    } else {
      tag = `${diff} day${diff > 1 ? "s" : ""}`;
      if (diff < 3) color = "bg-red-500";
      else if (diff < 7) color = "bg-yellow-500";
      else color = "bg-green-500";
    }
    return { tag, color };
  };

  // Format date from ISO to DD/MM/YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Use real renewals data if available, otherwise use mock data
  const displayRenewals = renewals.length > 0 ? renewals.map(renewal => ({
    name: renewal.name,
    date: formatDate(renewal.nextRenewalDate),
    amount: `KSh ${renewal.cost}`
  })) : [
    { name: "Notion", date: "02/11/2025", amount: "KSh 800" },
    { name: "Spotify Premium", date: "04/11/2025", amount: "KSh 425" },
    { name: "Netflix", date: "07/11/2025", amount: "KSh 1400" },
    { name: "Adobe Creative Cloud", date: "14/11/2025", amount: "KSh 6200" },
  ];

  if (loading) {
    return (
      <div>
        <DashNav />
        <main className="relative top-16 md:left-50 p-4 md:w-[calc(100vw-200px)] flex flex-col gap-4">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading dashboard...</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div>
      <DashNav />
      <main className="relative top-16 md:left-50 p-4 md:w-[calc(100vw-200px)] flex flex-col gap-4">
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        <div className="text-left">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p>Overview of your subscription spending and upcoming renewals</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div className="w-full h-full border border-border bg-border/40 hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuDollarSign className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline text-left">
              <h4 className="text-lg text-muted-foreground">
                Total Monthly Spending
              </h4>
              <h5 className="text-3xl font-semibold">KSh {overview.totalMonthly}</h5>
            </div>
          </div>
          <div className="w-full h-full border border-border bg-border/40 hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuTrendingUp className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline text-left">
              <h4 className="text-lg text-muted-foreground">
                Yearly Projection
              </h4>
              <h5 className="text-3xl font-semibold">KSh {overview.totalYearly}</h5>
            </div>
          </div>
          <div className="w-full h-full border border-border bg-border/40 hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuCreditCard className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline text-left">
              <h4 className="text-lg text-muted-foreground">
                Active Subscriptions
              </h4>
              <h5 className="text-3xl font-semibold ">{overview.activeSubscriptions}</h5>
            </div>
          </div>
          <div className="w-full h-full border border-border bg-border/40 hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuInfo className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline text-left">
              <h4 className="text-lg text-muted-foreground">Highest Cost</h4>
              <h5 className="text-3xl font-semibold">KSh {overview.highestCostAmount}</h5>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full gap-4 h-200 lg:h-100">
          <SpendingChart className="w-full lg:w-1/2 h-full" />
          <CategoryPie className="lg:w-1/2 w-full h-full border border-border rounded-2xl" />
        </div>
        <div className="rounded-2xl w-full h-110 border border-border flex flex-col p-4 items-start gap-4">
          <h3 className="text-2xl font-bold my-2">Upcoming Renewals</h3>
          <div className="w-full space-y-3 h-[85%] overflow-y-scroll">
            {displayRenewals.map((r, i) => {
              const { tag, color } = getColorDate(r.date);
              return (
                <div
                  className="bg-border/50 w-full h-18 rounded-lg px-4 flex justify-between items-center"
                  key={i}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`aspect-square h-2 ${color} rounded-full`}
                    ></div>
                    <div className="flex-col flex items-baseline">
                      <h5 className="text-lg">{r.name}</h5>
                      <p>{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 justify-between">
                    <span className="bg-primary/10 p-1 px-2.5 rounded-full text-sm w-18">
                      {tag}
                    </span>
                    <span className=" text-left w-20">{r.amount}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;