"use client"

import { useState, useEffect } from "react"
import { RefreshCw, Heart } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const affirmations = [
  "Today is full of possibilities and I embrace them with confidence.",
  "I am capable of achieving great things, one step at a time.",
  "My efforts today will create the tomorrow I desire.",
  "I choose to focus on progress, not perfection.",
  "Every challenge I face makes me stronger and wiser.",
  "I am worthy of success and happiness in all areas of my life.",
  "Today I will be kind to myself and celebrate small victories.",
  "I have the power to create positive change in my life.",
  "My potential is limitless and I trust in my abilities.",
  "I am grateful for this moment and the opportunities it brings.",
  "I choose to see obstacles as opportunities for growth.",
  "Today I will take action towards my dreams with courage.",
  "I am deserving of love, respect, and all good things.",
  "My mindset shapes my reality, and I choose positivity.",
  "I trust the process and know that everything unfolds perfectly.",
  "Today I will be present and find joy in simple moments.",
  "I am resilient and can handle whatever comes my way.",
  "My unique gifts and talents make a difference in the world.",
  "I choose to let go of what I cannot control and focus on what I can.",
  "Today is a fresh start and I embrace it with enthusiasm.",
]

export default function DailyAffirmation() {
  const [currentAffirmation, setCurrentAffirmation] = useState("")
  const [isCustom, setIsCustom] = useState(false)

  useEffect(() => {
    // Get today's affirmation (consistent for the day)
    const today = new Date().toDateString()
    const savedAffirmation = localStorage.getItem(`planmate-affirmation-${today}`)

    if (savedAffirmation) {
      setCurrentAffirmation(savedAffirmation)
    } else {
      // Generate a consistent affirmation for today based on date
      const dateHash = today.split("").reduce((a, b) => {
        a = (a << 5) - a + b.charCodeAt(0)
        return a & a
      }, 0)
      const index = Math.abs(dateHash) % affirmations.length
      const todayAffirmation = affirmations[index]
      setCurrentAffirmation(todayAffirmation)
      localStorage.setItem(`planmate-affirmation-${today}`, todayAffirmation)
    }
  }, [])

  const getNewAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length)
    const newAffirmation = affirmations[randomIndex]
    setCurrentAffirmation(newAffirmation)

    // Save the new affirmation for today
    const today = new Date().toDateString()
    localStorage.setItem(`planmate-affirmation-${today}`, newAffirmation)
  }

  return (
    <Card className="bg-gradient-to-br from-amber-50 via-rose-50 to-stone-50 border-stone-200/50 shadow-sm">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
            <Heart className="w-4 h-4 text-rose-600" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-serif font-medium text-stone-800 mb-2 text-sm">Daily Affirmation</h3>

            <blockquote className="text-sm text-stone-700 leading-relaxed font-medium italic mb-3">
              "{currentAffirmation}"
            </blockquote>

            <Button
              variant="ghost"
              size="sm"
              onClick={getNewAffirmation}
              className="text-xs text-stone-600 hover:text-amber-700 hover:bg-amber-50 p-1 h-auto"
            >
              <RefreshCw className="w-3 h-3 mr-1" />
              New affirmation
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
