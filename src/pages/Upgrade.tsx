import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const plans = [
  {
    name: "Starter",
    launchPrice: "₹199 / $4.99 per month",
    regularPrice: "₹399 / $7.99 per month",
    description: "Great for solo creators, 25 credits/day",
    highlight: true,
  },
  {
    name: "Pro Builder",
    launchPrice: "₹499 / $9.99 per month",
    regularPrice: "₹899 / $15.99 per month",
    description: "Power users, 100 AI credits/day, full access",
    highlight: false,
  },
  {
    name: "Lifetime",
    launchPrice: "₹1499 / $29 (one-time)",
    regularPrice: "₹3499 / $59 (one-time)",
    description: "Unlimited access forever, exclusive perks",
    highlight: true,
  },
  {
    name: "Top-up Pack",
    launchPrice: "₹99 / $2.99 for 50 credits",
    regularPrice: "₹149 / $3.99",
    description: "Buy credits without subscription",
    highlight: false,
  },
];

const Upgrade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center text-primary mb-6">
          Upgrade Your Experience
        </h1>
        <p className="text-center text-lg text-muted-foreground mb-10">
          Unlock more AI credits, exclusive features, and lifetime access.{" "}
          <br />
          <span className="font-semibold text-primary">
            Special launch prices for the first 50 users!
          </span>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl shadow-lg p-6 bg-card border-2 border-gray-200 flex flex-col justify-between hover:border-primary hover:shadow-xl transition-all`}
            >
              <div>
                <h2 className="text-2xl font-bold text-primary mb-2">
                  {plan.name}
                </h2>
                <p className="mb-2 text-muted-foreground">{plan.description}</p>
                <div className="mb-2">
                  <span className="text-lg font-semibold text-green-600 bg-green-100 px-2 py-1 rounded mr-2">
                    {plan.launchPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    {plan.regularPrice}
                  </span>
                </div>
              </div>
              <button
                className="mt-4 px-4 py-2 rounded bg-primary text-white font-bold shadow hover:bg-primary/80 transition-colors border border-primary"
                disabled
              >
                Coming Soon
              </button>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center text-muted-foreground text-sm">
          * Prices will update automatically after the first 50 users. Stripe
          payments and paid plans launching soon!
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Upgrade;
