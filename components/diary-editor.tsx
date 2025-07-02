"use client"

import { useState, useEffect } from "react"
import { Save, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface DiaryEditorProps {
  selectedDate: Date
}

export default function DiaryEditor({ selectedDate }: DiaryEditorProps) {
  const [content, setContent] = useState("")
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [isModified, setIsModified] = useState(false)

  const dateKey = selectedDate.toDateString()

  useEffect(() => {
    // Load diary entry for selected date
    const entries = JSON.parse(localStorage.getItem("planmate-diary") || "{}")
    const entry = entries[dateKey] || ""
    setContent(entry)
    setIsModified(false)
  }, [dateKey])

  useEffect(() => {
    // Auto-save after 2 seconds of inactivity
    if (isModified) {
      const timer = setTimeout(() => {
        saveEntry()
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [content, isModified])

  const saveEntry = () => {
    const entries = JSON.parse(localStorage.getItem("planmate-diary") || "{}")
    entries[dateKey] = content
    localStorage.setItem("planmate-diary", JSON.stringify(entries))
    setLastSaved(new Date())
    setIsModified(false)
  }

  const handleContentChange = (value: string) => {
    setContent(value)
    setIsModified(true)
  }

  const wordCount = content
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-rose-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-amber-700" />
          </div>
          <div>
            <h3 className="font-serif font-medium text-stone-800">Daily Reflection</h3>
            <p className="text-sm text-stone-600">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {wordCount > 0 && (
            <Badge variant="outline" className="bg-white/50 text-stone-600 border-stone-300">
              {wordCount} words
            </Badge>
          )}
          {lastSaved && (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              Saved {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Badge>
          )}
          {isModified && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
              Unsaved changes
            </Badge>
          )}
        </div>
      </div>

      {/* Editor */}
      <div className="bg-white/80 rounded-lg border border-stone-200/50 shadow-sm">
        <Textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder="What's on your mind today? Reflect on your day, jot down thoughts, or capture memories..."
          className="min-h-[400px] border-0 resize-none focus:ring-0 text-stone-700 placeholder:text-stone-400 font-serif text-base leading-relaxed"
          style={{
            fontFamily: '"Playfair Display", "Georgia", serif',
            lineHeight: "1.8",
          }}
        />
      </div>

      {/* Manual Save Button */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-stone-500">Your entries are automatically saved as you type</p>
        <Button
          onClick={saveEntry}
          disabled={!isModified}
          className="bg-gradient-to-r from-amber-600 to-rose-600 hover:from-amber-700 hover:to-rose-700 text-white disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Now
        </Button>
      </div>

      {/* Writing Tips */}
      {content.length === 0 && (
        <div className="bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg p-4 border border-stone-200/50">
          <h4 className="font-serif font-medium text-stone-800 mb-2">Writing Prompts</h4>
          <ul className="text-sm text-stone-600 space-y-1">
            <li>• How did I feel today and why?</li>
            <li>• What am I grateful for?</li>
            <li>• What did I learn or discover?</li>
            <li>• What challenged me and how did I handle it?</li>
            <li>• What are my hopes for tomorrow?</li>
          </ul>
        </div>
      )}
    </div>
  )
}
