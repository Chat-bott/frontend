import React, { useState, useRef, useEffect } from 'react';
import { sendMessageWithActions } from '../services/apiService';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hello! I'm your co-browsing assistant. I can help you explore this portfolio website, answer questions, navigate to sections, highlight elements, and more. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    try {
      const response = await sendMessageWithActions(userMessage, messages);
      
      setMessages([...newMessages, { role: 'assistant', content: response.text }]);
    } catch (error) {
      console.error('Chatbot Error:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: error.message || 'Sorry, I encountered an error. Please check the browser console for details.'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="fixed bottom-5 right-5 w-15 h-15 rounded-full bg-blue-600 text-white text-2xl border-none shadow-lg z-[1001] transition-all hover:bg-blue-700 hover:scale-110 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chatbot"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-5 w-96 max-w-[calc(100vw-2.5rem)] h-[600px] max-h-[calc(100vh-7.5rem)] bg-white rounded-xl shadow-2xl flex flex-col z-[1000] overflow-hidden">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold m-0">AI Co-Browsing Assistant</h3>
            <button
              className="bg-transparent border-none text-white text-xl cursor-pointer p-0 w-6 h-6 flex items-center justify-center rounded hover:bg-white/20 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex max-w-[80%] animate-fadeIn ${
                  message.role === 'user' ? 'self-end' : 'self-start'
                }`}
              >
                <div
                  className={`px-4 py-3 rounded-xl leading-relaxed break-words ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex max-w-[80%] self-start animate-fadeIn">
                <div className="px-4 py-3 bg-gray-100 text-gray-800 rounded-xl rounded-bl-sm">
                  <span className="flex gap-1 py-2">
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-typing"></span>
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-typing" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-typing" style={{ animationDelay: '0.4s' }}></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form className="flex p-4 border-t border-gray-200 gap-2" onSubmit={handleSend}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything or request an action..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-blue-600 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isLoading || !inputValue.trim()}
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default Chatbot;
