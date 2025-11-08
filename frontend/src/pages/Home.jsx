import { NavContainer } from "../components/navbar";
import Hero from "../components/hero";
import Features from "../components/features";
import Pricing from "../components/pricing";
import { Footer } from "../components/footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <NavContainer />
      <Hero className={"mt-16"} />
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
