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
      <main className="relative top-16 left-50 p-4 w-[calc(100vw-200px)] flex flex-col gap-4">
        <div className="text-left">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p>Overview of your subscription spending and upcoming renewals</p>
        </div>
        <div className="flex justify-evenly gap-4 h-30">
          <div className="w-1/4 h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuDollarSign className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-lg text-muted-foreground">
                Total Monthly Spending
              </h4>
              <h5 className="text-3xl font-semibold">KSh 7652</h5>
            </div>
          </div>
          <div className="w-1/4 h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuTrendingUp className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-lg text-muted-foreground">
                Yearly Projection
              </h4>
              <h5 className="text-3xl font-semibold">KSh 91824</h5>
            </div>
          </div>
          <div className="w-1/4 h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuCreditCard className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-lg text-muted-foreground">
                Active Subscriptions
              </h4>
              <h5 className="text-3xl font-semibold ">8</h5>
            </div>
          </div>
          <div className="w-1/4 h-full border border-border hover:border-primary rounded-2xl p-4 flex gap-4 items-center">
            <div className="p-2 bg-primary/20 rounded-lg w-fit h-fit">
              <LuInfo className="text-2xl text-primary" />
            </div>
            <div className="flex flex-col items-baseline">
              <h4 className="text-lg text-muted-foreground">Highest Cost</h4>
              <h5 className="text-3xl font-semibold">KSh 1130</h5>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full gap-4 h-100">
          <SpendingChart className="w-1/2 h-full" />
          <CategoryPie className="w-1/2 h-full border border-border rounded-2xl" />
        </div>
        <div className="rounded-2xl w-full h-110 border border-border flex flex-col p-4 items-start gap-4">
          <h3 className="text-2xl font-bold my-2">Upcoming Renewals</h3>
          <div className="w-full space-y-3 h-[85%] overflow-y-scroll">
            {renewals.map((r, i) => {
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
