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

export const profile: Profile = {
  name: "Ayush",
  tagline: "I build systems, then measure what breaks.",
  links: [
    { label: "GitHub", href: "TODO: GitHub URL" },
    { label: "LinkedIn", href: "TODO: LinkedIn URL" },
    { label: "Email", href: "mailto:TODO@example.com" },
    { label: "Résumé", href: "/resume.pdf" },
  ],
  about: [
    "I'm in my final year of a CS degree at BIT Mesra. I build full-stack systems — a competitive-programming judge, a plagiarism detector, a crater-detection model — and then measure them: throughput, latency, memory, accuracy. When something breaks, I trace it back to the actual cause instead of patching around it. The numbers are what I report, not just whether the demo runs.",
  ],
  footerRepo: "TODO: portfolio repo URL",
};
