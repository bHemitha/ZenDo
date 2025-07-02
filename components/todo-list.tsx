"use client"

import { useState, useEffect } from "react"
import { Plus, Trash2, Clock, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  date: string
  startTime?: string
  endTime?: string
  createdAt: string
}

interface TodoListProps {
  selectedDate: Date
  tasks: Task[]
  setTasks: (tasks: Task[]) => void
}

export default function TodoList({ selectedDate, tasks, setTasks }: TodoListProps) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [showAddForm, setShowAddForm] = useState(false)

  const dateString = selectedDate.toDateString()
  const todayTasks = tasks.filter((task) => new Date(task.date).toDateString() === dateString)

  useEffect(() => {
    localStorage.setItem("planmate-tasks", JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      description: newTaskDescription.trim() || undefined,
      completed: false,
      date: selectedDate.toISOString(),
      createdAt: new Date().toISOString(),
    }

    setTasks([...tasks, newTask])
    setNewTaskTitle("")
    setNewTaskDescription("")
    setShowAddForm(false)
  }

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const completedCount = todayTasks.filter((task) => task.completed).length
  const totalCount = todayTasks.length

  return (
    <div className="space-y-4">
      {/* Progress Summary */}
      {totalCount > 0 && (
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg border border-stone-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="font-serif font-medium text-stone-800">
                {completedCount} of {totalCount} completed
              </p>
              <p className="text-sm text-stone-600">
                {totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}% progress
              </p>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/50 text-stone-700 border-stone-300">
            {totalCount - completedCount} remaining
          </Badge>
        </div>
      )}

      {/* Add Task Button */}
      {!showAddForm && (
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white font-medium py-3 rounded-lg shadow-md transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Task
        </Button>
      )}

      {/* Add Task Form */}
      {showAddForm && (
        <Card className="bg-white/80 border-stone-200/50 shadow-sm">
          <CardContent className="p-4 space-y-3">
            <Input
              placeholder="Task title..."
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="font-medium border-stone-300 focus:border-amber-500 focus:ring-amber-500/20"
              onKeyDown={(e) => e.key === "Enter" && addTask()}
            />
            <Textarea
              placeholder="Description (optional)..."
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              className="border-stone-300 focus:border-amber-500 focus:ring-amber-500/20 resize-none"
              rows={2}
            />
            <div className="flex space-x-2">
              <Button
                onClick={addTask}
                className="flex-1 bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white"
              >
                Add Task
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowAddForm(false)
                  setNewTaskTitle("")
                  setNewTaskDescription("")
                }}
                className="border-stone-300 text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <div className="space-y-3">
        {todayTasks.length === 0 ? (
          <div className="text-center py-12">
            <Circle className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <p className="text-stone-500 font-medium">No tasks for this day</p>
            <p className="text-sm text-stone-400">Add a task to get started</p>
          </div>
        ) : (
          todayTasks.map((task) => (
            <Card
              key={task.id}
              className={`transition-all duration-200 hover:shadow-md ${
                task.completed ? "bg-stone-50/80 border-stone-200/50" : "bg-white/80 border-stone-200/50"
              }`}
            >
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 transition-colors duration-200 ${
                      task.completed ? "text-amber-600" : "text-stone-400 hover:text-amber-600"
                    }`}
                  >
                    {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </button>

                  <div className="flex-1 min-w-0">
                    <h3 className={`font-medium ${task.completed ? "text-stone-500 line-through" : "text-stone-800"}`}>
                      {task.title}
                    </h3>
                    {task.description && (
                      <p className={`text-sm mt-1 ${task.completed ? "text-stone-400" : "text-stone-600"}`}>
                        {task.description}
                      </p>
                    )}
                    {(task.startTime || task.endTime) && (
                      <div className="flex items-center mt-2 text-xs text-stone-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {task.startTime && task.endTime
                          ? `${task.startTime} - ${task.endTime}`
                          : task.startTime || task.endTime}
                      </div>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTask(task.id)}
                    className="text-stone-400 hover:text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
