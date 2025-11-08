import { LuSlidersHorizontal } from "react-icons/lu";
import { DashNav } from "../components/navbar";
import { useState } from "react";
export default function Payments() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const statuses = ["All", "Pending", "Completed", "Failed"];
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  const payments = [
    {
      name: "Netflix",
      amount: "1400",
      date: "08/11/2025",
      status: "Completed",
      method: "Visa",
    },
    {
      name: "Github Pro",
      amount: "702",
      date: "12/11/2025",
      status: "Completed",
      method: "Mastercard",
    },
    {
      name: "Notion",
      amount: "280",
      date: "13/11/2025",
      status: "Completed",
      method: "Visa",
    },
    {
      name: "Spotify Premium",
      amount: "365",
      date: "17/11/2025",
      status: "Pending",
      method: "Mastercard",
    },
    {
      name: "Vercel Pro",
      amount: "900",
      date: "21/11/2025",
      status: "Pending",
      method: "Visa",
    },
    {
      name: "DropBox Plus",
      amount: "1250",
      date: "02/11/2025",
      status: "Failed",
      method: "Mastercard",
    },
  ];
  const filteredPayments =
    selectedStatus == "All"
      ? payments
      : payments.filter((pay) => pay.status == selectedStatus);
  return (
    <div>
      <DashNav />
      <main className="relative top-16 md:left-50 p-4 md:w-[calc(100vw-200px)] flex flex-col gap-4">
        <header className="text-left">
          <h2 className="text-3xl font-bold my-2">Payments</h2>
          <p>Track your subscription payment history</p>
        </header>
        <div className="w-full p-4 h-16 flex gap-4 border-border border rounded-lg items-center bg-border/40">
          <div className="flex items-center gap-2">
            <LuSlidersHorizontal />
            Filter
          </div>
          <select
            value={selectedStatus}
            onChange={handleStatusChange}
            className="border border-border rounded-lg text-foreground w-32 h-8 px-2 text-sm"
          >
            {statuses.map((status) => (
              <option value={status} key={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <table className="border-separate rounded-lg w-full border border-border bg-border/40 overflow-x-scroll">
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
              <tr key={payment.name} className="odd:bg-background/40 py-2">
                <td className=" pl-4 py-2">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-primary/20 aspect-square w-10 font-semibold">
                      {payment.name[0]}
                    </div>
                    {payment.name}
                  </div>
                </td>
                <td className="text-center pr-4 py-2">{payment.amount}</td>
                <td className="text-left pl-4 py-2">{payment.date}</td>
                <td
                  className={`text-left pl-4 py-2 ${payment.status == "Completed" ? "text-green-500" : payment.status == "Pending" ? "text-yellow-500" : "text-red-500"}`}
                >
                  {payment.status}
                </td>
                <td className="text-left pl-4 py-2">{payment.method}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
