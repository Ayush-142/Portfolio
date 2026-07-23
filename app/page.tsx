import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <div className="lg:pl-40">
      <div>
        <h1>Hey, I&apos;m {profile.name}.</h1>
        <p className="mt-2 text-lg text-muted">{profile.tagline}</p>
      </div>

      <Section label="About">
        {profile.about.map((paragraph, i) => (
          <p key={i} className="mt-2 first:mt-0">
            {paragraph}
          </p>
        ))}
      </Section>

      <Section label="Projects">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Section>
    </div>
  );
}
