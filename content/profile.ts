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
  // TODO: positioning statement — to be drafted and approved in Phase 2
  tagline: "TODO: one-line positioning statement",
  links: [
    { label: "GitHub", href: "TODO: GitHub URL" },
    { label: "LinkedIn", href: "TODO: LinkedIn URL" },
    { label: "Email", href: "mailto:TODO@example.com" },
    { label: "Résumé", href: "/resume.pdf" },
  ],
  // TODO: about copy — to be drafted and approved in Phase 2
  about: ["TODO: about paragraph, three to four sentences maximum."],
  footerRepo: "TODO: portfolio repo URL",
};
