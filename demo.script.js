module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: { extend: { colors: { 'sf-black': '#0A0A0A', 'sf-gold': '#C8A227' } }
}
  import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req) {
  const { revenue, errors, riskHistory } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role: "system", content: "You are SMARTFORX AI CEO. Predict risks and give 1 automation action. Be direct."},
      {role: "user", content: `Data: Revenue $${revenue}, Errors: ${errors}, RiskHistory: ${riskHistory}. Predict risk % and 1 action.`}
    ]
  });

  const aiText = completion.choices[0].message.content;
  const riskMatch = aiText.match(/(\d+)%/);
  const risk = riskMatch? parseInt(riskMatch[1]) : 20;

  let action = "System Stable";
  if(risk > 60) action = "CRITICAL: Freeze transactions + Alert CEO";
  else if(risk > 40) action = "WARNING: Increase monitoring + Backup data";

  return Response.json({ risk, action, reasoning: aiText });
}
'use client'
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale);

export default function Dashboard() {
  const [agents, setAgents] = useState(3);
  const [risk, setRisk] = useState(0);
  const [kpi, setKpi] = useState({revenue:125000, errors:0, autoRun:0});
  const [logs, setLogs] = useState(["SYSTEM BOOT: OMNI-CORE ONLINE"]);
  const [chartData, setChartData] = useState(Array(20).fill(0));

  const addLog = (msg) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`,...prev].slice(0,50));

  const runPrediction = async () => {
    const res = await fetch('/api/predict', {
      method: 'POST',
      body: JSON.stringify({...kpi, riskHistory: chartData})
    });
    const data = await res.json();
    setRisk(data.risk);
    setChartData(prev => [...prev.slice(1), data.risk]);
    addLog(`AI PREDICTION: Risk ${data.risk}%. ${data.action}`);
    if(data.risk > 40){ setKpi(p=>({...p, autoRun: p.autoRun+1})); }
  }

  useEffect(() => {
    const i1 = setInterval(runPrediction, 3000);
    const i2 = setInterval(()=>setKpi(p=>({...p, revenue: p.revenue + Math.floor(Math.random()*200)})),1000);
    return ()=>{clearInterval(i1); clearInterval(i2)}
  }, [kpi]);

  return (
    <div className="p-6 grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 border border-sf-gold p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-sf-gold mb-4">AI PREDICTION ENGINE</h2>
        <Line data={{labels: Array(20).fill(''), datasets:[{data: chartData, borderColor:'#C8A227'}]}} />
        <p className="mt-4 text-4xl font-bold">Risk: <span className="text-sf-gold">{risk}%</span></p>
      </div>

      <div className="border border-sf-gold p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-sf-gold mb-4">LIVE KPIs</h2>
        <p>Revenue: <span className="text-sf-gold">${kpi.revenue.toLocaleString()}</span></p>
        <p>Errors: <span className="text-red-500">{kpi.errors}</span></p>
        <p>Automations: <span className="text-green-400">{kpi.autoRun}</span></p>
        <button onClick={()=>setAgents(agents===3?8:3)} className="mt-4 bg-sf-gold text-black px-4 py-2 rounded font-bold w-full">
          SCALE: {agents} AGENTS
        </button>
      </div>

      <div className="lg:col-span-2 border border-sf-gold p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-sf-gold mb-4">AUTONOMOUS AGENTS</h2>
        {Array.from({length:agents}).map((_,i)=>(
          <div key={i} className="bg-[#1a1a1a] border-l-4 border-green-400 p-3 my-2">
            Agent {i+1} | ACTIVE | Task: {['Fraud Scan','API Monitor','Data Sync'][i%3]}
          </div>
        ))}
      </div>

      <div className="border border-sf-gold p-6 rounded-xl">
        <h2 className="text-2xl font-bold text-sf-gold mb-4">AUDIT LOG</h2>
        <div className="h-80 overflow-y-auto bg-black text-xs font-mono">
          {logs.map((l,i)=><div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  )
]
'use client'
export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-sf-gold mb-2">Book Your Automation Call</h2>
      <p className="text-gray-400 mb-6">Leads hit my inbox + Slack instantly</p>

      <form action="https://formspree.io/f/xqkqzrpl" method="POST" className="space-y-4">
        <input type="text" name="company" placeholder="Company Name" required
          className="w-full p-3 bg-[#1a1a1a] border-sf-gold rounded-lg"/>
        <input type="email" name="email" placeholder="CEO Email" required
          className="w-full p-3 bg-[#1a1a1a] border-sf-gold rounded-lg"/>
        <textarea name="pain" placeholder="What process do you want automated?" rows="4"
          className="w-full p-3 bg-[#1a1a1a] border border-sf-gold rounded-lg"></textarea>
        <button type="submit" className="bg-sf-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 w-full">
          Send To SMARTFORX
        </button>
      </form>
      <p className="text-xs mt-4 text-gray-500">Replace xqkqzrpl with your Formspree ID</p>
    </div>
  )
}
'use client'
export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-4xl font-bold text-sf-gold mb-2">Book Your Automation Call</h2>
      <p className="text-gray-400 mb-6">Leads hit my inbox + Slack instantly</p>

      <form action="https://formspree.io/f/xqkqzrpl" method="POST" className="space-y-4">
        <input type="text" name="company" placeholder="Company Name" required
          className="w-full p-3 bg-[#1a1a1a] border-sf-gold rounded-lg"/>
        <input type="email" name="email" placeholder="CEO Email" required
          className="w-full p-3 bg-[#1a1a1a] border-sf-gold rounded-lg"/>
        <textarea name="pain" placeholder="What process do you want automated?" rows="4"
          className="w-full p-3 bg-[#1a1a1a] border border-sf-gold rounded-lg"></textarea>
        <button type="submit" className="bg-sf-gold text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-400 w-full">
          Send To SMARTFORX
        </button>
      </form>
      <p className="text-xs mt-4 text-gray-500">Replace xqkqzrpl with your Formspree ID</p>
    </div>
  )
}
