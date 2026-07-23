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

const codeArenaStack = [
  "MERN",
  "TypeScript",
  "Redis",
  "Docker",
  "BullMQ",
  "Socket.io",
  "Next.js",
  "Gemini API",
];

const nakalchiStack = [
  "TypeScript",
  "MongoDB",
  "Redis",
  "BullMQ",
  "Next.js",
  "Docker Compose",
];

const lunarStack = ["YOLOv11", "ResNet101", "PyTorch", "ONNX Runtime", "Streamlit"];

export const projects: Project[] = [
  {
    slug: "codearena",
    title: "CodeArena",
    description:
      "A full-stack competitive-programming judge and contest platform with a sandboxed pipeline and real-time verdict streaming.",
    stack: codeArenaStack,
    headlineMetric: {
      label: "Sustained throughput",
      value: "19.1",
      unit: "verdicts/min",
    },
    liveUrl: "https://codearena-ayush.duckdns.org/",
    sourceUrl: "https://github.com/Ayush-142/CodeArena",
    overview:
      "CodeArena is a full-stack competitive-programming judge and contest platform. It runs a sandboxed judge pipeline with real-time verdict streaming over Socket.io, ICPC-style contests with Redis ZSET leaderboards, and an AI hint system backed by the Gemini API. It's deployed on an Azure VM behind Caddy with DuckDNS.",
    problem:
      "Online judges need to execute arbitrary, untrusted code from many users at once and return a verdict fast enough to feel real-time. CodeArena exists to run that pipeline safely under load — sandboxed execution, a queued judge, and a contest layer with live leaderboards — rather than to demonstrate any one algorithm.",
    architecture: {
      prose:
        "The stack is MERN plus TypeScript throughout, with BullMQ and Redis handling the judge queue and Socket.io streaming verdicts back to clients as they land. Submitted code runs in sandboxed Docker containers, one per test case. The AI hint system calls the Gemini API. The whole thing runs on a single Azure VM behind Caddy, addressed via DuckDNS.",
      stack: codeArenaStack,
    },
    engineering: [
      {
        point:
          "Load test at 15 bots over a 5-minute run: the queue held at a fixed depth cap under saturation and drained fully once load stopped.",
        metric: { label: "Judge latency, p95 at saturation", value: "144.3", unit: "s" },
      },
      {
        point:
          "Read-path load test with k6 at 250 virtual users produced zero errors across 55,900 requests, and API latency stayed essentially flat scaling all the way to 1000 virtual users.",
        metric: { label: "Read-path p95 at 1000 VUs", value: "~140", unit: "ms" },
      },
      {
        point:
          "Precompiling bits/stdc++.h into the judge image cut a fixed cost from every compile. Worth stating honestly: compiling is only about 8% of total judge time — the real bottleneck is BullMQ pickup plus sequential per-test container spin-up.",
        metric: { label: "Compile time saved", value: "~820", unit: "ms/compile (~70%)" },
      },
    ],
    whatBroke: [
      "A timeout-slot-release bug surfaced by applying Little's law to throughput and queue-depth numbers that didn't reconcile — the math didn't add up, which is what pointed at a leak in the first place. Verified the fix with a three-way count check: client submissions, queued jobs, and verdicts returned all had to match.",
      "Early load-test results were contaminated by HTTP 429s from rate limiting, which made the numbers look worse than the system actually was. Fixed with a fresh bot pool and a 2-second rate-floor margin.",
      "At 500 virtual users the read path degraded sharply. Traced it to Caddy getting OOM-killed in a restart loop — a 64MB memory limit and 18 kernel OOM events. Raising the limit to 512MB cleared it entirely: the ceiling was a configuration mistake, not an application problem.",
    ],
    results: [
      { label: "Sustained throughput", value: "19.1 verdicts/min" },
      { label: "Peak queue depth (at cap)", value: "45" },
      { label: "Judge latency, p50 / p95 at saturation", value: "140.7s / 144.3s" },
      { label: "Submission POST p95 (flat under load)", value: "416ms" },
      { label: "Drain time after load stops", value: "140.1s" },
      { label: "Read-path p95, k6 @ 250 VUs", value: "~130ms" },
      { label: "Read-path requests / error rate @ 250 VUs", value: "55,900 / 0%" },
      { label: "Read-path p95 @ 1000 VUs", value: "~140ms" },
      { label: "Compile time saved (precompiled bits/stdc++.h)", value: "~820ms (~70% of compile time)" },
      { label: "Compile share of total judge time", value: "~8%" },
    ],
  },
  {
    slug: "nakalchi",
    title: "Nakalchi",
    description:
      "A plagiarism detection engine that implements the Stanford winnowing algorithm to prune candidate submission pairs for programming judges.",
    stack: nakalchiStack,
    headlineMetric: { label: "Candidate pruning", value: "~51x" },
    liveUrl: "https://nakalchi-ayush.duckdns.org",
    sourceUrl: "https://github.com/Ayush-142/Nakalchi",
    overview:
      "Nakalchi is a source-code plagiarism detection engine for programming judges, implementing the Stanford winnowing algorithm from the MOSS paper (SIGMOD 2003). It runs as a TypeScript monorepo — core, service, and web — on MongoDB, Redis, and BullMQ, with a Next.js report UI, deployed via Docker Compose alongside CodeArena on the same Azure VM.",
    problem:
      "A judge that accepts submissions from many students will eventually see copied solutions, and manual comparison doesn't scale past a handful of pairs. Nakalchi runs winnowing against every submission in a contest to prune the candidate pairs down to the ones actually worth a human's attention, then surfaces them through CodeArena's admin UI.",
    architecture: {
      prose:
        "Nakalchi is split into three packages in one TypeScript monorepo: a core library implementing winnowing, a service that runs analysis jobs off a BullMQ queue backed by Redis, and a Next.js web app for reports. Results are stored in MongoDB. The integration path runs contest finalise → analysis → a signed webhook → the integrity tab in CodeArena's admin UI → a per-pair report. Everything ships via Docker Compose, on the same Azure VM as CodeArena.",
      stack: nakalchiStack,
    },
    engineering: [
      {
        point:
          "Winnowing prunes the candidate set before any pairwise comparison runs, which is what makes the whole thing tractable at contest scale. Benchmarked on the production VM at n=1000 submissions, the pruning made worker threads unnecessary — a single thread was fast enough.",
        metric: { label: "Wall time, n=1000", value: "1.42", unit: "s" },
      },
      {
        point:
          "Peak memory during that same benchmark stayed low enough to run comfortably alongside CodeArena on the same VM.",
        metric: { label: "Peak RSS, n=1000", value: "443.8", unit: "MB" },
      },
      {
        point:
          "The test suite covers the pipeline end to end, including byte-offset region highlighting for flagged code — verified to the exact character.",
        metric: { label: "Test suite", value: "91", unit: "tests" },
      },
    ],
    whatBroke: [
      "A candidate-count anomaly turned out to trace back to a fixed absolute bound in the corpus cap, confirmed by ablation.",
      "Production hardening surfaced a run of separate issues: a stale container image that was missing the CodeArena integration, an unanchored cleanup regex, no swapfile on the VM, and a seeded admin password — which was rotated.",
    ],
    results: [
      { label: "Candidate pruning", value: "~51x" },
      { label: "Benchmark wall time (n=1000)", value: "1.42s" },
      { label: "Peak RSS (n=1000)", value: "443.8MB" },
      { label: "Test suite", value: "91 tests" },
      { label: "Seeded corpus: pairs flagged", value: "17 pairs" },
    ],
  },
  {
    slug: "lunar-crater-detection",
    title: "Lunar Crater Detection",
    description:
      "A YOLOv11 crater-detection model trained on Chandrayaan-2 orbital imagery, built as a B.Tech research project.",
    stack: lunarStack,
    headlineMetric: { label: "mAP50 (OHRC)", value: "0.683" },
    liveUrl: "https://lunar-crater-detection.streamlit.app/",
    sourceUrl: "https://github.com/Ayush-142/Lunar-Crater-Detection/tree/master",
    overview:
      "This is a B.Tech research project on crater detection in Chandrayaan-2 imagery, supervised by Dr. Subrajeet Mohapatra, Associate Professor, CSE, BIT Mesra. It trains YOLOv11 with a ResNet101 backbone (94.1M parameters) on the OHRC and TMC-2 datasets, and includes a deployment study benchmarking an ONNX export against PyTorch on CPU.",
    problem:
      "Mapping craters from orbital imagery is normally done by hand, which doesn't scale to the resolution or volume of data a mission like Chandrayaan-2 produces. This project trains a detector on that imagery directly, and separately asks whether the resulting model is usable outside a GPU environment.",
    architecture: {
      prose:
        "The detector is YOLOv11 with its backbone swapped for ResNet101 (94.1M parameters), trained separately on the Chandrayaan-2 OHRC and TMC-2 datasets. A deployment study exports the trained model to ONNX and benchmarks it on CPU. The public demo runs on Streamlit Community Cloud, pulling model weights from a Hugging Face model repo at app startup.",
      stack: lunarStack,
    },
    engineering: [
      {
        point:
          "Trained on OHRC imagery for 300 epochs (2.5h on a T4): precision 0.781, recall 0.683, mAP50-95 0.355 — slightly ahead of the reference implementation's 0.667 mAP50.",
        metric: { label: "mAP50 (OHRC)", value: "0.683" },
      },
      {
        point:
          "Trained on TMC-2 imagery for 150 epochs (3.4h on a T4): precision 0.798, recall 0.528, mAP50-95 0.343.",
        metric: { label: "mAP50 (TMC-2)", value: "0.589" },
      },
      {
        point:
          "Backbone ablation against stock YOLO11n shows most of the accuracy comes from the ResNet101 backbone itself, not from epoch count or dataset choice.",
        metric: { label: "Ablation, stock YOLO11n — mAP50 (TMC-2)", value: "0.327" },
      },
    ],
    whatBroke: [
      "Training moved off Colab to Kaggle after repeated VM recycles and model download failures made Colab unworkable for a run this long.",
      "Hugging Face Spaces changed its policy mid-project, so Gradio hosting would have required a paid tier. The demo moved to Streamlit Community Cloud instead, with weights pulled from a Hugging Face model repo at app startup.",
      "A deployment study exported the trained model to ONNX and benchmarked it on CPU (Ryzen 5 7530U) — and the finding was negative. FP32 ONNX ran at 0.73–0.86x the speed of PyTorch even with a tuned runtime session. INT8 dynamic quantisation was 15–20x slower still, and lost accuracy, because the ONNX Runtime CPU provider has no fast INT8 convolution path for dynamic quantisation — a convolution-heavy ResNet just falls back to dequantise-then-compute.",
    ],
    results: [
      { label: "OHRC — precision / recall", value: "0.781 / 0.683" },
      { label: "OHRC — mAP50 / mAP50-95", value: "0.683 / 0.355" },
      { label: "OHRC training", value: "300 epochs, 2.5h (T4)" },
      { label: "Reference implementation — mAP50 (OHRC)", value: "0.667" },
      { label: "TMC-2 — precision / recall", value: "0.798 / 0.528" },
      { label: "TMC-2 — mAP50 / mAP50-95", value: "0.589 / 0.343" },
      { label: "TMC-2 training", value: "150 epochs, 3.4h (T4)" },
      { label: "Ablation, stock YOLO11n — mAP50 (TMC-2 / OHRC)", value: "0.327 / 0.303" },
      { label: "ONNX FP32 vs PyTorch, CPU", value: "0.73–0.86x speed" },
      { label: "ONNX INT8 dynamic quant vs PyTorch, CPU", value: "15–20x slower, accuracy loss" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
