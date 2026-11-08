'use client';

import { useState, useEffect } from 'react';
import { Workout } from '@/types';
import { getAllWorkouts } from '@/utils/api';
import WorkoutCard from './WorkoutCard';

export default function LibrarySection() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getAllWorkouts();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <section id="library" className="py-16 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white uppercase tracking-wide">
            THE LIBRARY
          </h2>
          <p className="text-neutral-400 text-sm">
            Select body workout plans for targeted muscle groups.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
