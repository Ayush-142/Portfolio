import { profile } from "@/content/profile";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  return (
    <nav aria-label="Primary" className="flex items-center justify-between gap-6 text-sm">
      <div className="flex flex-1 justify-between">
        {profile.links.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <ThemeToggle />
    </nav>
  );
}
