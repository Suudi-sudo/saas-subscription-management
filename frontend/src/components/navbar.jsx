import { useState } from "react";
import {
  BiBarChart,
  BiChevronLeft,
  BiChevronRight,
  BiCreditCard,
  BiDollar,
  BiMoney,
  BiSolidDashboard,
} from "react-icons/bi";
import { IoMenu } from "react-icons/io5";
import { LuX } from "react-icons/lu";
import { TfiLayoutGrid2 } from "react-icons/tfi";
function TopNav({ className, drawerOpen, setDrawerOpen }) {
  return (
    <div
      className={`w-full h-16 fixed top-0 left-0 bg-background/60 backdrop-blur-lg z-100 border-border border-b flex justify-between px-6 items-center ${className}`}
    >
      <a href="#Hero" className="flex items-center gap-1.5">
        <img src="/logo.png" className="h-8" />
        <h1 className="font-grotesk text-2xl">Billiance</h1>
      </a>
      <div className="hidden sm:flex items-center max-w-[300px] min-w-[270px] w-[36%] justify-between">
        <a href="#Features">Features</a>
        <a href="#Pricing">Pricing</a>
        <a href="/auth" className="primary-link">
          Get Started
        </a>
      </div>
      <button
        className="text-white px-3 py-1 sm:hidden"
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <IoMenu className="size-7" />
      </button>
    </div>
  );
}
function MobileNav({ className, drawerOpen, setDrawerOpen }) {
  return (
    <div
      className={`w-[80%] h-screen fixed z-101 top-0 bg-background border-l flex flex-col border-border ${drawerOpen ? "right-0" : "-right-full"} ${className} transition-all duration-300 p-5 gap-4 items-end`}
    >
      <button onClick={() => setDrawerOpen(!drawerOpen)} className="w-fit p-1">
        <LuX className="size-8" />
      </button>
      <a href="#Features" className="text-left w-full text-lg">
        Features
      </a>
      <a href="#Pricing" className="text-left w-full text-lg">
        Pricing
      </a>
      <a href="/auth" className="text-left w-full text-lg primary-link">
        Get Started
      </a>
    </div>
  );
}
export function NavContainer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <TopNav drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <MobileNav drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}

export function SideNav() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <aside
      className={`fixed left-0 h-[calc(100vh-32px)] my-4 ${collapsed ? "w-20" : "w-60"} rounded-r-2xl border border-border p-4 transition !duration-700 flex flex-col gap-16`}
    >
      <header
        className={`flex items-center justify-between w-full ${collapsed ? "flex-col gap-2" : " border-b border-border"} py-2`}
      >
        <a>
          <img src="/logo.png" className="h-8" />
        </a>
        <button
          onClick={() => setCollapsed(true)}
          className={`${collapsed ? "hidden" : "block"} !border-muted-foreground`}
        >
          <BiChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={() => setCollapsed(false)}
          className={`${collapsed ? "block" : "hidden"} !border-muted-foreground`}
        >
          <BiChevronRight className="text-2xl" />
        </button>
      </header>
      <nav className="w-full flex flex-col items-center gap-2">
        <a
          className={`flex items-center  ${!collapsed ? "justify-baseline gap-2" : "justify-center"} w-full`}
        >
          <BiSolidDashboard className="text-2xl" />
          <div className={`${collapsed ? "hidden" : "block"}`}>Dashboard</div>
        </a>
        <a
          className={`flex items-center  ${!collapsed ? "justify-baseline gap-2" : "justify-center"} w-full`}
        >
          <BiCreditCard className="text-2xl" />
          <div className={`${collapsed ? "hidden" : "block"}`}>
            Subscriptions
          </div>
        </a>
        <a
          className={`flex items-center  ${!collapsed ? "justify-baseline gap-2" : "justify-center"} w-full`}
        >
          <BiDollar className="text-2xl" />
          <div className={`${collapsed ? "hidden" : "block"}`}>Payments</div>
        </a>
        <a
          className={`flex items-center  ${!collapsed ? "justify-baseline gap-2" : "justify-center"} w-full`}
        >
          <BiBarChart className="text-2xl" />
          <div className={`${collapsed ? "hidden" : "block"}`}>Analytics</div>
        </a>
      </nav>
    </aside>
  );
}
