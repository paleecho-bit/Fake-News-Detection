"use client"
import { useState } from "react"

export default function UploadFile({ setNewsText }: any) {

  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    console.log("✅ Button clicked")

    if (!file) {
      alert("Select a file first")
      return
    }

    const formData = new FormData()
    formData.append("file", file)

    try {
      setLoading(true)

      console.log("📤 Sending file to backend...")

      const res = await fetch("https://fake-news-detection-5m4w.onrender.com/upload", {
        method: "POST",
        body: formData
      })

      console.log("📡 Response status:", res.status)

      if (!res.ok) {
        throw new Error("Server error")
      }

      const data = await res.json()

      console.log("📥 Response data:", data)

      if (data.text && data.text.trim() !== "") {
        setNewsText(data.text)
        alert("✅ Text extracted successfully!")
      } else {
        alert("⚠️ No text detected in file")
      }

    } catch (error) {
      console.error("❌ Upload Error:", error)
      alert("Upload failed. Check backend or console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold">Upload News File</h2>

      {/* FILE INPUT */}
      <input
        type="file"
        accept=".txt,.pdf,.docx,.jpg,.png"
        onChange={(e) => {
          const selectedFile = e.target.files?.[0]
          console.log("📁 Selected file:", selectedFile)
          setFile(selectedFile || null)
        }}
        className="block w-full text-sm text-gray-400 file:bg-cyan-500 file:text-black file:px-4 file:py-2 file:rounded-lg"
      />

      {/* BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 px-6 py-2 rounded-lg text-black font-medium hover:opacity-90 transition"
      >
        {loading ? "Uploading..." : "Upload & Extract"}
      </button>

      {/* PREVIEW */}
      {file && (
        <div className="text-sm text-gray-300">
          📄 Selected File: <span className="text-cyan-400">{file.name}</span>
        </div>
      )}

    </div>
  )
}