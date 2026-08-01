export type ProfileLink = {
  label: string;
  href: string;
};

export type ContestResult = {
  event: string;
  result: string;
  proofUrl: string;
};

export type Profile = {
  name: string;
  tagline: string;
  // TODO: date-sensitive — remove or update once a role is signed.
  availability: string;
  links: ProfileLink[];
  about: string[];
  footerRepo: string;
  codingProfiles: ProfileLink[];
  competitiveProgramming: {
    standing: string;
    results: ContestResult[];
  };
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const profile: Profile = {
  name: "Ayush",
  tagline: "I build systems, then measure what breaks.",
  availability: "Open to full-time SDE roles from 2027.",
  links: [
    { label: "GitHub", href: "https://github.com/Ayush-142" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/ayush-bit/" },
    { label: "Email", href: "mailto:ayush67529@gmail.com" },
    { label: "Résumé", href: `${basePath}/resume.pdf` },
  ],
  about: [
    "I'm in my final year of a CS degree at BIT Mesra. I build full-stack systems — a competitive-programming judge, a plagiarism detector, a crater-detection model — and then measure them: throughput, latency, memory, accuracy. When something breaks, I trace it back to the actual cause instead of patching around it. The numbers are what I report, not just whether the demo runs. Open to SDE roles starting 2027.",
    "B.Tech Computer Science and Engineering, BIT Mesra, 2023–2027.",
  ],
  footerRepo: "https://github.com/Ayush-142/Portfolio",
  codingProfiles: [
    { label: "Codeforces", href: "https://codeforces.com/profile/Ayush_142" },
    { label: "LeetCode", href: "https://leetcode.com/u/Ayush_142/" },
    { label: "CodeChef", href: "https://www.codechef.com/users/ayush_142" },
  ],
  competitiveProgramming: {
    standing:
      "LeetCode Knight (1942). 1300+ problems solved across Codeforces, LeetCode, and CodeChef.",
    results: [
      {
        event: "CodeChef Starters 246",
        result: "Global rank 307",
        proofUrl:
          "https://www.codechef.com/rankings/START246C?itemsPerPage=100&order=asc&page=1&sortBy=rank",
      },
      {
        event: "LeetCode Weekly Contest 506",
        result: "Global rank 673 / 37,000+",
        proofUrl:
          "https://leetcode.com/contest/weekly-contest-506/ranking/?region=global_v2",
      },
      {
        event: "Codeforces Round 1109 (Div. 3)",
        result: "Global rank 1696 / 34,000+",
        proofUrl:
          "https://codeforces.com/contest/2244/standings/participant/241250241#p241250241",
      },
      {
        event: "Flipkart GRiD 7.0",
        result: "Semi-finalist",
        proofUrl:
          "https://drive.google.com/file/d/1sEp1Lpqz-mFPngxGUhZahfbahPiuZQQP/view?usp=drive_link",
      },
    ],
  },
};
