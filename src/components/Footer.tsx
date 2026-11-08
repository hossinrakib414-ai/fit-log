import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="py-8 bg-[#0a0a0a] border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <div className="flex items-center gap-2 font-bold text-neutral-300">
          <Image src="/SVG.png" alt="footer log" width={20} height={20} />
          <span className="text-[#ccff00]"></span> FITLOG
        </div>
        <p>© 2026 FitLog — Workout Library. Train hard, log honest.</p>
      </div>
    </footer>
  );
}
