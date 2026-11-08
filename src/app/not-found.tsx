import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-8xl font-black text-[#ccff00] tracking-tighter mb-4">
        404
      </h1>
      <h2 className="text-2xl font-bold text-white uppercase tracking-wide mb-2">
        Page Not Found
      </h2>
      <p className="text-neutral-500 text-sm max-w-sm mb-8">
        The workout route you are trying to reach does not exist or has been
        relocated.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-lime-400"
      >
        Back to Home
      </Link>
    </div>
  );
}
