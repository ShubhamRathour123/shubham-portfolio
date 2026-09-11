import Hero from "@/components/hero";
import Skills from "@/components/skills";
import ProjectsSection from "@/components/projects";
import Experience from "@/components/experience";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Experience />
      <Skills />
      <ProjectsSection />
    </main>
  );
}
