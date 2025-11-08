import { LuSlidersHorizontal, LuArrowUpDown } from "react-icons/lu";
import { DashNav } from "../components/navbar";
import { useState } from "react";
export default function Subscriptions() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSort, setSelectedSort] = useState("Name");
  const categories = [
    "All",
    "Productivity",
    "Streaming",
    "Education",
    "Gaming",
    "Storage",
  ];
  const sortValues = ["Name", "Category", "Cost", "Date"];
  const subscriptions = [
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
  ];
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const handleSortChange = (e) => {
    setSelectedSort(e.target.value);
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
      <main className="relative top-16 left-0 md:left-50 p-4 w-full md:w-[calc(100vw-200px)] flex flex-col gap-4">
        <header className="text-left">
          <h2 className="text-2xl md:text-3xl font-bold my-2">Subscriptions</h2>
          <p className="text-sm md:text-base">Manage all your subscriptions</p>
        </header>
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
                className="border border-border rounded-lg text-foreground w-full sm:w-32 h-8 px-2 text-sm"
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
                className="border border-border rounded-lg text-foreground w-full sm:w-32 h-8 px-2 text-sm"
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
            className="text-sm p-2 items-center flex bg-primary rounded-lg w-full sm:w-auto justify-center whitespace-nowrap"
          >
            + Add Subscription
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sortedSubscriptions.map((subscription, index) => (
            <div
              key={index}
              className="h-64 w-full border border-border rounded-2xl bg-border/40 hover:border-primary flex flex-col items-baseline justify-evenly p-4"
            >
              <div className="flex items-center justify-between w-full">
                <div className="p-2 rounded-lg bg-primary/20 aspect-square w-10 font-semibold">
                  {subscription.name[0]}
                </div>
                <div className="bg-background rounded-full px-3 text-xs md:text-sm text-muted-foreground py-1">
                  {subscription.category}
                </div>
              </div>
              <div className="text-base md:text-lg font-bold">{subscription.name}</div>
              <div className="text-xl md:text-2xl font-semibold">
                KSh {subscription.cost}{" "}
                <span className="text-muted-foreground text-sm md:text-md">
                  /{subscription.per}
                </span>
              </div>
              <div className="flex items-center justify-between w-full text-sm md:text-base">
                <div className="text-muted-foreground">Next Renewal</div>
                <div className="font-semibold">{subscription.date}</div>
              </div>
            </div>
          ))}
          {filteredSubscriptions.length === 0 && (
            <h3 className="text-lg md:text-xl font-semibold my-2">
              No Subscriptions found.
            </h3>
          )}
        </div>
      </main>
    </div>
  );
}
