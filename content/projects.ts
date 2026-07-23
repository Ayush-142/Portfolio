export type Metric = {
  label: string;
  value: string;
  unit?: string;
};

export type ResultRow = {
  label: string;
  value: string;
};

export type EngineeringPoint = {
  point: string;
  metric: Metric;
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  headlineMetric: Metric;
  liveUrl: string;
  sourceUrl: string;
  overview: string;
  problem: string;
  architecture: {
    prose: string;
    stack: string[];
  };
  engineering: EngineeringPoint[];
  whatBroke: string[];
  results: ResultRow[];
};

// TODO: content to be filled in during Phase 4, from SPEC.md facts only.
export const projects: Project[] = [
  {
    slug: "codearena",
    title: "CodeArena",
    description: "TODO: one-sentence description",
    stack: [],
    headlineMetric: { label: "TODO", value: "TODO" },
    liveUrl: "TODO",
    sourceUrl: "TODO",
    overview: "TODO",
    problem: "TODO",
    architecture: { prose: "TODO", stack: [] },
    engineering: [],
    whatBroke: [],
    results: [],
  },
  {
    slug: "nakalchi",
    title: "Nakalchi",
    description: "TODO: one-sentence description",
    stack: [],
    headlineMetric: { label: "TODO", value: "TODO" },
    liveUrl: "TODO",
    sourceUrl: "TODO",
    overview: "TODO",
    problem: "TODO",
    architecture: { prose: "TODO", stack: [] },
    engineering: [],
    whatBroke: [],
    results: [],
  },
  {
    slug: "lunar-crater-detection",
    title: "Lunar Crater Detection",
    description: "TODO: one-sentence description",
    stack: [],
    headlineMetric: { label: "TODO", value: "TODO" },
    liveUrl: "TODO",
    sourceUrl: "TODO",
    overview: "TODO",
    problem: "TODO",
    architecture: { prose: "TODO", stack: [] },
    engineering: [],
    whatBroke: [],
    results: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
