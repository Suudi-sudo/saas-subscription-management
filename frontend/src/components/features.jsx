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
    <div className={`flex flex-col items-center ${className}`} id="Features">
      <h2 className="md:text-5xl sm:text-4xl text-3xl font-semibold leading-15">
        Everything you need to{" "}
        <div className="text-primary">Stay In Control</div>
      </h2>
      <p className="text-lg mx-2 sm:mx-0">
        Powerful features designed to help you manage subscriptions smarter, not
        harder.
      </p>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 p-5">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-border hover:border-primary rounded-xl flex flex-col group items-baseline text-left p-5 gap-3 group"
          >
            <div className="h-12 aspect-square rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <feature.icon className="h-6 aspect-square text-primary" />
            </div>
            <h3 className="text-xl font-semibold">{feature.title}</h3>
            <p className="">{feature.description}</p>
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
