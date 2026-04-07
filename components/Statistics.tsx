"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts"

type HistoryItem = {
  title: string
  result: string
  time: string
}

export default function Statistics({ history }: { history: HistoryItem[] }) {

  const fakeCount = history.filter((h) => h.result === "Fake").length
  const realCount = history.filter((h) => h.result === "Real").length

  const pieData = [
    { name: "Fake", value: fakeCount },
    { name: "Real", value: realCount }
  ]

  const barData = [
    { name: "Fake News", count: fakeCount },
    { name: "Real News", count: realCount }
  ]

  const COLORS = ["#ef4444", "#10b981"]

  return (
    <div className="flex flex-col items-center gap-10">

      {/* Title */}
      <h2 className="text-xl font-semibold text-white">
        News Detection Statistics
      </h2>

      {/* Pie Chart */}
      <PieChart width={400} height={300}>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label
        >
          {pieData.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />

      </PieChart>

      {/* Percentage Info */}
      <div className="flex gap-10 text-sm">

        <div className="text-red-400">
          Fake News: <span className="font-bold">{fakeCount}</span>
        </div>

        <div className="text-emerald-400">
          Real News: <span className="font-bold">{realCount}</span>
        </div>

      </div>

      {/* Bar Graph */}
      <BarChart
        width={400}
        height={250}
        data={barData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="count" fill="#06b6d4" />

      </BarChart>

    </div>
  )
}