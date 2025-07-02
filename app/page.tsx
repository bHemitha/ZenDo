"use client"

import { useState, useEffect } from "react"
import { Calendar, CheckCircle, Clock, BookOpen, BarChart3, Quote } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import TodoList from "@/components/todo-list"
import CalendarView from "@/components/calendar-view"
import DiaryEditor from "@/components/diary-editor"
import TimeBlocks from "@/components/time-blocks"
import WeeklyTracker from "@/components/weekly-tracker"
import DailyAffirmation from "@/components/daily-affirmation"

type ViewType = "today" | "calendar" | "diary" | "schedule" | "tracker"

export default function PlanMate() {
  const [currentView, setCurrentView] = useState<ViewType>("today")
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [tasks, setTasks] = useState([])
  const [completedToday, setCompletedToday] = useState(0)
  const [totalToday, setTotalToday] = useState(0)

  useEffect(() => {
    // Load tasks from localStorage
    const savedTasks = localStorage.getItem("planmate-tasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    // Calculate today's completion stats
    const today = new Date().toDateString()
    const todayTasks = tasks.filter((task) => new Date(task.date).toDateString() === today)
    setTotalToday(todayTasks.length)
    setCompletedToday(todayTasks.filter((task) => task.completed).length)
  }, [tasks])

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setCurrentView("diary")
  }

  const navigationItems = [
    { id: "today", label: "Today", icon: CheckCircle },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "diary", label: "Diary", icon: BookOpen },
    { id: "schedule", label: "Schedule", icon: Clock },
    { id: "tracker", label: "Tracker", icon: BarChart3 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-stone-50 to-rose-50">
      {/* Header */}
      <header className="border-b border-stone-200/50 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-rose-600 rounded-lg flex items-center justify-center">
                <Quote className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-2xl font-serif font-bold text-stone-800">PlanMate</h1>
            </div>

            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="bg-white/50 text-stone-600 border-stone-300">
                {completedToday}/{totalToday} completed today
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white/70 backdrop-blur-sm border-stone-200/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-serif text-stone-800">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Button
                      key={item.id}
                      variant={currentView === item.id ? "default" : "ghost"}
                      className={`w-full justify-start font-medium ${
                        currentView === item.id
                          ? "bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-md"
                          : "text-stone-700 hover:bg-stone-100/50"
                      }`}
                      onClick={() => setCurrentView(item.id as ViewType)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      {item.label}
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* Daily Affirmation */}
            <div className="mt-6">
              <DailyAffirmation />
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {currentView === "today" && (
              <div className="space-y-6">
                <Card className="bg-white/70 backdrop-blur-sm border-stone-200/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl font-serif text-stone-800 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-amber-600" />
                      Today's Tasks
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TodoList selectedDate={new Date()} tasks={tasks} setTasks={setTasks} />
                  </CardContent>
                </Card>
              </div>
            )}

            {currentView === "calendar" && (
              <Card className="bg-white/70 backdrop-blur-sm border-stone-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-stone-800 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-amber-600" />
                    Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CalendarView onDateSelect={handleDateSelect} tasks={tasks} />
                </CardContent>
              </Card>
            )}

            {currentView === "diary" && (
              <Card className="bg-white/70 backdrop-blur-sm border-stone-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-stone-800 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-amber-600" />
                    Daily Diary -{" "}
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DiaryEditor selectedDate={selectedDate} />
                </CardContent>
              </Card>
            )}

            {currentView === "schedule" && (
              <Card className="bg-white/70 backdrop-blur-sm border-stone-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-stone-800 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-amber-600" />
                    Time Blocks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TimeBlocks selectedDate={selectedDate} tasks={tasks} setTasks={setTasks} />
                </CardContent>
              </Card>
            )}

            {currentView === "tracker" && (
              <Card className="bg-white/70 backdrop-blur-sm border-stone-200/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-serif text-stone-800 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-amber-600" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <WeeklyTracker tasks={tasks} />
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
