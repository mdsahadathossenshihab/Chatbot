import React, { useState, useRef, useEffect } from 'react';
import './ChatApp.css';

const ChatApp = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'নমস্কার! আমি একটা এআই সহায়ক। আপনি আমাকে যেকোনো প্রশ্ন করতে পারেন। 😊', sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const messagesEndRef = useRef(null);

  // মেসেজের শেষে স্ক্রল করা
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // OpenAI API এ মেসেজ পাঠানো
  const sendMessageToOpenAI = async (userMessage) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 500
        })
      });

      if (!response.ok) {
        throw new Error('API Error: ' + response.statusText);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error:', error);
      return 'দুঃখিত, একটা সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।';
    }
  };

  // মেসেজ পাঠানো
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    if (!apiKey && showApiInput) {
      alert('প্রথমে আপনার OpenAI API key দিয়ে সেট আপ করুন।');
      return;
    }

    // ইউজার মেসেজ যোগ করা
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };

    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    // বট রেসপন্স পাওয়া
    const botResponse = await sendMessageToOpenAI(input);

    const botMessage = {
      id: messages.length + 2,
      text: botResponse,
      sender: 'bot'
    };

    setMessages(prev => [...prev, botMessage]);
    setLoading(false);
  };

  // API key সেট করা
  const handleSetApiKey = () => {
    if (apiKey.trim()) {
      setShowApiInput(false);
    } else {
      alert('দয়া করে একটা বৈধ API key দিন।');
    }
  };

  return (
    <div className="chat-container">
      {/* হেডার */}
      <div className="chat-header">
        <h1>🤖 এআই চ্যাটবট</h1>
        {!showApiInput && (
          <button 
            className="reset-btn" 
            onClick={() => setShowApiInput(true)}
          >
            পরিবর্তন করুন
          </button>
        )}
      </div>

      {/* API কী ইনপুট */}
      {showApiInput && (
        <div className="api-setup">
          <div className="api-form">
            <label>OpenAI API Key:</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              onKeyPress={(e) => e.key === 'Enter' && handleSetApiKey()}
            />
            <button onClick={handleSetApiKey}>সংযোগ করুন</button>
            <small>
              আপনার API key পান: <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer">OpenAI</a>
            </small>
          </div>
        </div>
      )}

      {/* চ্যাট বডি */}
      {!showApiInput && (
        <>
          <div className="messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`message message-${msg.sender}`}>
                <div className="message-content">
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="message message-bot">
                <div className="message-content loading">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* ইনপুট ফর্ম */}
          <form className="message-form" onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="আপনার মেসেজ লিখুন..."
              disabled={loading}
            />
            <button type="submit" disabled={loading}>
              {loading ? '⏳' : '📤'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default ChatApp;