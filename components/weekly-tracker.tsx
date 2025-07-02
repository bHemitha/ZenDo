"use client"

import { useMemo } from "react"
import { TrendingUp, Target, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  completed: boolean
  date: string
}

interface WeeklyTrackerProps {
  tasks: Task[]
}

export default function WeeklyTracker({ tasks }: WeeklyTrackerProps) {
  const weeklyData = useMemo(() => {
    const today = new Date()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay()) // Start from Sunday

    const weekDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      return date
    })

    const dailyStats = weekDays.map((date) => {
      const dayTasks = tasks.filter((task) => new Date(task.date).toDateString() === date.toDateString())
      const completed = dayTasks.filter((task) => task.completed).length
      const total = dayTasks.length
      const completionRate = total > 0 ? (completed / total) * 100 : 0

      return {
        date,
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        completed,
        total,
        completionRate,
      }
    })

    const totalCompleted = dailyStats.reduce((sum, day) => sum + day.completed, 0)
    const totalTasks = dailyStats.reduce((sum, day) => sum + day.total, 0)
    const overallCompletionRate = totalTasks > 0 ? (totalCompleted / totalTasks) * 100 : 0

    return {
      dailyStats,
      totalCompleted,
      totalTasks,
      overallCompletionRate,
    }
  }, [tasks])

  const getMotivationalMessage = (rate: number) => {
    if (rate >= 90) return "Outstanding! You're crushing your goals! 🌟"
    if (rate >= 75) return "Excellent work! Keep up the momentum! 🚀"
    if (rate >= 60) return "Good progress! You're on the right track! 💪"
    if (rate >= 40) return "Making steady progress! Keep going! 📈"
    if (rate >= 20) return "Every step counts! You've got this! 🌱"
    return "Fresh start! Today is full of possibilities! ✨"
  }

  const maxHeight = Math.max(...weeklyData.dailyStats.map((day) => day.total), 1)

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-50 to-rose-50 border-amber-200/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Target className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Completion Rate</p>
                <p className="text-2xl font-bold text-stone-800">{Math.round(weeklyData.overallCompletionRate)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-stone-800">{weeklyData.totalCompleted}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200/50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-stone-600">Total Tasks</p>
                <p className="text-2xl font-bold text-stone-800">{weeklyData.totalTasks}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-amber-50 via-rose-50 to-stone-50 border-stone-200/50">
        <CardContent className="p-6 text-center">
          <h3 className="font-serif text-lg font-medium text-stone-800 mb-2">
            {getMotivationalMessage(weeklyData.overallCompletionRate)}
          </h3>
          <p className="text-stone-600">
            You've completed {weeklyData.totalCompleted} out of {weeklyData.totalTasks} tasks this week
          </p>
        </CardContent>
      </Card>

      {/* Weekly Chart */}
      <Card className="bg-white/70 border-stone-200/50 shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-stone-800">Daily Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chart */}
            <div className="flex items-end justify-between h-48 bg-stone-50/50 rounded-lg p-4">
              {weeklyData.dailyStats.map((day, index) => {
                const height = maxHeight > 0 ? (day.total / maxHeight) * 100 : 0
                const completedHeight = day.total > 0 ? (day.completed / day.total) * height : 0
                const isToday = day.date.toDateString() === new Date().toDateString()

                return (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="relative w-8 h-32 bg-stone-200 rounded-full overflow-hidden">
                      {height > 0 && (
                        <>
                          {/* Total tasks background */}
                          <div
                            className="absolute bottom-0 w-full bg-stone-300 rounded-full transition-all duration-500"
                            style={{ height: `${height}%` }}
                          />
                          {/* Completed tasks overlay */}
                          <div
                            className="absolute bottom-0 w-full bg-gradient-to-t from-amber-500 to-rose-500 rounded-full transition-all duration-500"
                            style={{ height: `${completedHeight}%` }}
                          />
                        </>
                      )}
                    </div>

                    <div className="text-center">
                      <p className={`text-xs font-medium ${isToday ? "text-amber-700" : "text-stone-600"}`}>
                        {day.dayName}
                      </p>
                      <p className="text-xs text-stone-500">
                        {day.completed}/{day.total}
                      </p>
                      {isToday && (
                        <Badge variant="outline" className="text-xs mt-1 bg-amber-50 text-amber-700 border-amber-200">
                          Today
                        </Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-t from-amber-500 to-rose-500 rounded-full"></div>
                <span className="text-stone-600">Completed</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stone-300 rounded-full"></div>
                <span className="text-stone-600">Remaining</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Daily Breakdown */}
      <Card className="bg-white/70 border-stone-200/50 shadow-sm">
        <CardHeader>
          <CardTitle className="font-serif text-stone-800">This Week's Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {weeklyData.dailyStats.map((day, index) => {
              const isToday = day.date.toDateString() === new Date().toDateString()
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isToday ? "bg-gradient-to-r from-amber-50 to-rose-50 border border-amber-200" : "bg-stone-50/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        day.completionRate >= 80
                          ? "bg-green-500"
                          : day.completionRate >= 60
                            ? "bg-amber-500"
                            : day.completionRate >= 40
                              ? "bg-orange-500"
                              : day.total > 0
                                ? "bg-red-500"
                                : "bg-stone-300"
                      }`}
                    />
                    <div>
                      <p className={`font-medium ${isToday ? "text-amber-800" : "text-stone-800"}`}>
                        {day.date.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                      {day.total > 0 && (
                        <p className="text-sm text-stone-600">{Math.round(day.completionRate)}% completion rate</p>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-medium text-stone-800">
                      {day.completed}/{day.total}
                    </p>
                    <p className="text-sm text-stone-500">tasks</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
