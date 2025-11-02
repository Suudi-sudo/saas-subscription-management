import { IoSparkles } from "react-icons/io5";
export default function Hero({ className }) {
  return (
    <div
      className={`flex flex-col items-center p-4 gap-6 ${className}`}
      id="Hero"
    >
      <div className="border border-border bg-primary/10 rounded-full flex items-center px-4 py-2 gap-3">
        <IoSparkles className="text-primary" />
        <div className="text-muted-foreground">
          Manage all your subscriptions in one place
        </div>
      </div>
      <h1
        className="md:text-6xl sm:text-5xl text-4xl animate-fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        Take Control Of Your{" "}
        <div className="text-primary">Subscription Spending</div>
      </h1>
      <p
        className="max-w-[690px] mx-2 sm:mx-0 text-lg animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        Track, manage, and optimize all your subscriptions. Never miss a
        renewal, avoid unwanted charges, and save money effortlessly!
      </p>
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in"
        style={{ animationDelay: "0.3s" }}
      >
        <a className="primary-link h-12 w-[75%] sm:w-[28%] sm:max-w-[230px]">
          Start Free Trial &rarr;
        </a>
        <a className="h-12 w-[75%] sm:w-[28%] sm:max-w-[230px] secondary-link">
          Watch Demo
        </a>
      </div>
      <div className="relative max-w-6xl">
        <div className="inset-0 absolute bg-gradient-to-t from-background to-transparent via-transparent z-10"></div>
        <img src="/Untitled.jpg" className="rounded-xl shadow-2xl" />
      </div>
    </div>
  );
}
