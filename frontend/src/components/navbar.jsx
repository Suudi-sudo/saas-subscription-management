import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import {
  LuBadgeDollarSign,
  LuChartColumn,
  LuCreditCard,
  LuLayoutDashboard,
  LuLogOut,
  LuSearch,
  LuSettings,
  LuX,
} from "react-icons/lu";
import { useNavigate, Link } from "react-router-dom";

const userName = "User";

function LandingNav({ className, drawerOpen, setDrawerOpen }) {
  return (
    <div
      className={`w-full h-16 fixed top-0 left-0 bg-background/60 backdrop-blur-lg z-100 border-border border-b flex justify-between px-6 items-center ${className}`}
    >
      <Link to="/" className="flex items-center gap-1.5">
        <img src="/logo.png" className="h-8" />
        <h1 className="font-grotesk text-2xl">Billiance</h1>
      </Link>
      <div className="hidden sm:flex items-center max-w-[300px] min-w-[270px] w-[36%] justify-between">
        <a href="#Features">Features</a>
        <a href="#Pricing">Pricing</a>
        <Link to="/login" className="primary-link">
          Get Started
        </Link>
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
      <Link to="/login" className="text-left w-full text-lg primary-link">
        Get Started
      </Link>
    </div>
  );
}

export function NavContainer() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <LandingNav drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
      <MobileNav drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}

function SideNav({ isMobileMenuOpen, setMobileMenuOpen }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex fixed left-0 w-50 h-screen bg-border/30 border-r border-border p-4 flex-col gap-6`}
      >
        <Link className="flex items-center gap-2" to="/">
          <img src="/logo.png" className="h-8" />
          <h1 className="font-grotesk text-2xl">Billiance</h1>
        </Link>
        <nav className="w-full flex flex-col items-center gap-4 p-2">
          <Link className={`flex items-center gap-2 w-full`} to="/dashboard">
            <LuLayoutDashboard className="text-2xl" />
            <div className={`text-lg`}>Dashboard</div>
          </Link>
          <Link className={`flex items-center gap-2 w-full`} to="/subscriptions">
            <LuCreditCard className="text-2xl" />
            <div className={`text-lg`}>Subscriptions</div>
          </Link>
          <Link className={`flex items-center gap-2 w-full`} to="/payments">
            <LuBadgeDollarSign className="text-2xl" />
            <div className={`text-lg`}>Payments</div>
          </Link>
          <Link className={`flex items-center  gap-2 w-full`} to="/analytics">
            <LuChartColumn className="text-2xl" />
            <div className={`text-lg`}>Analytics</div>
          </Link>
          <Link className={`flex items-center gap-2 w-full`} to="/settings">
            <LuSettings className="text-2xl" />
            <div className={`text-lg`}>Settings</div>
          </Link>
        </nav>
        <div className="flex items-center gap-2 absolute bottom-8">
          <div className="aspect-square h-12 rounded-full border border-border bg-primary/30 flex items-center justify-center">
            {userName[0]}
          </div>
          <button
            type="button"
            className="!border-none hover:text-muted-foreground"
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/login");
            }}
          >
            Sign Out
            <LuLogOut />
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`md:hidden fixed left-0 w-64 h-screen bg-background border-r border-border p-4 flex flex-col gap-6 z-50 transition-transform duration-300 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link className="flex items-center gap-2" to="/">
            <img src="/logo.png" className="h-8" />
            <h1 className="font-grotesk text-2xl">Billiance</h1>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 md:hidden"
          >
            <LuX className="size-6" />
          </button>
        </div>
        <nav className="w-full flex flex-col items-center gap-4 p-2">
          <Link
            className={`flex items-center gap-2 w-full`}
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LuLayoutDashboard className="text-2xl" />
            <div className={`text-lg`}>Dashboard</div>
          </Link>
          <Link
            className={`flex items-center gap-2 w-full`}
            to="/subscriptions"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LuCreditCard className="text-2xl" />
            <div className={`text-lg`}>Subscriptions</div>
          </Link>
          <Link
            className={`flex items-center gap-2 w-full`}
            to="/payments"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LuBadgeDollarSign className="text-2xl" />
            <div className={`text-lg`}>Payments</div>
          </Link>
          <Link
            className={`flex items-center  gap-2 w-full`}
            to="/analytics"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LuChartColumn className="text-2xl" />
            <div className={`text-lg`}>Analytics</div>
          </Link>
          <Link
            className={`flex items-center gap-2 w-full`}
            to="/settings"
            onClick={() => setMobileMenuOpen(false)}
          >
            <LuSettings className="text-2xl" />
            <div className={`text-lg`}>Settings</div>
          </Link>
        </nav>
        <div className="flex items-center gap-2 absolute bottom-8">
          <div className="aspect-square h-12 rounded-full border border-border bg-primary/30 flex items-center justify-center">
            {userName[0]}
          </div>
          <button
            type="button"
            className="!border-none hover:text-muted-foreground"
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/login");
            }}
          >
            Sign Out
            <LuLogOut />
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}

function TopNav({ setMobileMenuOpen }) {
  return (
    <nav className="fixed top-0 right-0 w-full md:w-[calc(100vw-200px)] flex items-center h-16 backdrop-blur-lg bg-border/40 z-20 border-b border-border px-4 justify-between">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(true)}
        className="md:hidden p-2 !border-none"
      >
        <IoMenu className="size-6" />
      </button>

      <div className="relative flex items-center rounded-full border border-border w-full md:w-[65%] max-w-md h-10 px-2 gap-2 focus-within:border-primary">
        <LuSearch />
        <input
          type="text"
          placeholder="Search..."
          className="w-[calc(100%-35px)] outline-none border-none bg-transparent text-sm"
        />
      </div>
      <div className="hidden sm:flex items-center gap-4 md:gap-6"></div>
    </nav>
  );
}

export function DashNav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div>
      <SideNav
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      <TopNav setMobileMenuOpen={setMobileMenuOpen} />
    </div>
  );
}