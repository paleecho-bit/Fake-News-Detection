export default function ExampleNews({
  setNewsText,
  analyzeNews
}: any) {

  const realNews = "Government announces new economic growth policy with positive outlook.";
  const fakeNews = "Aliens spotted controlling world leaders in secret meeting.";

  return (
    <div className="space-y-6">

      <h2 className="text-xl font-bold">Example News</h2>

      {/* Real News */}
      <div className="bg-[#0d1220] p-4 rounded-xl border border-[#1a2438]">
        <h3 className="text-emerald-400 font-semibold mb-2">Real News</h3>
        <p className="text-sm text-gray-300 mb-3">{realNews}</p>

        <button
          onClick={() => {
            setNewsText(realNews)
            analyzeNews()
          }}
          className="bg-emerald-500 px-3 py-1 rounded"
        >
          Analyze Real News
        </button>
      </div>

      {/* Fake News */}
      <div className="bg-[#0d1220] p-4 rounded-xl border border-[#1a2438]">
        <h3 className="text-red-400 font-semibold mb-2">Fake News</h3>
        <p className="text-sm text-gray-300 mb-3">{fakeNews}</p>

        <button
          onClick={() => {
            setNewsText(fakeNews)
            analyzeNews()
          }}
          className="bg-red-500 px-3 py-1 rounded"
        >
          Analyze Fake News
        </button>
      </div>

    </div>
  );
}