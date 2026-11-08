'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePlan } from '@/context/PlanContext';
import Image from 'next/image';
import { Suspense } from 'react';

function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6">
      <Link
        href="/"
        className={`text-sm font-semibold transition-colors ${
          pathname === '/'
            ? 'text-[#ccff00]'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        Workout
      </Link>

      <Link
        href="/my-plan"
        className={`text-sm font-semibold transition-colors ${
          pathname === '/my-plan'
            ? 'text-[#ccff00]'
            : 'text-neutral-400 hover:text-white'
        }`}
      >
        My Plan
      </Link>
    </nav>
  );
}

export default function Navbar() {
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex gap-4">
          <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} />
          <span className="text-2xl font-bold">FITLOG</span>
        </div>

        <Suspense fallback={<nav className="flex gap-6" />}>
          <NavLinks />
        </Suspense>

        <div className="flex items-center gap-2">
          <Link
            href="/my-plan"
            className="px-3 py-1 bg-[#ccff00] text-black text-xs font-bold rounded-full hover:bg-lime-400 transition-all"
          >
            Plan
            <span className="ml-1 bg-black text-[#ccff00] px-1.5 py-0.5 rounded-full">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="px-3 py-1 border border-[#2a2a2a] text-neutral-300 text-xs font-bold rounded-full hover:border-[#ccff00] transition-all"
          >
            Saved
            <span className="ml-1 bg-[#2a2a2a] text-white px-1.5 py-0.5 rounded-full">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
