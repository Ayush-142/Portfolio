import { profile } from "@/content/profile";

export default function Nav() {
  return (
    <nav aria-label="Primary" className="flex gap-4 text-sm">
      {profile.links.map((link) => (
        <a key={link.label} href={link.href}>
          {link.label}
        </a>
      ))}
    </nav>
  );
}
