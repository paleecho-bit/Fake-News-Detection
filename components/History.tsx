"use client"

type HistoryItem = {
  title: string
  result: string
  confidence: number
  time: string
}

export default function History({ history }: { history: HistoryItem[] }) {

  return (

    <section className="bg-[#0d1220] rounded-2xl border border-[#1a2438] p-6">

      <h2 className="text-xl font-semibold mb-4">Analysis History</h2>

      {history.length === 0 && (
        <p className="text-gray-400 text-sm">
          No news has been analyzed yet.
        </p>
      )}

      <div className="space-y-3">

        {history.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between bg-[#0a0e17] p-4 rounded-lg border border-[#1a2438]"
          >

            <div>
              <p className="text-sm text-gray-300">
                {item.title}
              </p>

              <p className="text-xs text-gray-500">
                {item.time}
              </p>
            </div>

            <div className="text-right">

              <p
                className={`font-bold ${
                  item.result === "Real"
                    ? "text-emerald-400"
                    : "text-red-400"
                }`}
              >
                {item.result}
              </p>

              <p className="text-xs text-gray-400">
                {item.confidence}%
              </p>

            </div>

          </div>

        ))}

      </div>

    </section>

  )
}