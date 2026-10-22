import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Expertise } from "@/components/sections/Expertise";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { Impact } from "@/components/sections/Impact";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ProductLabTeaser } from "@/components/sections/ProductLabTeaser";

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <Hero />
      <Stats />
      <AboutPreview />
      <EngineeringApproach />
      <Expertise />
      <FeaturedProjects />
      <ProductLabTeaser />
      <Impact />
      <ContactCTA />
    </main>
  );
}
