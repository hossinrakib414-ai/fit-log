'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePlan } from '@/context/PlanContext';

export default function MyPlan() {
  const { plan, saved, metrics, removeFromPlan, removeFromSaved, markAsDone } =
    usePlan();
  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState<'duration' | 'calories' | 'rating'>(
    'duration',
  );

  const currentList = activeTab === 'plan' ? plan : saved;

  const sortedList = [...currentList].sort((a, b) => {
    if (sortBy === 'duration') return a.duration - b.duration;
    if (sortBy === 'calories') return b.caloriesBurned - a.caloriesBurned;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-black text-white uppercase tracking-tight mb-8">
        MY PLAN
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <div className="bg-[#121212] border border-[#2a2a2a] p-6 rounded-xl text-center">
          <p className="text-neutral-500 text-xs font-semibold uppercase mb-1">
            Exercises
          </p>
          <p className="text-4xl font-black text-[#ccff00]">
            {metrics.exercises}
          </p>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] p-6 rounded-xl text-center">
          <p className="text-neutral-500 text-xs font-semibold uppercase mb-1">
            Est. Minutes
          </p>
          <p className="text-4xl font-black text-[#ccff00]">
            {metrics.minutes}
          </p>
        </div>
        <div className="bg-[#121212] border border-[#2a2a2a] p-6 rounded-xl text-center">
          <p className="text-neutral-500 text-xs font-semibold uppercase mb-1">
            Est. Calories
          </p>
          <p className="text-4xl font-black text-[#ccff00]">
            {metrics.calories}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 pb-4 border-b border-[#2a2a2a]">
        <div className="flex bg-[#121212] p-1 border border-[#2a2a2a] rounded-lg">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-5 py-2 text-xs font-bold uppercase rounded-md transition-all ${
              activeTab === 'plan'
                ? 'bg-[#ccff00] text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Today's Plan ({plan.length})
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-5 py-2 text-xs font-bold uppercase rounded-md transition-all ${
              activeTab === 'saved'
                ? 'bg-[#ccff00] text-black'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            Saved ({saved.length})
          </button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="bg-[#121212] border border-[#2a2a2a] text-white px-3 py-1.5 rounded-lg focus:outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Duration (Low to High)</option>
            <option value="calories">Calories Burned (High to Low)</option>
            <option value="rating">Rating (High to Low)</option>
          </select>
        </div>
      </div>

      {sortedList.length === 0 ? (
        <div className="text-center py-20 bg-[#121212] border border-[#2a2a2a] rounded-xl">
          <h3 className="text-xl font-bold text-white mb-2">
            NOTHING HERE YET
          </h3>
          <p className="text-neutral-500 text-sm mb-6">
            Browse the library and add workouts to your plan.
          </p>
          <Link
            href="/"
            className="inline-block px-6 py-2.5 bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-lime-400"
          >
            Go to Library
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedList.map(item => {
            const isPlanItem = 'isDone' in item;
            return (
              <div
                key={item.id}
                className={`bg-[#121212] border p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 transition-all ${
                  isPlanItem && item.isDone
                    ? 'border-green-950 bg-neutral-950/40 opacity-60'
                    : 'border-[#2a2a2a]'
                }`}
              >
                <div className="flex items-center gap-4 w-full md:w-auto">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-neutral-900 border border-[#2a2a2a]"
                  />
                  <div>
                    <h4
                      className={`font-bold text-white ${isPlanItem && item.isDone ? 'line-through text-neutral-400' : ''}`}
                    >
                      {item.name}
                    </h4>
                    <p className="text-xs text-neutral-400">
                      ⏱️ {item.duration} min • 🔥 {item.caloriesBurned} kcal •
                      ⭐ {item.rating}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                  <Link
                    href={`/workout/${item.id}`}
                    className="px-3 py-1.5 border border-[#2a2a2a] text-xs font-semibold text-neutral-300 rounded hover:border-[#ccff00]"
                  >
                    Details
                  </Link>

                  {activeTab === 'plan' && isPlanItem && !item.isDone && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className="px-3 py-1.5 bg-[#ccff00] text-black text-xs font-bold rounded hover:bg-lime-400"
                    >
                      ✓ Done
                    </button>
                  )}

                  <button
                    onClick={() =>
                      activeTab === 'plan'
                        ? removeFromPlan(item.id)
                        : removeFromSaved(item.id)
                    }
                    className="px-3 py-1.5 border border-red-950 text-red-500 text-xs font-semibold rounded hover:bg-red-950/50"
                  >
                    ✕ Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
