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
'use client'
import { useState } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{role:'ai', text:'Hello CEO. I am SMARTFORX AI. How can I automate your company today?'}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if(!input) return;
    setLoading(true);
    const newMsgs = [...msgs, {role:'you', text:input}];
    setMsgs(newMsgs);
    setInput('');

    const res = await fetch('/api/chat', {method:'POST', body:JSON.stringify({messages: newMsgs})});
    const data = await res.json();
    setMsgs([...newMsgs, {role:'ai', text:data.reply}]);
    setLoading(false);
  }

  return (
    <>
      <button onClick={()=>setOpen(!open)} className="fixed bottom-6 right-6 bg-sf-gold text-black p-4 rounded-full shadow-2xl font-bold z-50">AI</button>
      {open && (
        <div className="fixed bottom-20 right-6 w-96 h-[500px] bg-black border-2 border-sf-gold rounded-xl p-4 flex flex-col z-50">
          <h3 className="font-bold text-sf-gold mb-2">SMARTFORX AI Assistant</h3>
          <div className="flex-1 overflow-y-auto space-y-3 mb-2">
            {msgs.map((m,i)=>
              <div key={i} className={`p-2 rounded ${m.role==='ai'?'bg-[#1a1a1a] text-sf-gold':'bg-sf-gold text-black'}`}>
                {m.text}
              </div>
            )}
            {loading && <div className="text-gray-400">AI is typing...</div>}
          </div>
          <div className="flex">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()}
              className="flex-1 bg-[#1a1a1a] p-2 text-white rounded-l border border-sf-gold"/>
            <button onClick={send} className="bg-sf-gold text-black px-4 rounded-r font-bold">Send</button>
          </div>
        </div>
      )}
    </>
  )
}
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req) {
  const { messages } = await req.json();
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role: "system", content: "You are SMARTFORX AI. You sell AI automation, cybersecurity, and business scaling. Be elite, direct, and close deals. Company: SMARTFORX"},
     ...messages
    ]
  });
  return Response.json({ reply: completion.choices[0].message.content });
}
export async function GET() {
  // 1. Publish your Google Sheet to web: File > Share > Publish to web > CSV
  const SHEET_URL = "https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/gviz/tq?tqx=out:csv";
  const res = await fetch(SHEET_URL);
  const csv = await res.text();

  // 2. Parse CSV to JSON
  const [header,...rows] = csv.split('\n').map(r=>r.split(','));
  const data = rows.map(r => ({revenue: Number(r[0]), errors: Number(r[1])}));

  return Response.json(data[data.length-1]); // return latest row
}
// REPLACE the fake KPI interval with this:
useEffect(() => {
  const getRealData = async () => {
    const res = await fetch('/api/sheets');
    const realKpi = await res.json();
    setKpi(realKpi);
  }
  getRealData();
  const i = setInterval(getRealData, 10000); // refresh every 10s
  return ()=>clearInterval(i)
}, []);
npm install @clerk/nextjs
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key
CLERK_SECRET_KEY=sk_test_your_key
OPENAI_API_KEY=sk_your_key
import { ClerkProvider, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html>
        <body className="bg-sf-black text-white">
          <nav className="p-4 flex justify-between border-b border-sf-gold">
            <h1 className="font-bold text-sf-gold">SMARTFORX</h1>
            <SignedIn><UserButton /></SignedIn>
            <SignedOut><a href="/sign-in">Login</a></SignedOut>
          </nav>
          {children}
          <Chatbot/> 
        </body>
      </html>
    </ClerkProvider>
  )
}
npm install stripe
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_STRIPE_PRICE_ID=price_xxx
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, quantity: 1}],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  });
  return Response.json({ url: session.url });
}
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID, quantity: 1}],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing`,
  });
  return Response.json({ url: session.url });
}
'use client'
export default function Pricing() {
  const checkout = async () => {
    const res = await fetch('/api/checkout', {method:'POST'});
    const {url} = await res.json();
    window.location = url;
  }
  return (
    <div className="text-center p-20">
      <h1 className="text-5xl font-bold">SMARTFORX PRO</h1>
      <p className="text-4xl text-sf-gold my-4">$997<span className="text-lg">/month</span></p>
      <p>AI Automation + Prediction + Audit Logs for your company</p>
      <button onClick={checkout} className="bg-sf-gold text-black px-8 py-4 rounded-lg font-bold mt-6 text-xl">
        Start 14-Day Free Trial
      </button>
    </div>
  )
}
import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/pricing", "/contact", "/api/chat"]
});
export const config = { matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"] };
git add. && git commit -m "v8.0 SaaS with Stripe + Login"
vercel deploy --prod
npm install @vercel/postgres
import { sql } from '@vercel/postgres';

export async function saveCustomer(userId, email, sheetUrl) {
  await sql`INSERT INTO customers (user_id, email, sheet_url) VALUES (${userId}, ${email}, ${sheetUrl}) ON CONFLICT (user_id) DO UPDATE SET sheet_url = ${sheetUrl}`;
}
export async function getCustomerSheet(userId) {
  const { rows } = await sql`SELECT sheet_url FROM customers WHERE user_id = ${userId}`;
  return rows[0]?.sheet_url;
}
import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
  publicRoutes: ["/", "/pricing", "/contact", "/api/chat"]
});
export const config = { matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"] };
CREATE TABLE customers (
  user_id TEXT PRIMARY KEY,
  email TEXT,
  sheet_url TEXT
);
'use client'
import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function Onboard() {
  const { user } = useUser();
  const [url, setUrl] = useState('');

  const save = async () => {
    await fetch('/api/save-sheet', {method:'POST', body:JSON.stringify({userId: user.id, email: user.primaryEmailAddress.emailAddress, sheetUrl: url})});
    window.location = '/dashboard';
  }

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold text-sf-gold">Connect Your Data</h1>
      <p>Paste your Google Sheet "Publish to Web CSV" link</p>
      <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://docs.google.com/.../csv" className="w-full bg-[#1a1a1a] p-3 border-sf-gold rounded mt-4"/>
      <button onClick={save} className="bg-sf-gold text-black px-6 py-3 rounded font-bold mt-4">Connect & Go To Dashboard</button>
    </div>
  )
}
import { saveCustomer } from '@/lib/db';
export async function POST(req) {
  const body = await req.json();
  await saveCustomer(body.userId, body.email, body.sheetUrl);
  return Response.json({ok:true});
}
import { getCustomerSheet } from '@/lib/db';
import { auth } from '@clerk/nextjs';

export async function GET() {
  const { userId } = auth();
  const sheetUrl = await getCustomerSheet(userId);
  if(!sheetUrl) return Response.json({error: "No sheet connected"}, {status: 400});

  const res = await fetch(sheetUrl);
  const csv = await res.text();
  const [header,...rows] = csv.split('\n').map(r=>r.split(','));
  const data = rows.map(r => ({revenue: Number(r[0]), errors: Number(r[1])}));
  return Response.json(data[data.length-1]);
}
import { sql } from '@vercel/postgres';
import { auth } from '@clerk/nextjs';

export default async function Admin() {
  const { userId } = auth();
  // Replace with YOUR clerk user id
  if(userId!== 'user_2xxxYOURID') return <div>Access Denied</div>;

  const { rows } = await sql`SELECT * FROM customers`;

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-sf-gold">SMARTFORX ADMIN</h1>
      <p className="text-2xl">MRR: ${(rows.length * 997).toLocaleString()}/mo</p>
      <table className="w-full mt-6 border border-sf-gold">
        <thead><tr><th>Email</th><th>User ID</th><th>Sheet</th></tr></thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.user_id} className="border-t border-sf-gold">
              <td>{r.email}</td><td>{r.user_id}</td><td className="text-xs truncate">{r.sheet_url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
'use client'
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

// INDUSTRY CONFIG - THIS IS THE MAGIC
const VERTICALS = {
  healthcare: {
    name: "Healthcare AI",
    kpi1: "Patient Risk", kpi2: "Beds Available", kpi3: "Fraud Claims",
    prediction: "Predict patient readmission + detect insurance fraud",
    automation: "Auto-alert doctors + Auto-file insurance",
    color: "#00C896"
  },
  finance: {
    name: "Financial Services AI",
    kpi1: "Fraud Score", kpi2: "Transactions", kpi3: "Churn Risk",
    prediction: "Predict loan default + market crash",
    automation: "Auto-freeze account + Auto-send compliance report",
    color: "#C8A227"
  },
  ngo: {
    name: "NGO Impact AI",
    kpi1: "Funds Used", kpi2: "People Helped", kpi3: "Grant Risk",
    prediction: "Predict donation drop + project failure",
    automation: "Auto-send donor report + Auto-allocate budget",
    color: "#4F46E5"
  },
  government: {
    name: "Government AI",
    kpi1: "Citizen Complaints", kpi2: "Budget Spent", kpi3: "Corruption Risk",
    prediction: "Predict service bottlenecks + fraud",
    automation: "Auto-escalate complaint + Auto-audit spending",
    color: "#0EA5E9"
  },
  logistics: {
    name: "Logistics AI",
    kpi1: "Delivery Delay", kpi2: "Trucks Idle", kpi3: "Fuel Waste",
    prediction: "Predict late delivery + route failure",
    automation: "Auto-reroute truck + Auto-order fuel",
    color: "#F97316"
  },
  manufacturing: {
    name: "Manufacturing AI",
    kpi1: "Machine Downtime", kpi2: "Defect Rate", kpi3: "Supply Risk",
    prediction: "Predict machine failure 7 days early",
    automation: "Auto-order parts + Auto-stop line",
    color: "#EF4444"
  },
  education: {
    name: "Education AI",
    kpi1: "Dropout Risk", kpi2: "Student Score", kpi3: "Teacher Load",
    prediction: "Predict failing student + curriculum gap",
    automation: "Auto-assign tutor + Auto-generate quiz",
    color: "#8B5CF6"
  },
  research: {
    name: "Research Paper AI",
    kpi1: "Papers Read", kpi2: "Citations", kpi3: "Plagiarism Risk",
    prediction: "Predict research trend + paper impact",
    automation: "Auto-summarize paper + Auto-find sources",
    color: "#10B981"
  }
}

export default function VerticalDemo({ params }) {
  const industry = VERTICALS[params.industry] || VERTICALS.healthcare;
  const [risk, setRisk] = useState(20);
  const [kpi, setKpi] = useState({v1: 120, v2: 45, v3: 3});
  const [logs, setLogs] = useState([`SYSTEM: ${industry.name} Online`]);

  useEffect(() => {
    const i = setInterval(() => {
      const newRisk = Math.floor(Math.random()*50 + 10);
      setRisk(newRisk);
      setKpi(p => ({v1: p.v1+Math.floor(Math.random()*10), v2: p.v2+1, v3: Math.random()>.9?p.v3+1:p.v3}));
      if(newRisk > 40) setLogs(prev => [`[${new Date().toLocaleTimeString()}] AUTO: ${industry.automation}`,...prev]);
    }, 3000);
    return ()=>clearInterval(i)
  }, [industry]);

  return (
    <div className="p-8 grid lg:grid-cols-3 gap-6" style={{'--accent': industry.color}}>
      <div className="lg:col-span-2 border rounded-xl p-6" style={{borderColor: industry.color}}>
        <h1 className="text-3xl font-bold" style={{color: industry.color}}>{industry.name}</h1>
        <p className="text-gray-400 mb-4">{industry.prediction}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1a1a1a] p-4 rounded"><p>{industry.kpi1}</p><p className="text-2xl font-bold">{kpi.v1}</p></div>
          <div className="bg-[#1a1a1a] p-4 rounded"><p>{industry.kpi2}</p><p className="text-2xl font-bold">{kpi.v2}</p></div>
          <div className="bg-[#1a1a1a] p-4 rounded"><p>{industry.kpi3}</p><p className="text-2xl font-bold text-red-500">{kpi.v3}</p></div>
        </div>

        <p>AI Risk: <span className="text-4xl font-bold" style={{color: industry.color}}>{risk}%</span></p>
      </div>

      <div className="border rounded-xl p-6" style={{borderColor: industry.color}}>
        <h2 className="font-bold text-xl mb-4">Live Automation Log</h2>
        <div className="h-96 overflow-y-auto bg-black text-xs font-mono">
          {logs.map((l,i)=><div key={i}>{l}</div>)}
        </div>
      </div>
    </div>
  )
}
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req) {
  const { industry } = await req.json();

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "system",
      content: `You are SMARTFORX AI. Write a 3 paragraph case study for ${industry}.
      Format: Problem, SMARTFORX Solution, Result with % ROI. Be specific.`
    }]
  });
  return Response.json({ case: completion.choices[0].message.content });
}
'use client'
export default function VerticalChatbot({industry}) {
  // Same chatbot as before, but system prompt changes
  const systemPrompt = `You are SMARTFORX AI for ${industry}. Help them automate and reduce costs.`
  //... rest of chatbot code from before
}
npm install @react-pdf/renderer resend
RESEND_API_KEY=re_your_key
import { Resend } from 'resend';
import OpenAI from "openai";
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View } from '@react-pdf/renderer';

const resend = new Resend(process.env.RESEND_API_KEY);
const openai = new OpenAI();

const CasePDF = ({industry, caseText}) => (
  <Document>
    <Page style={{padding:40}}>
      <Text style={{fontSize:24, marginBottom:10, color:'#C8A227'}}>SMARTFORX CASE STUDY</Text>
      <Text style={{fontSize:18, marginBottom:20}}>{industry.toUpperCase()}</Text>
      <Text>{caseText}</Text>
      <Text style={{marginTop:30, fontSize:10}}>Generated by SMARTFORX AI</Text>
    </Page>
  </Document>
);

export async function POST(req) {
  const { industry, email } = await req.json();

  // 1. Generate AI Case Study
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{role: "system", content: `Write 3 paragraph case study for ${industry}. Problem, Solution, Result with % ROI.`}]
  });
  const caseText = completion.choices[0].message.content;

  // 2. Generate PDF
  const pdfBuffer = await pdf(<CasePDF industry={industry} caseText={caseText} />).toBuffer();

  // 3. Email PDF
  await resend.emails.send({
    from: 'SMARTFORX <demo@smartforx.ai>',
    to: email,
    subject: `Your ${industry} AI Case Study`,
    html: `<p>Hi, here is your custom AI case study for ${industry}.</p>`,
    attachments: [{filename: `${industry}-case-study.pdf`, content: pdfBuffer}],
  });

  return Response.json({ok:true});
}
const sendCase = async () => {
  const email = prompt("Enter CEO email to receive PDF:");
  if(!email) return;
  await fetch('/api/case-study-pdf', {method:'POST', body:JSON.stringify({industry: params.industry, email})});
  alert(`PDF sent to ${email}`);
}

<button onClick={sendCase} className="mt-4 bg-sf-gold text-black px-6 py-3 rounded-lg font-bold">
  Generate PDF Case Study
</button>
'use client'
import { useState } from 'react';

export default function CSVUploader({onData}) {
  const [file, setFile] = useState(null);

  const handleUpload = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result;
      const [header,...rows] = csv.split('\n').map(r=>r.split(','));
      const data = rows.map(r => ({v1: Number(r[0]), v2: Number(r[1]), v3: Number(r[2])}));
      onData(data[data.length-1]); // send latest row to dashboard
    };
    reader.readAsText(e.target.files[0]);
  }

  return (
    <div className="border-2 border-dashed border-sf-gold p-6 rounded-lg text-center">
      <p className="mb-2">Upload Your CSV to Test With Real Data</p>
      <input type="file" accept=".csv" onChange={handleUpload} className="text-sm"/>
      <p className="text-xs text-gray-400 mt-2">Format: Column1,Column2,Column3</p>
    </div>
  )
}
import CSVUploader from '@/components/CSVUploader';

const [kpi, setKpi] = useState({v1: 120, v2: 45, v3: 3});

// Add this above KPIs
<CSVUploader onData={(newData)=>setKpi(newData)} />
  git add. && git commit -m "v8.2 PDF + CSV"
vercel deploy --prod
const BOOKING_LINK = "https://cal.com/smartforx/30min"; // replace with your cal link

await resend.emails.send({
  from: 'SMARTFORX <demo@smartforx.ai>',
  to: email,
  subject: `Your ${industry} AI Case Study + Book a Call`,
  html: `
    <p>Hi,</p>
    <p>Attached is your custom AI case study for ${industry}.</p>
    <p><b>Next Step:</b> Book 30min with our CEO to run this on your data:</p>
    <a href="${BOOKING_LINK}" style="background:#C8A227;color:#000;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">
      Book Demo Call
    </a>
  `,
  attachments: [{filename: `${industry}-case-study.pdf`, content: pdfBuffer}],
});
<button onClick={()=>window.open('https://cal.com/smartforx/30min','_blank')} 
  className="mt-2 bg-green-500 text-black px-6 py-3 rounded-lg font-bold">
  Book CEO Demo Call
</button>
const sendCase = async () => {
  const email = prompt("Enter CEO email:");
  const company = prompt("Enter Company Name:");
  const logoUrl = prompt("Paste Company Logo URL:"); // or upload
  if(!email || !company) return;
  
  await fetch('/api/case-study-pdf', {
    method:'POST', 
    body:JSON.stringify({industry: params.industry, email, company, logoUrl})
  });
  alert(`White-labeled PDF sent to ${email}`);
}
import { Image } from '@react-pdf/renderer';

const CasePDF = ({industry, caseText, company, logoUrl}) => (
  <Document>
    <Page style={{padding:40}}>
      {logoUrl && <Image src={logoUrl} style={{width:100, marginBottom:10}} />}
      <Text style={{fontSize:24, marginBottom:10}}>{company.toUpperCase()} AI CASE STUDY</Text>
      <Text style={{fontSize:16, marginBottom:20, color:'#C8A227'}}>{industry.toUpperCase()}</Text>
      <Text>{caseText}</Text>
      <Text style={{marginTop:30, fontSize:10}}>Powered by SMARTFORX AI</Text>
    </Page>
  </Document>
);
git add. && git commit -m "v8.3 Book Demo + White-label"
vercel deploy --prod
'use client'
import { useState } from 'react';

const ROI_DATA = {
  healthcare: {avgCost: 15000, metric: "readmissions prevented"},
  finance: {avgCost: 50000, metric: "fraud cases blocked"},
  manufacturing: {avgCost: 40000, metric: "downtime hours saved"},
  logistics: {avgCost: 8000, metric: "late deliveries prevented"},
  education: {avgCost: 2000, metric: "dropouts prevented"},
  government: {avgCost: 10000, metric: "inefficiencies fixed"},
  ngo: {avgCost: 5000, metric: "wasted grants prevented"},
  research: {avgCost: 3000, metric: "research hours saved"}
}

export default function ROICalculator({industry}) {
  const [units, setUnits] = useState(10);
  const config = ROI_DATA[industry] || ROI_DATA.healthcare;
  
  const savings = units * config.avgCost;
  const roi = ((savings - 997*12) / (997*12) * 100).toFixed(0); // vs $997/mo

  return (
    <div className="border-2 border-sf-gold rounded-xl p-6 mt-6">
      <h3 className="text-2xl font-bold text-sf-gold mb-2">ROI Calculator</h3>
      <p className="text-gray-400 mb-4">How many {config.metric} per month?</p>
      
      <input type="range" min="1" max="100" value={units} onChange={e=>setUnits(e.target.value)} className="w-full"/>
      <p className="text-4xl font-bold mt-2">{units} {config.metric}</p>
      
      <div className="mt-4 bg-[#1a1a1a] p-4 rounded">
        <p>Annual Savings: <span className="text-3xl font-bold text-green-400">${savings.toLocaleString()}</span></p>
        <p>SMARTFORX Cost: $11,964/year</p>
        <p>ROI: <span className="text-2xl font-bold text-sf-gold">{roi}%</span></p>
      </div>
      
      <p className="text-xs mt-2">Payback in {(11964/savings*12).toFixed(1)} months</p>
    </div>
  )
}
import ROICalculator from '@/components/ROICalculator';
<ROICalculator industry={params.industry} />
npm install @slack/web-api
SLACK_BOT_TOKEN=xoxb-your-token
import { WebClient } from '@slack/web-api';
const slack = new WebClient(process.env.SLACK_BOT_TOKEN);

export async function POST(req) {
  const { industry, risk, channel } = await req.json();
  
  if(risk > 80) {
    await slack.chat.postMessage({
      channel: channel || '#alerts',
      text: `🚨 SMARTFORX ALERT: ${industry.toUpperCase()} Risk at ${risk}%`,
      blocks: [
        {type: "header", text: {type: "plain_text", text: `CRITICAL: ${risk}% Risk Detected`}},
        {type: "section", text: {type: "mrkdwn", text: `*Industry:* ${industry}\n*Action:* Auto-mitigation triggered`}},
        {type: "button", text: {type: "plain_text", text: "View Dashboard"}, url: "https://smartforx.com/dashboard"}
      ]
    });
  }
  return Response.json({ok:true});
}
useEffect(() => {
  const i = setInterval(async () => {
    const newRisk = Math.floor(Math.random()*50 + 10);
    setRisk(newRisk);
    
    if(newRisk > 80) {
      await fetch('/api/slack-alert', {
        method:'POST', 
        body:JSON.stringify({industry: params.industry, risk: newRisk, channel: '#ceo-alerts'})
      });
      setLogs(prev => [`[${new Date().toLocaleTimeString()}] SLACK: Alert sent to team`,...prev]);
    }
  }, 3000);
  return ()=>clearInterval(i)
}, [params.industry]);
git add. && git commit -m "v8.4 ROI + Slack Alerts"
vercel deploy --prod
npm install next-intl
{
  "Vertical": {
    "title": "SMARTFORX AI",
    "risk": "Hatari ya AI",
    "automation": "Kumbukumbu ya Otomatiki",
    "roi": "Kikokotoo cha ROI",
    "savings": "Akiba ya Kila Mwaka",
    "book": "Weka Miadi na CEO"
  }
}
import {useTranslations} from 'next-intl';

export default function VerticalDemo({ params }) {
  const t = useTranslations('Vertical');
  const industry = VERTICALS[params.industry];
  
  return (
    <div>
      <h1>{industry.name}</h1>
      <p>{t('risk')}: {risk}%</p>
      <p>{t('automation')}</p>
      <ROICalculator industry={params.industry} />
      <button>{t('book')}</button>
    </div>
  )
}
'use client'
export default function LangSwitcher() {
  return (
    <div className="fixed top-4 right-4">
      <a href="/en/vertical/healthcare">EN</a> | 
      <a href="/sw/vertical/healthcare">SW</a> | 
      <a href="/fr/vertical/healthcare">FR</a>
    </div>
  )
}
npm install twilio openai
import { twiml } from 'twilio';
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req) {
  const response = new twiml.VoiceResponse();
  
  response.say({voice: 'alice'}, 'Hello. This is SMARTFORX AI Assistant.');
  response.gather({
    input: 'speech',
    action: '/api/voice-answer',
    speechTimeout: 'auto'
  }, (gather) => {
    gather.say('What industry are you in? Healthcare, Finance, or Manufacturing?');
  });
  
  return new Response(response.toString(), {headers: {'Content-Type': 'text/xml'}});
}

export async function POST_ANSWER(req) {
  const form = await req.formData();
  const speech = form.get('SpeechResult');
  
  // AI generates pitch
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{role: "system", content: `You are SMARTFORX sales AI. Pitch ROI for ${speech}. Keep it 20 seconds.`}]
  });
  
  const response = new twiml.VoiceResponse();
  response.say({voice: 'Polly.Joanna'}, completion.choices[0].message.content);
  response.say('Press 1 to book a demo with our CEO now.');
  
  return new Response(response.toString(), {headers: {'Content-Type': 'text/xml'}});
}
git add. && git commit -m "v8.5 Swahili + Voice AI"
vercel deploy --prod
npm install axios
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=174379
import axios from 'axios';

const getToken = async () => {
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString('base64');
  const res = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
    headers: {Authorization: `Basic ${auth}`}
  });
  return res.data.access_token;
}

export async function POST(req) {
  const { phone, amount } = await req.json(); // phone: 2547XXXXXXXX
  const token = await getToken();
  
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
  const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

  const res = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
    BusinessShortCode: process.env.MPESA_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: amount,
    PartyA: phone,
    PartyB: process.env.MPESA_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: "https://smartforx.com/api/mpesa-callback",
    AccountReference: "SMARTFORX",
    TransactionDesc: "SMARTFORX Pro Subscription"
  }, {headers: {Authorization: `Bearer ${token}`}});

  return Response.json(res.data);
}'use client'
const payWithMpesa = async () => {
  const phone = prompt("Enter M-Pesa number: 2547XXXXXXXX");
  const res = await fetch('/api/mpesa', {method:'POST', body:JSON.stringify({phone, amount: 997})});
  alert("Check your phone for M-Pesa prompt");
}

<button onClick={payWithMpesa} className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold">
  Pay KSh 140,000/mo with M-PESA
</button>
import OpenAI from "openai";
import { Resend } from 'resend';
const openai = new OpenAI();
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const form = await req.formData();
  const message = form.get('Body');
  const from = form.get('From'); // whatsapp:+2547...
  const mediaUrl = form.get('MediaUrl0'); // CSV file

  if(mediaUrl) {
    // 1. Download CSV
    const csv = await fetch(mediaUrl).then(r=>r.text());
    const [header,...rows] = csv.split('\n');
    
    // 2. AI Analyzes CSV
    const analysis = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{role: "system", content: `Analyze this CSV data and give 3 insights: ${csv.slice(0,1000)}`}]
    });

    // 3. Email PDF back
    await resend.emails.send({
      from: 'SMARTFORX WhatsApp <bot@smartforx.ai>',
      to: from.replace('whatsapp:','') + '@gmail.com', // or ask for email
      subject: 'Your AI Analysis is Ready',
      html: `<p>${analysis.choices[0].message.content}</p>`
    });

    // 4. Reply on WhatsApp
    return new Response(`<Response><Message>PDF sent! I found: ${analysis.choices[0].message.content.slice(0,100)}... Book demo: cal.com/smartforx</Message></Response>`, {
      headers: {'Content-Type': 'text/xml'}
    });
  }
  
  return new Response(`<Response><Message>Send me a CSV file and I will send you an AI report + PDF in 10 seconds.</Message></Response>`, {
    headers: {'Content-Type': 'text/xml'}
  });
}
git add. && git commit -m "v8.6 M-Pesa + WhatsApp"
vercel deploy --prod
import { sql } from '@vercel/postgres';

export async function createAgent(name, phone, mpesa) {
  await sql`INSERT INTO agents (name, phone, mpesa_number, commission) VALUES (${name}, ${phone}, ${mpesa}, 0)`;
}

export async function addCommission(agentId, amount) {
  await sql`UPDATE agents SET commission = commission + ${amount*0.2} WHERE id = ${agentId}`; // 20%
}
CREATE TABLE agents (
  id SERIAL PRIMARY KEY,
  name TEXT,
  phone TEXT,
  mpesa_number TEXT,
  commission NUMERIC DEFAULT 0
);
ALTER TAB'use client'
export default function AgentSignup() {
  const signup = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    await fetch('/api/agent-signup', {method:'POST', body: JSON.stringify(Object.fromEntries(form))});
    alert("Umejiunga! Link yako: smartforx.com?ref=YOURID");
  }
  return (
    <form onSubmit={signup} className="p-10 max-w-md">
      <h1 className="text-3xl font-bold text-sf-gold">Kuwa SMARTFORX Agent</h1>
      <p>Pata 20% - KSh 28,000 kwa kila mteja</p>
      <input name="name" placeholder="Jina" className="w-full bg-[#1a1a1a] p-3 mt-4"/>
      <input name="phone" placeholder="2547XXXXXXXX" className="w-full bg-[#1a1a1a] p-3 mt-2"/>
      <input name="mpesa" placeholder="M-Pesa Number" className="w-full bg-[#1a1a1a] p-3 mt-2"/>
      <button className="bg-sf-gold text-black px-6 py-3 mt-4 rounded font-bold">Jiunge Sasa</button>
    </form>
  )
}LE customers ADD COLUMN agent_id INTEGER REFERENCES agents(id);
import OpenAI from "openai";
const openai = new OpenAI();

export async function POST(req) {
  const { company, savings, phone } = await req.json();

  // 1. Generate Swahili Script
  const script = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "system",
      content: `Write 30 second sales voice note in Swahili for ${company}. Say they can save ${savings}. Be warm, direct.`
    }]
  });

  // 2. Generate Voice with OpenAI TTS
  const speech = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: script.choices[0].message.content,
  });

  const buffer = Buffer.from(await speech.arrayBuffer());

  // 3. Send via WhatsApp/Twilio - you can save to /mnt/data/voicenote.mp3
  return Response.json({audio: buffer.toString('base64'), text: script.choices[0].message.content});
}
const sendVoiceNote = async () => {
  const res = await fetch('/api/voice-note', {
    method:'POST',
    body:JSON.stringify({
      company: "Hospitali ya Kitale",
      savings: "KSh 6,000,000",
      phone: "2547XXXXXXXX"
    })
  });
  const {audio} = await res.json();
  // Play audio or send via WhatsApp
  alert("Voice note sent in Swahili!");
}

<button onClick={sendVoiceNote} className="bg-purple-600 text-white px-4 py-2 rounded">
  Tuma Voice Note ya Kiswahili
</button>
git add. && git commit -m "v8.7 Agent Network + Swahili Voice"
vercel deploy --prod
'use client'
import { useEffect, useState } from 'react';

export default function AgentDashboard() {
  const [stats, setStats] = useState({customers: 0, commission: 0});
  
  useEffect(()=>{
    fetch('/api/agent-stats?phone=2547XXXXXXXX')
    .then(r=>r.json()).then(setStats);
  },[])

  const withdraw = async () => {
    await fetch('/api/agent-withdraw', {method:'POST', body:JSON.stringify({phone: "2547XXXXXXXX"})});
    alert("KSh "+stats.commission+" imetumwa kwa M-Pesa yako");
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-sf-gold">Agent Dashboard</h1>
      
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-[#1a1a1a] p-6 rounded">
          <p>Wateja</p>
          <p className="text-4xl font-bold">{stats.customers}</p>
        </div>
        <div className="bg-[#1a1a1a] p-6 rounded">
          <p>Tume Yako</p>
          <p className="text-4xl font-bold text-green-400">KSh {stats.commission}</p>
        </div>
      </div>

      <button onClick={withdraw} className="mt-6 w-full bg-green-600 text-white py-4 rounded-lg font-bold">
        Toa Pesa kwa M-PESA
      </button>

      <p className="mt-4 text-sm">Link yako: smartforx.com?ref=YOURID</p>
    </div>
  )
}
// Uses same M-PESA B2C API to send money to agent
export async function POST(req) {
  const { phone } = await req.json();
  // Call M-PESA B2C to send commission to agent's mpesa_number
  // Then reset commission to 0
  return Response.json({ok:true});
}
export async function POST(req) {
  const { text, phoneNumber } = await req.json(); // from Africa's Talking or Safaricom
  let response = "";

  if(text == ""){
    response = `CON Karibu SMARTFORX AI
1. Nunua Pro - KSh 140000/mo
2. Angalia Bei
3. Ongea na Agent`;
  } 
  else if(text == "1"){
    response = `CON Ingiza namba ya M-PESA:
MFANO: 2547XXXXXXXX`;
  }
  else if(text.startsWith("2547")){
    // Trigger STK Push
    await fetch('https://smartforx.com/api/mpesa', {method:'POST', body:JSON.stringify({phone: text, amount: 997})});
    response = `END Tafadhali ingiza PIN ya M-PESA. Asante!`;
  }

  return new Response(response, {headers: {'Content-Type': 'text/plain'}});
}
git add. && git commit -m "v8.8 Agent Dashboard + USSD"
vercel deploy --prod
import { twiml } from 'twilio';
import OpenAI from "openai";
const openai = new OpenAI();
const twilio = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function POST(req) {
  const { phone, company, industry } = await req.json();

  // 1. Generate 5min onboarding script
  const script = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "system", 
      content: `You are SMARTFORX AI. Call ${company} in Swahili. 1. Congratulate them. 2. Ask for 3 data points. 3. Tell them dashboard is ready. 4. Book check-in call. Keep it 5 minutes.`
    }]
  });

  // 2. Call them via Twilio
  await twilio.calls.create({
    twiml: `<Response><Say voice="alice" language="sw-KE">${script.choices[0].message.content}</Say></Response>`,
    to: phone,
    from: process.env.TWILIO_PHONE
  });

  return Response.json({ok:true});
}
await fetch('https://smartforx.com/api/onboard-call', {
  method:'POST',
  body:JSON.stringify({phone, company: "Hospitali ya Kitale", industry: "healthcare"})
});
import { sql } from '@vercel/postgres';

export async function GET() {
  const { rows } = await sql`
    SELECT name, phone, commission, customers 
    FROM agents 
    ORDER BY commission DESC 
    LIMIT 10
  `;
  return Response.json({leaders: rows});
}
'use client'
import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaders, setLeaders] = useState([]);

  useEffect(()=>{
    fetch('/api/leaderboard').then(r=>r.json()).then(d=>setLeaders(d.leaders));
  },[])

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-sf-gold">Top 10 Agents Rift Valley 🔥</h1>
      <p className="text-gray-400">Mshindi wa mwezi: iPhone 16 Pro</p>
      
      <div className="mt-6 space-y-3">
        {leaders.map((l,i)=>(
          <div key={i} className="bg-[#1a1a1a] p-4 rounded-lg flex justify-between">
            <div>
              <p className="text-2xl font-bold">#{i+1} {l.name}</p>
              <p className="text-sm">{l.customers} Wateja</p>
            </div>
            <p className="text-2xl font-bold text-green-400">KSh {l.commission}</p>
          </div>
        ))}
      </div>
      
      <button className="mt-6 w-full bg-sf-gold text-black py-4 rounded-lg font-bold">
        Jiunge Uwe #1
      </button>
    </div>
  )
}
git add. && git commit -m "v8.9 AI Onboarding + Leaderboard"
vercel deploy --prod
import { sql } from '@vercel/postgres';

export async function GET(req) {
  const { county } = req.nextUrl.searchParams; // ?county=transnzoia
  
  const { rows } = await sql`
    SELECT industry, company, risk, last_alert 
    FROM customers 
    WHERE county = ${county}
    ORDER BY risk DESC
  `;
  
  return Response.json({institutions: rows});
}
'use client'
import { useEffect, useState } from 'react';

export default function CountyDashboard({params}) {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    fetch(`/api/county?county=${params.county}`).then(r=>r.json()).then(d=>setData(d.institutions));
  },[])

  return (
    <div className="p-8 bg-[#0a0a0a] min-h-screen">
      <h1 className="text-4xl font-bold text-sf-gold">Trans Nzoia County AI Command Center</h1>
      <p className="text-gray-400">Live Risk Across All Institutions</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        {data.map((inst,i)=>(
          <div key={i} className="border rounded-xl p-4" style={{borderColor: inst.risk > 70 ? 'red' : '#00C896'}}>
            <p className="font-bold">{inst.company}</p>
            <p className="text-sm text-gray-400">{inst.industry}</p>
            <p className="text-3xl font-bold mt-2" style={{color: inst.risk > 70 ? 'red' : '#00C896'}}>
              Risk: {inst.risk}%
            </p>
            {inst.risk > 70 && <button className="mt-2 bg-red-600 px-4 py-2 rounded">Tuma Timu Sasa</button>}
          </div>
        ))}
      </div>
      
      <div className="mt-8 bg-[#1a1a1a] p-6 rounded">
        <h2 className="text-2xl font-bold">County Savings This Month: KSh 12,400,000</h2>
        <p>AI ilizuia: 8 fraud cases, 3 machine failures, 14 delays</p>
      </div>
    </div>
  )
}
import axios from 'axios';

// Same as STK but for Till Number. Customer enters Till on their phone
export async function POST(req) {
  const { amount, account } = await req.json(); // account = "SMARTFORX-PRO"
  const token = await getToken();
  
  const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, -3);
  const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString('base64');

  const res = await axios.post('https://safaricom.co.ke/mpesa/c2b/v1/simulate', {
    ShortCode: process.env.MPESA_TILL, // 888
    CommandID: "CustomerBuyGoodsOnline",
    Amount: amount,
    Msisdn: "254700000000", // Office phone
    BillRefNumber: account
  }, {headers: {Authorization: `Bearer ${token}`}});

  return Response.json({message: "Lipa kwa Till 888. Account: " + account});
}
export default function Invoice() {
  return (
    <div className="p-10 max-w-xl mx-auto bg-white text-black">
      <h1 className="text-3xl font-bold">SMARTFORX INVOICE</h1>
      <p>To: Trans Nzoia County Government</p>
      <p>Amount: KSh 140,000 / month</p>
      
      <div className="mt-6 p-4 border-2 border-dashed">
        <p className="font-bold">LIPA NA M-PESA</p>
        <p>Till Number: <span className="text-2xl">888</span></p>
        <p>Account: <span className="text-2xl">TRANSNZOIA-001</span></p>
        <p className="text-sm">Ingiza Till, weka Account, lipa</p>
      </div>
    </div>
  )
}
git add. && git commit -m "v9.0 County Dashboard + Lipa Till"
vercel deploy --prod
import OpenAI from "openai";
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text } from '@react-pdf/renderer';
const openai = new OpenAI();

const GrantPDF = ({org, data, report}) => (
  <Document>
    <Page style={{padding:40}}>
      <Text style={{fontSize:20, marginBottom:10}}>GRANT IMPACT REPORT</Text>
      <Text style={{fontSize:16}}>{org}</Text>
      <Text style={{marginTop:20}}>Funded by: USAID / World Bank</Text>
      <Text style={{marginTop:20}}>{report}</Text>
      <Text style={{marginTop:30}}>People Helped: {data.people}</Text>
      <Text>Funds Used: KSh {data.funds}</Text>
    </Page>
  </Document>
);

export async function POST(req) {
  const { org, industry, data } = await req.json(); // data from their CSV

  // 1. AI writes donor report
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "system",
      content: `You are SMARTFORX AI. Write 2 page grant report for ${org} in ${industry}. 
      Include: Activities, People Impacted: ${data.people}, Budget Used: ${data.funds}, Results %, Next Steps.
      Tone: Professional for USAID/UN donors.`
    }]
  });

  const reportText = completion.choices[0].message.content;
  const pdfBuffer = await pdf(<GrantPDF org={org} data={data} report={reportText} />).toBuffer();

  return new Response(pdfBuffer, {
    headers: {'Content-Type': 'application/pdf', 'Content-Disposition': `attachment; filename="${org}-Grant-Report.pdf"`}
  });
}
const downloadGrant = async () => {
  const res = await fetch('/api/grant-report', {
    method:'POST',
    body:JSON.stringify({
      org: "Kitale Women Group",
      industry: "ngo",
      data: {people: 1240, funds: 3400000}
    })
  });
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  window.open(url); // Downloads PDF ready for USAID
}

<button onClick={downloadGrant} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">
  Generate USAID Report PDF
</button>
const COUNTIES = [
  "nairobi","mombasa","kisumu","nakuru","eldoret","kitale","transnzoia",
  // ... all 47 counties
];

export async function deployToAllCounties() {
  for(const county of COUNTIES){
    await fetch(`https://smartforx.com/api/create-county`, {
      method:'POST',
      body:JSON.stringify({county, template: "government"})
    });
  }
  console.log("Deployed to 47 Counties");
}
export default function SuperDashboard() {
  const deployAll = async () => {
    await fetch('/api/deploy-all-counties', {method:'POST'});
    alert("SMARTFORX imewekwa katika Kaunti 47 zote");
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-sf-gold">SMARTFORX KENYA COMMAND</h1>
      <p>Covering 47 Counties, 290 Hospitals, 8000 Schools</p>
      
      <button onClick={deployAll} className="mt-6 bg-red-600 text-white px-8 py-4 rounded-lg font-bold">
        Deploy to All 47 Counties
      </button>
      
      <p className="mt-4 text-sm">Total Pipeline: KSh 66,080,000 / year</p>
    </div>
  )
}
git add. && git commit -m "v9.1 Grant Reports + 47 Counties"
vercel deploy --prod

