import {
  LuBell,
  LuTrendingDown,
  LuShield,
  LuZap,
  LuChartBar,
  LuCalendar,
} from "react-icons/lu";
export default function Features({ className }) {
  return (
    <div className={`flex flex-col items-center px-4 ${className}`} id="Features">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-center">
        Everything you need to{" "}
        <div className="text-primary">Stay In Control</div>
      </h2>
      <p className="text-base sm:text-lg mx-4 sm:mx-0 text-center mt-2">
        Powerful features designed to help you manage subscriptions smarter, not
        harder.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-5 w-full max-w-6xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-border hover:border-primary rounded-xl flex flex-col group items-baseline text-left p-4 md:p-5 gap-3 group"
          >
            <div className="h-12 aspect-square rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <feature.icon className="h-6 aspect-square text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-semibold">{feature.title}</h3>
            <p className="text-sm md:text-base">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
const features = [
  {
    icon: LuBell,
    title: "Smart Notifications",
    description:
      "Get timely alerts before renewals so you never get caught off guard by unexpected charges.",
  },
  {
    icon: LuTrendingDown,
    title: "Cost Optimization",
    description:
      "Identify unused subscriptions and find opportunities to save money across your stack.",
  },
  {
    icon: LuChartBar,
    title: "Spending Analytics",
    description:
      "Visualize your subscription spending with detailed charts and insights over time.",
  },
  {
    icon: LuCalendar,
    title: "Renewal Calendar",
    description:
      "See all your upcoming renewals at a glance with our intuitive calendar view.",
  },
  {
    icon: LuShield,
    title: "Secure & Private",
    description:
      "Bank-level encryption keeps your financial data safe and completely private.",
  },
  {
    icon: LuZap,
    title: "Quick Setup",
    description:
      "Connect your subscriptions in minutes with our automated detection and import tools.",
  },
];
