import { IoSparkles } from "react-icons/io5";
export default function Hero({ className }) {
  return (
    <div
      className={`flex flex-col items-center p-4 sm:p-6 gap-6 ${className}`}
      id="Hero"
    >
      <div className="border border-border bg-primary/10 rounded-full flex items-center px-3 sm:px-4 py-2 gap-2 sm:gap-3 text-sm sm:text-base">
        <IoSparkles className="text-primary flex-shrink-0" />
        <div className="text-muted-foreground text-center">
          Manage all your subscriptions in one place
        </div>
      </div>
      <h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl animate-fade-in text-center px-4"
        style={{ animationDelay: "0.1s" }}
      >
        Take Control Of Your{" "}
        <div className="text-primary">Subscription Spending</div>
      </h1>
      <p
        className="max-w-[690px] mx-4 sm:mx-6 md:mx-0 text-base sm:text-lg text-center animate-fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        Track, manage, and optimize all your subscriptions. Never miss a
        renewal, avoid unwanted charges, and save money effortlessly!
      </p>
      <div
        className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in px-4"
        style={{ animationDelay: "0.3s" }}
      >
        <a
          className="primary-link h-12 w-full sm:w-[75%] md:w-[28%] sm:max-w-[230px]"
          href="/login"
        >
          Start Free Trial &rarr;
        </a>
        <a className="h-12 w-full sm:w-[75%] md:w-[28%] sm:max-w-[230px] secondary-link">
          Watch Demo
        </a>
      </div>
      <div className="relative w-full max-w-6xl px-4">
        <div className="inset-0 absolute bg-gradient-to-t from-background to-transparent via-transparent z-10"></div>
        <img src="/Untitled.jpg" className="rounded-xl shadow-2xl w-full" />
      </div>
    </div>
  );
}
