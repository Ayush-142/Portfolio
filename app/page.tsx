import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";

export default function Home() {
  const experience = projects.filter((project) => project.role);
  const personalProjects = projects.filter((project) => !project.role);

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

      <Section label="Experience">
        {experience.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Section>

      <Section label="Projects">
        {personalProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </Section>

      <Section label="Competitive Programming">
        <p>{profile.competitiveProgramming.standing}</p>

        <div className="mt-3 rounded-[10px] border border-rule bg-surface px-4 py-2">
          <ul className="data divide-y divide-rule">
            {profile.competitiveProgramming.results.map((result) => (
              <li key={result.event}>
                <a
                  href={result.proofUrl}
                  className="flex flex-col gap-0.5 py-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <span className="text-ink">{result.event}</span>
                  <span className="text-muted sm:text-right">{result.result}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="label mt-3 text-muted">
          {profile.codingProfiles.map((link, i) => (
            <span key={link.label}>
              {i > 0 ? " · " : null}
              <a href={link.href} className="group">
                <span className="text-muted group-hover:text-accept">
                  {link.label}
                </span>
              </a>
            </span>
          ))}
        </p>
      </Section>
    </div>
  );
}
