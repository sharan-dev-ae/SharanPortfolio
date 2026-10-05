import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Expertise } from "@/components/sections/Expertise";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { Impact } from "@/components/sections/Impact";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Stats />
      <AboutPreview />
      <EngineeringApproach />
      <Expertise />
      <FeaturedProjects />
      <Impact />
      <ContactCTA />
    </main>
  );
}
