"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  completed: boolean
  date: string
}

interface CalendarViewProps {
  onDateSelect: (date: Date) => void
  tasks: Task[]
}

export default function CalendarView({ onDateSelect, tasks }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())

  const today = new Date()
  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()

  const firstDayOfMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month + 1, 0)
  const firstDayOfWeek = firstDayOfMonth.getDay()
  const daysInMonth = lastDayOfMonth.getDate()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1))
  }

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => new Date(task.date).toDateString() === date.toDateString())
  }

  const getDiaryEntry = (date: Date) => {
    const dateKey = date.toDateString()
    const entries = JSON.parse(localStorage.getItem("planmate-diary") || "{}")
    return entries[dateKey]
  }

  const hasContent = (date: Date) => {
    const tasksForDate = getTasksForDate(date)
    const diaryEntry = getDiaryEntry(date)
    return tasksForDate.length > 0 || (diaryEntry && diaryEntry.trim())
  }

  const renderCalendarDays = () => {
    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 p-2 border border-stone-100"></div>)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = date.toDateString() === today.toDateString()
      const tasksForDate = getTasksForDate(date)
      const completedTasks = tasksForDate.filter((task) => task.completed).length
      const totalTasks = tasksForDate.length
      const hasContentForDate = hasContent(date)

      days.push(
        <div
          key={day}
          className={`h-24 p-2 border border-stone-100 cursor-pointer transition-all duration-200 hover:bg-stone-50 ${
            isToday ? "bg-gradient-to-br from-amber-50 to-rose-50 border-amber-200" : "bg-white/50"
          } ${hasContentForDate ? "ring-1 ring-amber-200" : ""}`}
          onClick={() => onDateSelect(date)}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-1">
              <span className={`text-sm font-medium ${isToday ? "text-amber-700" : "text-stone-700"}`}>{day}</span>
              {hasContentForDate && <Circle className="w-2 h-2 fill-amber-400 text-amber-400" />}
            </div>

            {totalTasks > 0 && (
              <div className="flex-1 flex flex-col justify-end">
                <Badge variant="outline" className="text-xs bg-white/70 border-stone-300 text-stone-600 w-fit">
                  {completedTasks}/{totalTasks}
                </Badge>
              </div>
            )}
          </div>
        </div>,
      )
    }

    return days
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif font-bold text-stone-800">
          {monthNames[month]} {year}
        </h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={previousMonth}
            className="border-stone-300 text-stone-600 hover:bg-stone-50 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextMonth}
            className="border-stone-300 text-stone-600 hover:bg-stone-50 bg-transparent"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white/70 rounded-lg border border-stone-200/50 shadow-sm overflow-hidden">
        {/* Day Headers */}
        <div className="grid grid-cols-7 bg-stone-50/80">
          {dayNames.map((dayName) => (
            <div
              key={dayName}
              className="p-3 text-center text-sm font-medium text-stone-600 border-r border-stone-100 last:border-r-0"
            >
              {dayName}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7">{renderCalendarDays()}</div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 text-sm text-stone-600">
        <div className="flex items-center space-x-2">
          <Circle className="w-2 h-2 fill-amber-400 text-amber-400" />
          <span>Has content</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded"></div>
          <span>Today</span>
        </div>
      </div>
    </div>
  )
}
