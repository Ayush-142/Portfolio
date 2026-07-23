export type ProfileLink = {
  label: string;
  href: string;
};

export type Profile = {
  name: string;
  tagline: string;
  links: ProfileLink[];
  about: string[];
  footerRepo: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const profile: Profile = {
  name: "Ayush",
  tagline: "I build systems, then measure what breaks.",
  links: [
    { label: "GitHub", href: "https://github.com/Ayush-142" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-bit/" },
    { label: "Email", href: "mailto:ayush67529@gmail.com" },
    { label: "Résumé", href: `${basePath}/resume.pdf` },
  ],
  about: [
    "I'm in my final year of a CS degree at BIT Mesra. I build full-stack systems — a competitive-programming judge, a plagiarism detector, a crater-detection model — and then measure them: throughput, latency, memory, accuracy. When something breaks, I trace it back to the actual cause instead of patching around it. The numbers are what I report, not just whether the demo runs.",
  ],
  footerRepo: "https://github.com/Ayush-142/Portfolio",
};
