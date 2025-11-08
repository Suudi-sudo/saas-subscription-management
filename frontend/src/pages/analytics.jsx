import { DashNav } from "../components/navbar";

export default function Analytics() {
  return (
    <div>
      <DashNav />
      <main className="relative top-16 md:left-50 p-4 md:w-[calc(100vw-200px)] flex flex-col gap-4"></main>
    </div>
  );
}
