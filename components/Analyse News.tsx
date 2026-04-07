export default function AnalyseNews({
  newsText,
  setNewsText,
  analyzeNews,
  tryRealNews,
  tryFakeNews,
  loading,
  prediction,
  confidence
}: any) {

  return (
    <div className="space-y-4">

      <h2 className="text-xl font-bold">Analyse News</h2>

      <textarea
        className="w-full h-32 p-3 bg-[#0a0e17] border border-[#1a2438] rounded"
        value={newsText}
        onChange={(e) => setNewsText(e.target.value)}
        placeholder="Enter news text..."
      />

      {/* Buttons */}
      <div className="flex gap-2">

        <button
          onClick={tryRealNews}
          className="bg-green-500 px-3 py-1 rounded"
        >
          Try Real News
        </button>

        <button
          onClick={tryFakeNews}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Try Fake News
        </button>

      </div>

      {/* Analyze Button */}
      <button
        onClick={analyzeNews}
        className="bg-cyan-500 px-4 py-2 rounded"
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {/* Result */}
      {prediction && (
        <div className="mt-4 bg-[#0d1220] p-3 rounded">

          <p className="text-lg font-semibold">
            Result: {prediction}
          </p>

          <p>
            Confidence: {confidence}%
          </p>

        </div>
      )}

    </div>
  );
}