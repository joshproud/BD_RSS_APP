import Link from "next/link";

const links = [
  { href: "/", label: "Map" },
  { href: "/feed", label: "Feed" },
  { href: "/mines", label: "Mines" },
  { href: "/sources", label: "Sources" },
];

export function Nav() {
  return (
    <header className="h-14 shrink-0 border-b border-zinc-800 bg-zinc-950 flex items-center px-4 gap-6">
      <Link href="/" className="font-semibold tracking-tight text-zinc-100">
        Mine BD Radar
      </Link>
      <nav className="flex gap-4 text-sm text-zinc-400">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="hover:text-zinc-100 transition-colors"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <div className="ml-auto text-xs text-zinc-500">MVP</div>
    </header>
  );
}
