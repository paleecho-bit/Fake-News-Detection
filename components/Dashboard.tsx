type HistoryItem = {
  result: string;
  // Add other fields if needed
};

interface DashboardProps {
  history: HistoryItem[];
}

export default function Dashboard({ history }: DashboardProps) {

return(

<div className="grid grid-cols-3 gap-6 mb-6">

<div className="bg-[#0d1220] border border-[#1a2438] p-5 rounded-xl">
<h3 className="text-gray-400 text-sm">Total Analysed</h3>
<p className="text-2xl font-bold text-cyan-400">{history.length}</p>
</div>

<div className="bg-[#0d1220] border border-[#1a2438] p-5 rounded-xl">
<h3 className="text-gray-400 text-sm">Fake News</h3>
<p className="text-2xl font-bold text-red-400">
{history.filter(h => h.result === "FAKE").length}
</p>
</div>

<div className="bg-[#0d1220] border border-[#1a2438] p-5 rounded-xl">
<h3 className="text-gray-400 text-sm">Real News</h3>
<p className="text-2xl font-bold text-green-400">
{history.filter(h => h.result === "REAL").length}
</p>
</div>

</div>
)

}