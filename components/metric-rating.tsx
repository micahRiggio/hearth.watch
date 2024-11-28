import { Star } from 'lucide-react'
import { HealthMetric } from '@/types/health'

interface MetricRatingProps {
  value: HealthMetric
  onChange: (value: HealthMetric) => void
  label: string
}

export function MetricRating({ value, onChange, label }: MetricRatingProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        {label}
      </label>
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating as HealthMetric)}
            className="p-2"
          >
            <Star
              className={`h-6 w-6 ${
                rating <= value ? 'fill-[#35566B] text-[#35566B]' : 'text-muted-foreground'
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  )
}

