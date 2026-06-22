import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-8 max-w-3xl mx-auto flex items-center justify-between relative z-10">
      <span className="text-xs text-white/20">© 2026 MiniNavigator</span>
      <Link
        href="/"
        className="text-xs text-white/15 hover:text-white/30 transition-colors"
      >
        Back to home
      </Link>
    </footer>
  );
}
