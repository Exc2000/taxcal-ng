"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          🇳🇬 TaxCalc
        </Link>

        <nav className="flex items-center gap-2">
          {/* <Button asChild variant={isActive('/pit') ? 'default' : 'ghost'} className="text-sm px-3">
            <Link href="/pit">PIT</Link>
          </Button>

          <Button asChild variant={isActive('/cit') ? 'default' : 'ghost'} className="text-sm px-3">
            <Link href="/cit">CIT</Link>
          </Button> */}

          <Button asChild variant={isActive('/') ? 'default' : 'ghost'} className="text-sm px-3">
            <Link href="/">Home</Link>
          </Button>

          <Button asChild variant={isActive('/rules') ? 'default' : 'ghost'} className="text-sm px-3">
            <Link href="/rules">Rules</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
