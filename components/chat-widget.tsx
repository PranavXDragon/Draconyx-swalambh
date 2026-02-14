'use client';

import { useState } from 'react';
import { MessageCircle, X, Send, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Array<{ text: string; sender: 'user' | 'bot'; time: string }>>([
    {
      text: 'Hi! Welcome to Spedly. How can we help you today?',
      sender: 'bot',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      sender: 'user' as const,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Auto-reply simulation
    setTimeout(() => {
      const autoReply = {
        text: "Thanks for your message! Our team will get back to you shortly. For immediate assistance, please call +91 1800-SPEDLY or email support@spedly.com",
        sender: 'bot' as const,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg hover:bg-orange-600 transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold animate-pulse">
            1
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 md:bottom-6 md:right-6 z-50 w-full h-[100vh] md:h-auto md:w-96 md:rounded-2xl border-t md:border border-slate-200 bg-white shadow-2xl overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Spedly Support</h3>
                <div className="flex items-center space-x-1 text-xs text-orange-100">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-50 p-3 border-b border-slate-200">
            <div className="grid grid-cols-3 gap-2">
              <button className="flex flex-col items-center justify-center p-3 bg-white rounded-lg hover:bg-orange-50 transition group">
                <Phone className="h-5 w-5 text-orange-600 mb-1 group-hover:scale-110 transition" />
                <span className="text-xs text-slate-600 font-medium">Call Us</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-white rounded-lg hover:bg-orange-50 transition group">
                <Mail className="h-5 w-5 text-orange-600 mb-1 group-hover:scale-110 transition" />
                <span className="text-xs text-slate-600 font-medium">Email</span>
              </button>
              <button className="flex flex-col items-center justify-center p-3 bg-white rounded-lg hover:bg-orange-50 transition group">
                <Clock className="h-5 w-5 text-orange-600 mb-1 group-hover:scale-110 transition" />
                <span className="text-xs text-slate-600 font-medium">Hours</span>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 h-96 bg-gradient-to-b from-white to-slate-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-orange-500 text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-900 rounded-bl-none shadow-sm'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-orange-100' : 'text-slate-400'
                    }`}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t border-slate-200 bg-slate-50">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {['Demo Request', 'Pricing Info', 'Technical Support'].map((reply) => (
                <button
                  key={reply}
                  onClick={() => {
                    const newMessage = {
                      text: reply,
                      sender: 'user' as const,
                      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                    };
                    setMessages([...messages, newMessage]);
                    setTimeout(() => {
                      const autoReply = {
                        text: `Thanks for your interest in ${reply}! Our team will assist you shortly.`,
                        sender: 'bot' as const,
                        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                      };
                      setMessages((prev) => [...prev, autoReply]);
                    }, 1000);
                  }}
                  className="px-3 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-slate-200 bg-white">
            <div className="flex items-end space-x-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 resize-none rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition"
                rows={1}
              />
              <Button
                onClick={handleSend}
                size="icon"
                className="h-10 w-10 rounded-xl bg-orange-500 hover:bg-orange-600 transition"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-400 mt-2 text-center">
              We typically reply within a few minutes
            </p>
          </div>
        </div>
      )}
    </>
  );
}
