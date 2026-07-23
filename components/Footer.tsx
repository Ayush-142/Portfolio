import { profile } from "@/content/profile";

export default function Footer() {
  const email = profile.links.find((l) => l.label === "Email");

  return (
    <footer className="mt-16 border-t border-rule py-6 text-sm text-muted">
      {email ? <a href={email.href}>{email.href.replace("mailto:", "")}</a> : null}
      {" · "}
      <a href={profile.footerRepo}>Site source</a>
    </footer>
  );
}
