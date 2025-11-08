import { LuCheck } from "react-icons/lu";

export default function Pricing() {
  return (
    <div id="Pricing" className="flex flex-col items-center gap-4 px-4">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight text-center">
        Simple, Transparent <div className="text-primary">Pricing</div>
      </h2>
      <p className="text-center text-sm sm:text-base">
        Choose the plan that fits your needs. All plans include a 14-day free
        trial.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl p-5 w-full">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`border ${plan.popular ? "border-pulse-only" : "border-border"} rounded-xl hover:border-primary flex flex-col items-center p-5 relative gap-4`}
          >
            {plan.popular && (
              <div className="absolute py-1 px-4 bg-primary rounded-full -top-4 text-sm font-semibold">
                Most Popular
              </div>
            )}
            <h4 className="text-xl md:text-2xl font-bold">{plan.name}</h4>
            <div className="flex items-baseline gap-0.5">
              <h5 className="font-bold text-foreground text-3xl md:text-4xl">
                {plan.price}
              </h5>
              {plan.period && (
                <span className="text-muted-foreground text-sm md:text-base">
                  {plan.period}
                </span>
              )}
            </div>
            <p className="text-left text-sm md:text-base">{plan.description}</p>
            <a
              className={`${plan.popular ? "primary-link" : "secondary-link"} w-full sm:w-[80%] h-12`}
              href="/login"
            >
              {plan.cta}
            </a>
            <ul className="w-full gap-2 flex flex-col">
              {plan.features.map((feature, featureIndex) => (
                <li
                  key={featureIndex}
                  className="flex items-center justify-baseline gap-2 w-full text-muted-foreground text-sm md:text-base"
                >
                  <LuCheck className="text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for individuals just getting started",
    features: [
      "Up to 10 subscriptions",
      "Basic notifications",
      "Spending overview",
      "Mobile app access",
    ],
    cta: "Get Started",
    variant: "outline",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For professionals managing multiple subscriptions",
    features: [
      "Unlimited subscriptions",
      "Smart renewal alerts",
      "Advanced analytics",
      "Cost optimization tips",
      "Priority support",
      "Export reports",
    ],
    cta: "Start Free Trial",
    variant: "gradient",
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "/month",
    description: "For teams collaborating on subscription management",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Shared billing",
      "Admin controls",
      "API access",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    variant: "outline",
  },
];
