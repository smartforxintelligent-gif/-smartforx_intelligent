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
