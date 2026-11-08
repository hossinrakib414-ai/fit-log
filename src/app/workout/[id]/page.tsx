'use client';
export const dynamic = 'force-dynamic';

import { use, useState, useEffect } from 'react';
import { usePlan } from '@/context/PlanContext';
import { getWorkoutById } from '@/utils/api';
import { Workout } from '@/types';
import Image from 'next/image';

type Params = Promise<{ id: string }>;

export default function WorkoutDetails({ params }: { params: Params }) {
  const { id } = use(params);
  const { plan, saved, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-white mb-2">
          Workout Not Found
        </h2>
      </div>
    );
  }

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some(item => item.id === workout.id);
  const isAlreadySaved = saved.some(item => item.id === workout.id);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-[#2a2a2a] bg-[#121212]">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((muscle, idx) => (
              <span
                key={idx}
                className="text-xs uppercase px-3 py-1 bg-[#ccff00] text-black font-extrabold rounded-full"
              >
                {muscle}
              </span>
            ))}
          </div>

          <div>
            <h1 className="text-3xl lg:text-4xl font-black text-white uppercase tracking-tight mb-2">
              {workout.name}
            </h1>
            <p className="text-neutral-400 text-sm leading-relaxed">
              {workout.description}
            </p>
          </div>

          <div className="bg-[#121212] border border-[#2a2a2a] rounded-2xl px-5 py-2 divide-y divide-[#2a2a2a] text-xs">
            <div className="flex justify-between py-3">
              <span className="text-neutral-500 font-semibold tracking-wider">
                EQUIPMENT
              </span>
              <span className="text-neutral-200 font-medium">
                {workout.equipment}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-neutral-500 font-semibold tracking-wider">
                DIFFICULTY
              </span>
              <span className="text-neutral-200 font-medium">
                {workout.difficulty}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-neutral-500 font-semibold tracking-wider">
                SETS
              </span>
              <span className="text-neutral-200 font-medium">
                {workout.sets}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-neutral-500 font-semibold tracking-wider">
                REPS
              </span>
              <span className="text-neutral-200 font-medium">
                {workout.reps}
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-neutral-500 font-semibold tracking-wider">
                DURATION
              </span>
              <span className="text-neutral-200 font-medium">
                {workout.duration} min
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-neutral-500 font-semibold tracking-wider">
                CALORIES
              </span>
              <span className="text-neutral-200 font-medium">
                {workout.caloriesBurned} kcal
              </span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-neutral-500 font-semibold tracking-wider">
                RATING
              </span>
              <span className="text-neutral-200 font-medium">
                {workout.rating}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-xs text-neutral-400 list-decimal list-inside leading-relaxed">
              {workout.instructions.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => addToPlan(workout)}
              disabled={isPlanFull || isAlreadyInPlan}
              className={`flex-1 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                isAlreadyInPlan
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : isPlanFull
                    ? 'bg-red-950/50 text-red-500 border border-red-900 cursor-not-allowed'
                    : 'bg-[#ccff00] text-black hover:bg-lime-400'
              }`}
            >
              <span>📋</span>
              <span>
                {isAlreadyInPlan
                  ? 'Already in Plan'
                  : isPlanFull
                    ? 'Plan Full'
                    : "Add to today's plan"}
              </span>
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={isAlreadySaved}
              className={`py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider border transition-all flex items-center gap-2 ${
                isAlreadySaved
                  ? 'border-neutral-800 text-neutral-600 cursor-not-allowed'
                  : 'border-[#2a2a2a] text-neutral-300 hover:border-[#ccff00] bg-[#121212]'
              }`}
            >
              <span>🔖</span>
              <span>{isAlreadySaved ? 'Saved' : 'Save for later'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
