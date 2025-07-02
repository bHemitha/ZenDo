"use client"

import { useState } from "react"
import { Clock, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  date: string
  startTime?: string
  endTime?: string
}

interface TimeBlocksProps {
  selectedDate: Date
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}

export default function TimeBlocks({ selectedDate, tasks, setTasks }: TimeBlocksProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newStartTime, setNewStartTime] = useState("")
  const [newEndTime, setNewEndTime] = useState("")

  const dateString = selectedDate.toDateString()
  const dayTasks = tasks.filter((task) => new Date(task.date).toDateString() === dateString)

  const scheduledTasks = dayTasks.filter((task) => task.startTime)
  const unscheduledTasks = dayTasks.filter((task) => !task.startTime)

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i
    const time12 =
      hour === 0 ? "12:00 AM" : hour < 12 ? `${hour}:00 AM` : hour === 12 ? "12:00 PM" : `${hour - 12}:00 PM`
    const time24 = `${hour.toString().padStart(2, "0")}:00`
    return { hour, time12, time24 }
  })

  const addTimeBlock = () => {
    if (!newTaskTitle.trim() || !newStartTime) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      completed: false,
      date: selectedDate.toISOString(),
      startTime: newStartTime,
      endTime: newEndTime || undefined,
      createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    setNewStartTime("")
    setNewEndTime("")
    setShowAddForm(false)
  }

  const updateTaskTime = (taskId: string, startTime: string, endTime?: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, startTime, endTime } : task)))
  }

  const removeTimeBlock = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, startTime: undefined, endTime: undefined } : task)))
  }

  const getTasksForHour = (hour: number) => {
    return scheduledTasks.filter((task) => {
      if (!task.startTime) return false
      const taskHour = Number.parseInt(task.startTime.split(":")[0])
      return taskHour === hour
    })
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  return (
    <div className="space-y-6">
      {/* Add Time Block */}
      {!showAddForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-medium py-3 rounded-lg shadow-md"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule New Task
        </Button>
      )}

      {showAddForm && (
        <Card className="bg-white/80 border-stone-200/50 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="font-medium border-stone-300 focus:border-amber-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium text-stone-700 mb-1 block">Start Time</label>
                <Input
                  type="time"
                  value={newStartTime}
                  onChange={(e) => setNewStartTime(e.target.value)}
                  className="border-stone-300 focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-stone-700 mb-1 block">End Time (Optional)</label>
                <Input
                  type="time"
                  value={newEndTime}
                  onChange={(e) => setNewEndTime(e.target.value)}
                  className="border-stone-300 focus:border-amber-500"
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={addTimeBlock}
                className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white"
              >
                Schedule Task
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false)
                  setNewTaskTitle("")
                  setNewStartTime("")
                  setNewEndTime("")
                }}
                className="border-stone-300 text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Schedule */}
        <div className="lg:col-span-2">
          <h3 className="font-serif font-medium text-stone-800 mb-4 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-amber-600" />
            Daily Schedule
          </h3>

          <div className="bg-white/70 rounded-lg border border-stone-200/50 shadow-sm max-h-96 overflow-y-auto">
            {timeSlots.map(({ hour, time12, time24 }) => {
              const hourTasks = getTasksForHour(hour)
              return (
                <div key={hour} className="border-b border-stone-100 last:border-b-0">
                  <div className="flex">
                    <div className="w-20 p-3 bg-stone-50/50 border-r border-stone-100 text-center">
                      <span className="text-sm font-medium text-stone-600">{time12}</span>
                    </div>
                    <div className="flex-1 p-3 min-h-[60px]">
                      {hourTasks.length > 0 ? (
                        <div className="space-y-2">
                          {hourTasks.map((task) => (
                            <div
                              key={task.id}
                              className={`p-2 rounded-md border transition-all duration-200 ${
                                task.completed
                                  ? "bg-stone-50 border-stone-200 opacity-75"
                                  : "bg-gradient-to-r from-amber-50 to-rose-50 border-amber-200"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() => toggleTask(task.id)}
                                    className={`w-4 h-4 rounded border-2 transition-colors ${
                                      task.completed
                                        ? "bg-amber-500 border-amber-500"
                                        : "border-stone-300 hover:border-amber-500"
                                    }`}
                                  >
                                    {task.completed && (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                      </div>
                                    )}
                                  </button>
                                  <span
                                    className={`text-sm font-medium ${
                                      task.completed ? "text-stone-500 line-through" : "text-stone-800"
                                    }`}
                                  >
                                    {task.title}
                                  </span>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeTimeBlock(task.id)}
                                  className="text-stone-400 hover:text-red-500 p-1 h-auto"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                              {task.endTime && (
                                <div className="text-xs text-stone-500 mt-1">
                                  Until{" "}
                                  {new Date(`2000-01-01T${task.endTime}`).toLocaleTimeString([], {
                                    hour: "numeric",
                                    minute: "2-digit",
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-stone-400 text-sm italic">No scheduled tasks</div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Unscheduled Tasks */}
        <div>
          <h3 className="font-serif font-medium text-stone-800 mb-4">Unscheduled Tasks</h3>

          {unscheduledTasks.length > 0 ? (
            <div className="space-y-2">
              {unscheduledTasks.map((task) => (
                <Card key={task.id} className="bg-white/80 border-stone-200/50 shadow-sm">
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-stone-800">{task.title}</span>
                      <Badge variant="outline" className="text-xs bg-stone-50 text-stone-600 border-stone-300">
                        Unscheduled
                      </Badge>
                    </div>
                    <Select onValueChange={(time) => updateTaskTime(task.id, time)}>
                      <SelectTrigger className="h-8 text-xs border-stone-300">
                        <SelectValue placeholder="Add to schedule" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map(({ time12, time24 }) => (
                          <SelectItem key={time24} value={time24}>
                            {time12}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Clock className="w-8 h-8 text-stone-300 mx-auto mb-2" />
              <p className="text-stone-500 text-sm">All tasks are scheduled</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
