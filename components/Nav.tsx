import { profile } from "@/content/profile";

export default function Nav() {
  return (
    <nav aria-label="Primary" className="flex flex-wrap gap-3 text-sm">
      {profile.links.map((link) => (
        <a key={link.label} href={link.href} className="pill label">
          {link.label}
        </a>
      ))}
    </nav>
  );
}
