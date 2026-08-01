import { profile } from "@/content/profile";

export default function Footer() {
  const email = profile.links.find((l) => l.label === "Email");

  return (
    <footer className="mt-16 border-t border-rule py-6">
      <div className="flex flex-wrap justify-center gap-3">
        {email ? (
          <a href={email.href} className="pill label">
            Contact Me
          </a>
        ) : null}
        <a href={profile.footerRepo} className="pill label">
          Site source
        </a>
      </div>
    </footer>
  );
}
