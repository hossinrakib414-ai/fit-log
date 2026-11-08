import Link from 'next/link';
import { Workout } from '@/types';
import Image from 'next/image';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link href={`/workout/${workout.id}`} className="group block">
      <div className="bg-[#121212] border border-[#2a2a2a] rounded-xl overflow-hidden group-hover:border-[#ccff00]/50 group-hover:-translate-y-1 transition-all duration-300">
        <div className="relative h-48 w-full overflow-hidden bg-neutral-900">
          <img
            src={workout.image}
            alt={workout.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {workout.muscleGroups.map((muscle, idx) => (
              <span
                key={idx}
                className="text-xs uppercase px-2 py-0.5 bg-[#1a1a1a] text-[#ccff00] border border-[#2a2a2a] rounded font-semibold"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-[#ccff00] transition-colors">
            {workout.name}
          </h3>

          <p className="text-xs text-neutral-400 mb-4">
            Equipment:{' '}
            <span className="text-neutral-200">{workout.equipment}</span>
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-[#2a2a2a] text-xs text-neutral-400">
            <span>⏱️ {workout.duration} min</span>
            <span>🔥 {workout.caloriesBurned} kcal</span>
            <span>⭐ {workout.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
