"use client"
import { useEffect, useState } from "react"
const API = process.env.NEXT_PUBLIC_API_URL
export default function Settings() {

  const [darkMode, setDarkMode] = useState(true)
  const [autoAnalyze, setAutoAnalyze] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [loading, setLoading] = useState(false)

  // ✅ LOAD SETTINGS FROM BACKEND
  useEffect(() => {
    fetch("(`${API}/settings`)")
      .then(res => res.json())
      .then(data => {
        setDarkMode(data.darkMode ?? true)
        setAutoAnalyze(data.autoAnalyze ?? false)
        setNotifications(data.notifications ?? true)
      })
      .catch(() => {
        console.log("Using default settings")
      })
  }, [])

  // ✅ SAVE SETTINGS
  const saveSettings = async () => {
    try {
      setLoading(true)

      await fetch("(`${API}/settings')", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          darkMode,
          autoAnalyze,
          notifications
        })
      })

      alert("Settings saved ✅")

    } catch (err) {
      alert("Failed to save settings ❌")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold">⚙️ Settings</h2>

      {/* DARK MODE */}
      <div className="flex justify-between items-center bg-[#1a2438] p-4 rounded-xl">
        <span>🌙 Dark Mode</span>
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
        />
      </div>

      {/* AUTO ANALYZE */}
      <div className="flex justify-between items-center bg-[#1a2438] p-4 rounded-xl">
        <span>⚡ Auto Analyze</span>
        <input
          type="checkbox"
          checked={autoAnalyze}
          onChange={() => setAutoAnalyze(!autoAnalyze)}
        />
      </div>

      {/* NOTIFICATIONS */}
      <div className="flex justify-between items-center bg-[#1a2438] p-4 rounded-xl">
        <span>🔔 Notifications</span>
        <input
          type="checkbox"
          checked={notifications}
          onChange={() => setNotifications(!notifications)}
        />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={saveSettings}
        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 py-3 rounded-lg text-black font-bold"
      >
        {loading ? "Saving..." : "💾 Save Settings"}
      </button>

    </div>
  )
}