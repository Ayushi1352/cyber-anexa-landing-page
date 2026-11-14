import rawData from "@/data/templates.json";
import type { CyberSecurityTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySection } from "@/components/sections/WhySection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";

const templateData: CyberSecurityTemplateData = rawData;
const sectionData = templateData.categories.CyberSecurity.sections;
const commonData = templateData.common;
const services = sectionData.Services?.variants?.CyberSecurityServices1;
const quoteForm = sectionData.QuoteForm?.variants?.CyberSecurityQuoteForm1;

/*
  One landing page with a section for each page of the CyberAnexa website (no blog). Contact Us and Get a Quote
  are merged into the contact section. Each section's id (templates.json) matches the header links ("#about" → id="about").
*/
export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection data={sectionData.Hero?.variants?.CyberSecurityHero1} />
      <AboutSection data={sectionData.About?.variants?.CyberSecurityAbout1} />
      <ServicesSection data={services} />
      <WhySection data={sectionData.Why?.variants?.CyberSecurityWhy1} />
      <ProjectsSection data={sectionData.Projects?.variants?.CyberSecurityProjects1} />
      <TeamSection data={sectionData.Team?.variants?.CyberSecurityTeam1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.CyberSecurityTestimonials1} />
      <ContactSection data={sectionData.Contact?.variants?.CyberSecurityContact1} form={quoteForm} company={commonData.company} />
    </main>
  );
}
