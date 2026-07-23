import Link from "next/link";
import type { Project } from "@/content/projects";
import MetricSlip from "./MetricSlip";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="mt-8 border-t border-rule pt-6 first:mt-0 first:border-t-0 first:pt-0">
      <h3 className="font-display text-xl font-semibold tracking-tight text-ink">
        <Link href={`/projects/${project.slug}`} prefetch={false}>
          {project.title}
        </Link>
      </h3>
      <p className="mt-2">{project.description}</p>
      <ul className="label mt-3 flex flex-wrap gap-x-4 gap-y-1 text-muted">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="mt-4">
        <MetricSlip {...project.headlineMetric} />
      </div>
      <div className="mt-3 flex gap-4 text-sm">
        <a href={project.liveUrl}>Live</a>
        <a href={project.sourceUrl}>Source</a>
      </div>
    </article>
  );
}
