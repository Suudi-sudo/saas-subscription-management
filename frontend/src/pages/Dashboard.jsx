import { CategoryPie, SpendingChart } from "../components/chart";
import { DashNav } from "../components/navbar";

export default function Dash() {
  return (
    <div>
      <DashNav />
      <main className="relative top-16 left-50 p-4 w-[calc(100vw-200px)] flex flex-col gap-4">
        <div className="text-left">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p>Overview of your subscription spending and upcoming renewals</p>
        </div>
        <div className="flex justify-evenly gap-4">
          <div className="w-1/4 h-46 border border-border hover:border-primary rounded-2xl"></div>
          <div className="w-1/4 h-46 border border-border hover:border-primary rounded-2xl"></div>
          <div className="w-1/4 h-46 border border-border hover:border-primary rounded-2xl"></div>
          <div className="w-1/4 h-46 border border-border hover:border-primary rounded-2xl"></div>
        </div>
        <div className="flex items-center w-full gap-4 h-100">
          <SpendingChart className="w-1/2 h-full" />
          <CategoryPie className="w-1/2 h-full border border-border rounded-2xl" />
        </div>
      </main>
    </div>
  );
}
