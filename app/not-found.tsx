import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  description: "Page not found.",
};

export default function NotFound() {
  return (
    <div>
      <h1 className="text-3xl">Not found</h1>
      <p className="mt-2">
        <Link href="/">Back home</Link>
      </p>
    </div>
  );
}
