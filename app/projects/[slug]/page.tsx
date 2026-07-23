import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Section from "@/components/Section";
import Prose from "@/components/Prose";
import MetricSlip from "@/components/MetricSlip";
import { projects, getProject } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return {
    title: project?.title ?? "Project",
    description: project?.description ?? "",
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="lg:pl-40">
      <h1 className="mb-10 text-3xl">{project.title}</h1>

      <Section label="Overview">
        <Prose>
          <p>{project.overview}</p>
        </Prose>
        <div className="mt-3 flex gap-4 text-sm">
          <a href={project.liveUrl}>Live</a>
          <a href={project.sourceUrl}>Source</a>
        </div>
      </Section>

      <Section label="Problem">
        <Prose>
          <p>{project.problem}</p>
        </Prose>
      </Section>

      <Section label="Architecture">
        <Prose>
          <p>{project.architecture.prose}</p>
        </Prose>
        <ul className="label mt-3 flex flex-wrap gap-x-4 gap-y-1 text-muted">
          {project.architecture.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </Section>

      <Section label="Engineering">
        <div className="flex flex-col gap-6">
          {project.engineering.map((item) => (
            <div key={item.point}>
              <Prose>
                <p>{item.point}</p>
              </Prose>
              <div className="mt-2">
                <MetricSlip {...item.metric} />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section label="What broke" labelClassName="text-fail">
        <div className="flex flex-col gap-4">
          {project.whatBroke.map((story, i) => (
            <Prose key={i}>
              <p>{story}</p>
            </Prose>
          ))}
        </div>
      </Section>

      <Section label="Results">
        <table className="w-full text-sm">
          <tbody>
            {project.results.map((row) => (
              <tr key={row.label} className="border-t border-rule">
                <td className="py-2 pr-4 text-muted">{row.label}</td>
                <td className="data py-2 text-ink">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
    </div>
  );
}
