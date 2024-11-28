export interface HealthEntry {
  id: string
  date: string
  weight: number
  mood: HealthMetric
  energy: HealthMetric
  bloodPressure: {
    systolic: number
    diastolic: number
  }
  bloodSugar: number
  exercise: HealthMetric
  sleep: HealthMetric
  brainFog: boolean
  lightheadedness: boolean
  nausea: boolean
  lackOfAppetite: boolean
}

export type HealthMetric = 0 | 1 | 2 | 3 | 4

