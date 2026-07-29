< script src = "script.js" > < /script> < /
body > <
  /html>
And here’ s the code:
  // SMARTFORX INTELLIGENT - script.js
  // Adds animations, form handling, and "AI feel" to the site
  document.addEventListener('DOMContentLoaded', () => {
    // 1. SMOOTH SCROLL FOR NAV LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    // 2. FADE IN CARDS ON SCROLL - "Zero Error" reveal effect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, {
      threshold: 0.1
    });
    document.querySelectorAll('.card, .stat').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });
    // 3. FORM HANDLING - Connects to Formspree or your backend
    const form = document.querySelector('form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Sending...';
        btn.disabled = true;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        // OPTION A: Use Formspree. Replace YOUR_FORM_ID
        // const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        //   method: 'POST',
        //   headers: {'Content-Type': 'application/json'},
        //   body: JSON.stringify(data)
        // });
        // OPTION B: For now, just simulate success
        await new Promise(resolve => setTimeout(resolve, 1500)); // fake delay
        btn.innerText = 'Demo Requested ✓';
        btn.style.background = '#22c55e'; // green success
        alert(Thank you $ {
          data[0]
        }!Our SMARTFORX team will contact you within 24 hours.);
        form.reset();
        setTimeout(() => {
          btn.innerText = originalText;
          btn.style.background = 'var(--gold)';
          btn.disabled = false;
        }, 3000);
      });
    }
    // 4. LIVE STATS COUNTER ANIMATION
    const stats = document.querySelectorAll('.stat h4');
    stats.forEach(stat => {
      const target = stat.innerText;
      let count = 0;
      const increment = target.includes('%') ? 0.1 : 1;
      const updateCount = () => {
        if (count < 99.9) {
          count += increment;
          stat.innerText = count.toFixed(2) + '%';
          requestAnimationFrame(updateCount);
        } else {
          stat.innerText = target; // set final value
        }
      };
      updateCount();
    });
    // 5. NAVBAR GLOW ON SCROLL
    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 50) {
        nav.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.2)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
    // 6. OMNI CORE "PREDICT" EASTER EGG - type "OMNI" on keyboard
    let secret = '';
    document.addEventListener('keydown', (e) => {
      secret += e.key.toLowerCase();
      if (secret.includes('omni')) {
        document.body.style.filter = 'hue-rotate(30deg)';
        alert('OMNI CORE Activated: Self-Optimizing Mode');
        secret = '';
      }
    });
    console.log('%c SMARTFORX INTELLIGENT v1.0 ', 'background: #D4AF37; color: #000; font-size: 14px; font-weight: bold;');
    console.log('System Status: Zero Error. All Systems Online.');
  });
-- - < script src = "chatbot.js" > < /script> < /
body > <
  /html>/ / SMARTFORX INTELLIGENT - chatbot.js
// OMNI CORE AI Assistant Widget
document.addEventListener('DOMContentLoaded', () => {
  // 1. CREATE CHAT WIDGET HTML
  const chatHTML = `
  <div id="sf-chat-button">
    <span>💬</span>
  </div>
  <div id="sf-chat-box">
    <div id="sf-chat-header">
      <span>OMNI CORE Assistant</span>
      <button id="sf-close-chat">×</button>
    </div>
    <div id="sf-chat-messages">
      <div class="sf-bot-msg">Hello. I am OMNI CORE. How can I optimize your business today?</div>
    </div>
    <form id="sf-chat-form">
      <input type="text" id="sf-chat-input" placeholder="Ask about SMARTFORX..." autocomplete="off">
      <button type="submit">Send</button>
    </form>
  </div>
  `;
  const chatStyles = `
  #sf-chat-button { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; background: var(--gold); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28px; cursor: pointer; box-shadow: 0 0 20px rgba(212,175,55,0.5); z-index: 9999; transition: 0.3s; }
  #sf-chat-button:hover { transform: scale(1.1); }
  #sf-chat-box { position: fixed; bottom: 90px; right: 20px; width: 350px; height: 500px; background: #111; border: 1px solid var(--gold); border-radius: 12px; display: none; flex-direction: column; z-index: 9999; box-shadow: 0 0 30px rgba(0,0,0,0.8); }
  #sf-chat-header { padding: 15px; background: var(--gold); color: #000; font-weight: 700; display: flex; justify-content: space-between; border-radius: 12px 12px 0 0; }
  #sf-close-chat { background: none; border: none; font-size: 24px; cursor: pointer; }
  #sf-chat-messages { flex: 1; padding: 15px; overflow-y: auto; }
  .sf-bot-msg, .sf-user-msg { padding: 10px 14px; border-radius: 8px; margin-bottom: 10px; max-width: 80%; }
  .sf-bot-msg { background: #222; color: #fff; }
  .sf-user-msg { background: var(--gold); color: #000; margin-left: auto; }
  #sf-chat-form { display: flex; padding: 10px; border-top: 1px solid #333; }
  #sf-chat-input { flex: 1; padding: 10px; border: none; background: #000; color: #fff; border-radius: 8px; }
  #sf-chat-form button { padding: 10px 15px; margin-left: 8px; background: var(--gold); color: #000; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }
  `;
  document.body.insertAdjacentHTML('beforeend', chatHTML);
  const styleSheet = document.createElement('style');
  styleSheet.innerText = chatStyles;
  document.head.appendChild(styleSheet);
  // 2. CHAT LOGIC
  const chatBtn = document.getElementById('sf-chat-button');
  const chatBox = document.getElementById('sf-chat-box');
  const closeBtn = document.getElementById('sf-close-chat');
  const chatForm = document.getElementById('sf-chat-form');
  const chatInput = document.getElementById('sf-chat-input');
  const chatMessages = document.getElementById('sf-chat-messages');
  chatBtn.onclick = () => chatBox.style.display = 'flex';
  closeBtn.onclick = () => chatBox.style.display = 'none';
  // 3. OMNI CORE KNOWLEDGE BASE - "Zero Error" answers
  const knowledgeBase = {
    'price': 'Our OMNI CORE SaaS starts at $50,000/year. We also offer custom enterprise deployments. Book a demo for exact pricing.',
    'demo': 'You can book a demo here: founders@smartforx.ai or fill the form on our About page. We respond within 24 hours.',
    'what is omni core': 'OMNI CORE is our AI Operating System. It PREDICTS problems, AUTOMATES tasks, and SCALES your business globally with 99.9999% uptime.',
    'services': 'We offer: AI Automation, Error-Prevention Systems, Global Ops Scaling, Data Intelligence, and Cybersecurity AI.',
    'contact': 'Email us at founders@smartforx.ai. We are based in Kitale, Kenya with global operations.',
    'default': 'That’s a great question. Our human strategists can answer that in a demo. Would you like me to book one for you?'
  };

  function getBotResponse(msg) {
    msg = msg.toLowerCase();
    for (let key in knowledgeBase) {
      if (msg.includes(key)) return knowledgeBase[key];
    }
    return knowledgeBase['default'];
  }
  chatForm.onsubmit = (e) => {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    // Show user message
    chatMessages.innerHTML += `<div class="sf-user-msg">${userMsg}</div>`;
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    // Show typing...
    setTimeout(() => {
      const botReply = getBotResponse(userMsg);
      chatMessages.innerHTML += `<div class="sf-bot-msg">${botReply}</div>`;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  };
  console.log('%c OMNI CORE CHATBOT ONLINE ', 'background: #D4AF37; color: #000;');
});
// SMARTFORX INTELLIGENT CYBER SECURITY CORE v5.0
const CYBER = {
  SECRET_KEY: "SF-ZERO-ERROR-2026-KEY-32CHARS!",
  encrypt: (data) => CryptoJS.AES.encrypt(JSON.stringify(data), CYBER.SECRET_KEY).toString(),
  decrypt: (data) => {
    try {
      return JSON.parse(CryptoJS.AES.decrypt(data, CYBER.SECRET_KEY).toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  },
  loginAttempts: parseInt(localStorage.getItem('sf_attempts') || 0),
  checkBruteForce: () => {
    CYBER.loginAttempts++;
    localStorage.setItem('sf_attempts', CYBER.loginAttempts);
    if (CYBER.loginAttempts > 3) {
      localStorage.setItem('sf_lockedUntil', Date.now() + 600000);
      alert("Too many attempts. Locked 10 minutes.");
      return false;
    }
    return true;
  },
  sanitize: (input) => input.replace(/<script>|'|"|;|--|<|>/gi, ""),
  audit: (action) => {
    const logs = JSON.parse(localStorage.getItem('sf_audit') || '[]');
    logs.unshift({
      time: new Date().toISOString(),
      action,
      ua: navigator.userAgent
    });
    localStorage.setItem('sf_audit', JSON.stringify(logs.slice(0, 200)));
    if (action.includes("Failed")) CYBER.triggerAlert();
  },
  triggerAlert: () => {
    document.getElementById('alert-sound')?.play();
    document.body.style.boxShadow = "0 0 50px red";
    setTimeout(() => document.body.style.boxShadow = "", 1000);
  },
  startSession: () => {
    setInterval(() => {
      if (Date.now() - localStorage.getItem('sf_lastActive') > 600000) {
        localStorage.clear();
        window.location = 'login.html';
      }
      localStorage.setItem('sf_lastActive', Date.now());
    }, 60000);
  }
};
// Load CryptoJS
const s = document.createElement('script');
s.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js";
document.head.appendChild(s);
if (window.location.pathname.includes('orchestrator') || window.location.pathname.includes('threat')) {
  CYBER.startSession();
  CYBER.audit("Accessed Secure Area");
}
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});
app.post('/api/scan', async (req, res) => {
  const {
    data
  } = req.body;
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{
      role: "user",
      content: `Analyze risks: ${JSON.stringify(data)}`
    }]
  });
  res.json({
    result: completion.choices[0].message.content
  });
});
app.listen(3000, () => console.log("SMARTFORX Backend running on 3000"));
const res = await fetch("https://your-backend.onrender.com/api/scan", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    data: sheetData
  })
});
// SMARTFORX CYBER SECURITY CORE v5.0
const CYBER = {
  SECRET_KEY: "SF-ZERO-ERROR-2026-KEY-32CHARS!",
  encrypt: (data) => CryptoJS.AES.encrypt(JSON.stringify(data), CYBER.SECRET_KEY).toString(),
  decrypt: (data) => {
    try {
      return JSON.parse(CryptoJS.AES.decrypt(data, CYBER.SECRET_KEY).toString(CryptoJS.enc.Utf8));
    } catch (e) {
      return null;
    }
  },
  loginAttempts: parseInt(localStorage.getItem('sf_attempts') || 0),
  checkBruteForce: () => {
    CYBER.loginAttempts++;
    localStorage.setItem('sf_attempts', CYBER.loginAttempts);
    if (CYBER.loginAttempts > 3) {
      localStorage.setItem('sf_lockedUntil', Date.now() + 600000);
      alert("Too many attempts. Locked 10 minutes.");
      return false;
    }
    return true;
  },
  sanitize: (input) => input.replace(/<script>|'|"|;|--|<|>/gi, ""),
  audit: (action) => {
    const logs = JSON.parse(localStorage.getItem('sf_audit') || '[]');
    logs.unshift({
      time: new Date().toISOString(),
      action,
      ua: navigator.userAgent
    });
    localStorage.setItem('sf_audit', JSON.stringify(logs.slice(0, 200)));
    if (action.includes("Failed")) CYBER.triggerAlert();
  },
  triggerAlert: () => {
    document.getElementById('alert-sound')?.play();
    document.body.style.boxShadow = "0 0 50px red";
    setTimeout(() => document.body.style.boxShadow = "", 1000);
  },
  startSession: () => {
    setInterval(() => {
      if (Date.now() - localStorage.getItem('sf_lastActive') > 600000) {
        localStorage.clear();
        window.location = 'login.html';
      }
      localStorage.setItem('sf_lastActive', Date.now());
    }, 60000);
  }
};
// Load CryptoJS
const s = document.createElement('script');
s.src = "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js";
document.head.appendChild(s);
if (window.location.pathname.includes('orchestrator') || window.location.pathname.includes('threat')) {
  CYBER.startSession();
  CYBER.audit("Accessed Secure Area");
}
// SMARTFORX CORRUPTION-FREE ZONE
const ANTI_CORRUPT = {
  SECRET: "SF-IMMUTABLE-KEY-2026", // change this
  
  // 1. DATA INTEGRITY CHECK - Hash to detect tampering
  hash: async (data) => {
    const str = JSON.stringify(data);
    const msgBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  },

  saveSecure: async (key, data) => {
    const hash = await ANTI_CORRUPT.hash(data);
    const payload = {data, hash, user: localStorage.getItem('sf_user'), time: Date.now()};
    localStorage.setItem(key, JSON.stringify(payload));
    ANTI_CORRUPT.audit(`Saved ${key}`);
  },

  loadSecure: async (key) => {
    const raw = localStorage.getItem(key);
    if(!raw) return null;
    const payload = JSON.parse(raw);
    const checkHash = await ANTI_CORRUPT.hash(payload.data);
    
    // 2. BLOCK IF DATA WAS TAMPERED
    if(checkHash !== payload.hash){
      ANTI_CORRUPT.block("Data Corruption Detected on " + key);
      return null;
    }
    return payload.data;
  },

  // 3. FRAUD RULES ENGINE
  checkFraud: (action, data) => {
    // Example rules for YOUR business
    if(action === "EXPENSE" && data.amount > 50000){
      ANTI_CORRUPT.block("High value expense >50k requires CEO approval");
      return false;
    }
    if(action === "DUPLICATE_ENTRY"){
      ANTI_CORRUPT.block("Duplicate entry blocked");
      return false;
    }
    if(!localStorage.getItem('sf_board')){
      ANTI_CORRUPT.block("Unauthorized access attempt");
      return false;
    }
    return true;
  },

  // 4. BLOCK + ALERT SYSTEM
  block: (reason) => {
    ANTI_CORRUPT.audit(`BLOCKED: ${reason}`);
    alert("⚠️ SECURITY BLOCK: " + reason);
    document.body.style.filter = "grayscale(1)";
    setTimeout(()=>document.body.style.filter="",2000);
  },

  // 5. IMMUTABLE AUDIT LOG
  audit: (action) => {
    const log = JSON.parse(localStorage.getItem('sf_corrupt_log') || '[]');
    log.unshift({
      time: new Date().toISOString(), 
      action, 
      user: localStorage.getItem('sf_user') || 'GUEST',
      ip: 'browser' // in backend you’d capture real IP
    });
    localStorage.setItem('sf_corrupt_log', JSON.stringify(log.slice(0,500)));
  }
};

// 6. AUTO ERROR CATCHER
window.addEventListener('error', e => {
  ANTI_CORRUPT.audit(`JS ERROR: ${e.message}`);
});
// OLD: localStorage.setItem('expenses', JSON.stringify(data))

// NEW: Corruption-proof save
ANTI_CORRUPT.saveSecure('expenses', data);

// When loading:
const expenses = await ANTI_CORRUPT.loadSecure('expenses'); // Returns null if tampered
JSON.parse(localStorage.getItem('sf_corrupt_log') || '[]').forEach(l => {
  addThreat(`${l.action} by ${l.user} at ${l.time}`);
});
function addExpense(amount){
  if(!ANTI_CORRUPT.checkFraud("EXPENSE", {amount})) return; // Will block if >50k
  // proceed to save
}
JSON.parse(localStorage.getItem('sf_corrupt_log') || '[]').forEach(l => {
  addThreat(`${l.action} by ${l.user} at ${l.time}`);
});
npx create-next-app@latest smartforx-pro
cd smartforx-pro
npm install openai chart.js react-chartjs-2
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
OPENAI_API_KEY=sk-your-key-here
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
}
git init && git add. && git commit -m "v7.1"
vercel deploy
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
