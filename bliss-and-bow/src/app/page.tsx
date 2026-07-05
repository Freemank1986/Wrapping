import { Hero } from "@/components/hero";
import { RibbonStrip } from "@/components/ribbon-strip";
import { HowItWorks } from "@/components/how-it-works";

export default function Home() {
  return (
    <main>
      <Hero />
      <RibbonStrip />
      <HowItWorks />
    </main>
  );
}
