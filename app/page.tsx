'use client'

import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useHealthStore } from '@/hooks/use-health-store'
import { HealthMetric } from '@/types/health'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function MetricStars({ value, onChange }: { value: HealthMetric; onChange: (value: HealthMetric) => void }) {
  return (
    <div className="flex justify-between">
      {[1, 2, 3, 4].map((rating) => (
        <button
          key={rating}
          onClick={() => onChange(rating as HealthMetric)}
          className="p-2"
        >
          <Star
            className={`h-10 w-10 ${
              rating <= value ? 'fill-[#35566B] text-[#35566B]' : 'text-muted-foreground'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function SymptomEmoji({ emoji, label, isActive, onClick }: { emoji: string; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <Button
      variant="ghost"
      className={cn(
        "flex flex-col items-center p-2 h-auto",
        isActive && "bg-[#35566B] text-white"
      )}
      onClick={onClick}
    >
      <span className="text-4xl mb-1">{emoji}</span>
      <span className="text-xs text-center">{label}</span>
    </Button>
  )
}

export default function HomePage() {
  const { addEntry } = useHealthStore()
  const { toast } = useToast()
  const [weight, setWeight] = useState('')
  const [systolic, setSystolic] = useState('')
  const [diastolic, setDiastolic] = useState('')
  const [bloodSugar, setBloodSugar] = useState('')
  const [mood, setMood] = useState<HealthMetric>(0)
  const [energy, setEnergy] = useState<HealthMetric>(0)
  const [exercise, setExercise] = useState<HealthMetric>(0)
  const [sleep, setSleep] = useState<HealthMetric>(0)
  const [brainFog, setBrainFog] = useState(false)
  const [lightheadedness, setLightheadedness] = useState(false)
  const [nausea, setNausea] = useState(false)
  const [lackOfAppetite, setLackOfAppetite] = useState(false)
  const [savedValues, setSavedValues] = useState<{[key: string]: string | number | boolean}>({})
  const [fadeOut, setFadeOut] = useState<{[key: string]: boolean}>({})

  useEffect(() => {
    Object.keys(savedValues).forEach((key) => {
      if (savedValues[key] !== '') {
        const timer = setTimeout(() => {
          setFadeOut(prev => ({ ...prev, [key]: true }))
        }, 2000)
        return () => clearTimeout(timer)
      }
    })
  }, [savedValues])

  const saveEntry = (field: string, value: string | number | boolean) => {
    let entry = {}
    if (typeof value === 'string' && value !== '') {
      entry[field] = parseFloat(value)
    } else if (field === 'systolic' || field === 'diastolic') {
      entry['bloodPressure'] = { [field]: parseInt(value as string) || 0 }
    } else {
      entry[field] = value
    }

    const savedEntry = addEntry(entry)
    toast({
      title: "Data Logged",
      description: `${field.charAt(0).toUpperCase() + field.slice(1)} saved: ${value}`,
    })

    setSavedValues(prev => ({ ...prev, [field]: value }))
    setFadeOut(prev => ({ ...prev, [field]: false }))

    // Reset the input field
    switch (field) {
      case 'weight':
        setWeight('')
        break
      case 'systolic':
        setSystolic('')
        break
      case 'diastolic':
        setDiastolic('')
        break
      case 'bloodSugar':
        setBloodSugar('')
        break
      case 'mood':
        setMood(0)
        break
      case 'energy':
        setEnergy(0)
        break
      case 'exercise':
        setExercise(0)
        break
      case 'sleep':
        setSleep(0)
        break
      // No need to reset boolean values for symptoms
    }
  }

  return (
    <div className="p-4 space-y-8">
      <div className="space-y-4">
        <label htmlFor="weight" className="text-xl font-medium text-[#8F6566]">Weight (kg)</label>
        <Input
          id="weight"
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={() => saveEntry('weight', weight)}
          className="border-[#35566B] text-xl p-6"
        />
        <div className={cn(
          "text-lg text-[#35566B] transition-opacity duration-1000",
          fadeOut['weight'] ? 'opacity-0' : 'opacity-100'
        )}>
          {savedValues['weight'] && `Saved: ${savedValues['weight']} kg`}
        </div>
      </div>
      
      <div className="space-y-4">
        <label className="text-xl font-medium text-[#8F6566]">Blood Pressure</label>
        <div className="flex gap-4">
          <div className="flex-1">
            <Input
              id="systolic"
              type="number"
              placeholder="Systolic"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              onBlur={() => saveEntry('systolic', systolic)}
              className="border-[#35566B] text-xl p-6"
            />
            <div className={cn(
              "text-lg text-[#35566B] transition-opacity duration-1000",
              fadeOut['systolic'] ? 'opacity-0' : 'opacity-100'
            )}>
              {savedValues['systolic'] && `Saved: ${savedValues['systolic']}`}
            </div>
          </div>
          <div className="flex-1">
            <Input
              id="diastolic"
              type="number"
              placeholder="Diastolic"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              onBlur={() => saveEntry('diastolic', diastolic)}
              className="border-[#35566B] text-xl p-6"
            />
            <div className={cn(
              "text-lg text-[#35566B] transition-opacity duration-1000",
              fadeOut['diastolic'] ? 'opacity-0' : 'opacity-100'
            )}>
              {savedValues['diastolic'] && `Saved: ${savedValues['diastolic']}`}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <label htmlFor="bloodSugar" className="text-xl font-medium text-[#8F6566]">Blood Sugar</label>
        <Input
          id="bloodSugar"
          type="number"
          step="0.1"
          value={bloodSugar}
          onChange={(e) => setBloodSugar(e.target.value)}
          onBlur={() => saveEntry('bloodSugar', bloodSugar)}
          className="border-[#35566B] text-xl p-6"
        />
        <div className={cn(
          "text-lg text-[#35566B] transition-opacity duration-1000",
          fadeOut['bloodSugar'] ? 'opacity-0' : 'opacity-100'
        )}>
          {savedValues['bloodSugar'] && `Saved: ${savedValues['bloodSugar']}`}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xl font-medium text-[#8F6566]">Mood</label>
        <MetricStars value={mood} onChange={(value) => {
          setMood(value)
          saveEntry('mood', value)
        }} />
        <div className={cn(
          "text-lg text-[#35566B] transition-opacity duration-1000",
          fadeOut['mood'] ? 'opacity-0' : 'opacity-100'
        )}>
          {savedValues['mood'] && `Saved: ${savedValues['mood']} stars`}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xl font-medium text-[#8F6566]">Energy Level</label>
        <MetricStars value={energy} onChange={(value) => {
          setEnergy(value)
          saveEntry('energy', value)
        }} />
        <div className={cn(
          "text-lg text-[#35566B] transition-opacity duration-1000",
          fadeOut['energy'] ? 'opacity-0' : 'opacity-100'
        )}>
          {savedValues['energy'] && `Saved: ${savedValues['energy']} stars`}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xl font-medium text-[#8F6566]">Exercise Level</label>
        <MetricStars value={exercise} onChange={(value) => {
          setExercise(value)
          saveEntry('exercise', value)
        }} />
        <div className={cn(
          "text-lg text-[#35566B] transition-opacity duration-1000",
          fadeOut['exercise'] ? 'opacity-0' : 'opacity-100'
        )}>
          {savedValues['exercise'] && `Saved: ${savedValues['exercise']} stars`}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xl font-medium text-[#8F6566]">Sleep Quality</label>
        <MetricStars value={sleep} onChange={(value) => {
          setSleep(value)
          saveEntry('sleep', value)
        }} />
        <div className={cn(
          "text-lg text-[#35566B] transition-opacity duration-1000",
          fadeOut['sleep'] ? 'opacity-0' : 'opacity-100'
        )}>
          {savedValues['sleep'] && `Saved: ${savedValues['sleep']} stars`}
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-xl font-medium text-[#8F6566]">Symptoms</label>
        <div className="flex flex-wrap justify-between gap-2">
          <SymptomEmoji
            emoji="🧠"
            label="Brain Fog"
            isActive={brainFog}
            onClick={() => {
              const newValue = !brainFog;
              setBrainFog(newValue);
              saveEntry('brainFog', newValue);
            }}
          />
          <SymptomEmoji
            emoji="💫"
            label="Lightheadedness"
            isActive={lightheadedness}
            onClick={() => {
              const newValue = !lightheadedness;
              setLightheadedness(newValue);
              saveEntry('lightheadedness', newValue);
            }}
          />
          <SymptomEmoji
            emoji="🤢"
            label="Nausea"
            isActive={nausea}
            onClick={() => {
              const newValue = !nausea;
              setNausea(newValue);
              saveEntry('nausea', newValue);
            }}
          />
          <SymptomEmoji
            emoji="🍽️"
            label="Lack of Appetite"
            isActive={lackOfAppetite}
            onClick={() => {
              const newValue = !lackOfAppetite;
              setLackOfAppetite(newValue);
              saveEntry('lackOfAppetite', newValue);
            }}
          />
        </div>
      </div>
    </div>
  )
}

