import Image from 'next/image';
export default function Hero() {
  return (
    <section className="relative py-16 md:py-20 bg-[#0a0a0a] border-b border-[#2a2a2a]">
      <div
        className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center 
       bg-[#121212] border border-[#2a2a2a] rounded-2xl
      "
      >
        <div>
          <span className="inline-block px-3 py-1 text-[#ccff00]  font-semibold uppercase tracking-widest mb-4 mt-15">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl md:text-4xl font-black uppercase text-white tracking-tight leading-none mb-6">
            TRAIN WITH INTENT LOG. <br />
            EVERY SET.
          </h1>
          <p className="text-neutral-400 text-base md:text-lg mb-8 max-w-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>
          <a
            href="#library"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-[#ccff00] text-black font-bold uppercase tracking-wider rounded-lg hover:bg-lime-400 transition-all shadow-lg shadow-[#ccff00]/10 mb-15"
          >
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="flex justify-center lg:justify-end">
          <div className="">
            <Image
              src="/banner.png"
              alt="Fitness Hero"
              width={334}
              height={334}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
