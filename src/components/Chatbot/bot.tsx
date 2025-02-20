'use client';

import React, { useState } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChatBox = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === '') return;

    setInput('');
    const userMessage = { name: 'User', message: input };
    setMessages([...messages, userMessage] as any);

    try {
      const response = await fetch('https://techtrix-chatbot-2-0-2zmf.onrender.com/chat', {
        method: 'POST',
        body: JSON.stringify({ message: input }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      const botMessage = { name: 'TechFest Bot', message: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage] as any);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { name: 'TechFest Bot', message: 'Sorry, there was an error processing your request.' },
      ] as any);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
          <div className="bg-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h4 className="text-lg">Chat Support</h4>
            <button onClick={toggleChatBox} className="text-white">
              Close
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto text-black">
            {
              messages.map((msg: any, index) => (
                <div
                  key={index}
                  className={`mb-2 p-2 rounded ${msg.name === 'TechFest Bot' ? 'bg-purple-100 text-purple-800' : 'bg-gray-200'
                    }`}
                >
                  <strong>{msg.name}:</strong> {msg.message}
                </div>
              ))
            }
          </div>
          <div className="p-4 bg-gray-100 rounded-b-lg flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Write a message..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none text-black"
            />
            <button
              onClick={handleSend}
              className="bg-purple-600 text-white p-2 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChatBox}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg"
        >
          Chat
        </button>
      )}
    </div>
  );
};

export default ChatBot;
