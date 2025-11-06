import {
  LuDollarSign,
  LuTrendingUp,
  LuInfo,
  LuCreditCard,
} from "react-icons/lu";
import { CategoryPie, SpendingChart } from "../components/chart";
import { parse, differenceInCalendarDays, startOfDay } from "date-fns";
import { DashNav } from "../components/navbar";

export default function Dash() {
  const renewals = [
    { name: "Notion", date: "02/11/2025", amount: "KSh 800" },
    {
      name: "Spotify Premium",
      date: "04/11/2025",
      amount: "KSh 425",
    },
    { name: "Netflix", date: "07/11/2025", amount: "KSh 1400" },
    {
      name: "Adobe Creative Cloud",
      date: "14/11/2025",
      amount: "KSh 6200",
    },
  ];
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

  return (
    <div>
      <DashNav />
      <main className="relative top-16 left-0 md:left-50 p-4 w-full md:w-[calc(100vw-200px)] flex flex-col gap-4">
        <div className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold">Dashboard</h2>
          <p className="text-sm md:text-base">Overview of your subscription spending and upcoming renewals</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="w-full h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuDollarSign className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-sm md:text-lg text-muted-foreground">
                Total Monthly Spending
              </h4>
              <h5 className="text-2xl md:text-3xl font-semibold">KSh 7652</h5>
            </div>
          </div>
          <div className="w-full h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuTrendingUp className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-sm md:text-lg text-muted-foreground">
                Yearly Projection
              </h4>
              <h5 className="text-2xl md:text-3xl font-semibold">KSh 91824</h5>
            </div>
          </div>
          <div className="w-full h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuCreditCard className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-sm md:text-lg text-muted-foreground">
                Active Subscriptions
              </h4>
              <h5 className="text-2xl md:text-3xl font-semibold ">8</h5>
            </div>
          </div>
          <div className="w-full h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuInfo className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-sm md:text-lg text-muted-foreground">Highest Cost</h4>
              <h5 className="text-2xl md:text-3xl font-semibold">KSh 1130</h5>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center w-full gap-4 min-h-[400px]">
          <SpendingChart className="w-full lg:w-1/2 h-full" />
          <CategoryPie className="w-full lg:w-1/2 h-full border border-border rounded-2xl" />
        </div>
        <div className="rounded-2xl w-full min-h-[400px] border border-border flex flex-col p-4 items-start gap-4">
          <h3 className="text-xl md:text-2xl font-bold my-2">Upcoming Renewals</h3>
          <div className="w-full space-y-3 max-h-[350px] overflow-y-scroll">
            {renewals.map((r, i) => {
              const { tag, color } = getColorDate(r.date);
              return (
                <div
                  className="bg-border/50 w-full min-h-[72px] rounded-lg px-3 md:px-4 py-3 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0"
                  key={i}
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div
                      className={`aspect-square h-2 ${color} rounded-full flex-shrink-0`}
                    ></div>
                    <div className="flex-col flex items-baseline">
                      <h5 className="text-base md:text-lg">{r.name}</h5>
                      <p className="text-sm">{r.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 justify-between sm:justify-end w-full sm:w-auto pl-5 sm:pl-0">
                    <span className="bg-primary/10 p-1 px-2.5 rounded-full text-xs md:text-sm whitespace-nowrap">
                      {tag}
                    </span>
                    <span className="text-left w-20 md:w-24 font-semibold">{r.amount}</span>
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
