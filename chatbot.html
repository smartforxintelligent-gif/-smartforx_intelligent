<script src="chatbot.js"></script>
</body>
</html>
// SMARTFORX INTELLIGENT - chatbot.js
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
    for(let key in knowledgeBase) {
      if(msg.includes(key)) return knowledgeBase[key];
    }
    return knowledgeBase['default'];
  }

  chatForm.onsubmit = (e) => {
    e.preventDefault();
    const userMsg = chatInput.value.trim();
    if(!userMsg) return;

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
