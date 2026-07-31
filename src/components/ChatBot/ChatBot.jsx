import React, { useState, useRef, useEffect } from 'react'
import { Send, X, Bot, Leaf, MapPin, Minimize2, Compass, RotateCcw } from 'lucide-react'

const formatTime = (date) =>
  new Intl.DateTimeFormat('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)

// Simple Markdown Parser to format bullet points, bolding, and line breaks nicely
const renderFormattedContent = (content) => {
  if (!content) return null

  const lines = content.split('\n')
  return lines.map((line, idx) => {
    let formattedLine = line

    // Parse bold text: **text**
    const boldRegex = /\*\*(.*?)\*\*/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = boldRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index))
      }
      parts.push(<strong key={match.index} className="font-bold text-emerald-950">{match[1]}</strong>)
      lastIndex = boldRegex.lastIndex
    }
    
    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex))
    }

    const lineContent = parts.length > 0 ? parts : formattedLine

    // Check if line is a bullet point
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const cleanText = line.replace(/^[-*]\s+/, '')
      return (
        <li key={idx} className="list-disc ml-4 my-1 pl-1 text-gray-700">
          {parts.length > 0 ? lineContent : cleanText}
        </li>
      )
    }

    return (
      <p key={idx} className="my-1.5 min-h-[1px] text-gray-700 leading-relaxed">
        {parts.length > 0 ? lineContent : formattedLine}
      </p>
    )
  })
}

const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user'
  return (
    <div className={`flex items-end gap-2.5 mb-4 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
          <Leaf size={14} className="text-white" />
        </div>
      )}

      <div
        className={`relative max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm
          ${isUser
            ? 'bg-emerald-600 text-white rounded-br-sm'
            : 'bg-white text-gray-800 border border-emerald-50 rounded-bl-sm'
          }`}
      >
        <div className="space-y-0.5">{renderFormattedContent(message.content)}</div>
        <span className={`block text-[9px] mt-1 select-none ${isUser ? 'text-emerald-200 text-right' : 'text-gray-400'}`}>
          {formatTime(message.timestamp || new Date())}
        </span>
      </div>
    </div>
  )
}

const TypingIndicator = () => (
  <div className="flex items-end gap-2.5 mb-4">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center shadow-md">
      <Leaf size={14} className="text-white" />
    </div>
    <div className="bg-white border border-emerald-50 rounded-2xl rounded-bl-sm px-4.5 py-3.5 shadow-sm">
      <div className="flex gap-1.5 items-center">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 chatbot-typing-dot" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 chatbot-typing-dot" style={{ animationDelay: '160ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 chatbot-typing-dot" style={{ animationDelay: '320ms' }} />
      </div>
    </div>
  </div>
)

const ChatBot = ({
  messages = [],
  onSubmit,
  isLoading = false,
  botName = 'Pahari Mitra',
  greeting = "Namaste! 🏔️ Tell me about your planned journey below, and I'll find matching stays and sites directly from our website listings.",
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [showForm, setShowForm] = useState(true)
  
  const [destination, setDestination] = useState('')
  const [category, setCategory] = useState('All')
  const [budget, setBudget] = useState('Gold')
  const [duration, setDuration] = useState('3-5 Days')

  const [localMessages, setLocalMessages] = useState([
    {
      id: 'greeting-0',
      role: 'assistant',
      content: greeting,
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const allMessages = messages.length > 0 ? messages : localMessages

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [allMessages, isLoading, isOpen, showForm])

  useEffect(() => {
    if (isOpen && !showForm) {
      setTimeout(() => inputRef.current?.focus(), 250)
    }
  }, [isOpen, showForm])

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
    const el = e.target
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 96)}px`
  }

  const handleSubmit = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : inputValue
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    }

    setInputValue('')
    if (inputRef.current) inputRef.current.style.height = 'auto'

    if (!onSubmit) {
      setLocalMessages((prev) => [...prev, userMsg])
      setTimeout(() => {
        setLocalMessages((prev) => [
          ...prev,
          {
            id: `bot-${Date.now()}`,
            role: 'assistant',
            content: '🌿 Make sure your server is running to get website-aligned recommendations!',
            timestamp: new Date(),
          },
        ])
      }, 1200)
      return
    }

    setLocalMessages((prev) => [...prev, userMsg])
    await onSubmit(trimmed)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const summary = `Help me plan a trip to Uttarakhand. Requirements:\n📍 Location/Area: ${destination || 'Anywhere'}\n🧭 Experience Type: ${category}\n💰 Budget Category: ${budget}\n📅 Duration: ${duration}`
    setShowForm(false)
    handleSubmit(summary)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px] sm:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3.5">
        
        {/* Larger, cleaner chat window dimensions */}
        <div
          role="dialog"
          aria-label={`${botName} window`}
          className={`
            w-[370px] sm:w-[460px] flex flex-col
            bg-[#f8fdfa] rounded-[24px] overflow-hidden
            shadow-[0_20px_60px_-10px_rgba(0,0,0,0.22),0_8px_24px_-6px_rgba(16,100,60,0.12)]
            border border-emerald-100/80
            transition-all duration-300 origin-bottom-right
            ${isOpen
              ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
            }
          `}
          style={{ height: isOpen ? '580px' : '0px' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5.5 py-4 bg-gradient-to-r from-emerald-800 to-emerald-700 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/15 flex items-center justify-center ring-2 ring-white/20">
                  <Bot size={20} className="text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-emerald-800" />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-sm leading-tight">{botName}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Compass size={10} className="text-emerald-200/85" />
                  <p className="text-emerald-200/85 text-[11px] font-light">Interactive Guide</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              {!showForm && (
                <button
                  onClick={() => setShowForm(true)}
                  title="Plan Another Trip"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                >
                  <RotateCcw size={15} />
                </button>
              )}
              <button
                id="chatbot-close-btn"
                aria-label="Close"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                <Minimize2 size={16} />
              </button>
            </div>
          </div>

          <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 flex-shrink-0" />

          {/* Scrollable Area */}
          <div className="flex-1 overflow-y-auto px-5 py-4 chatbot-messages-area bg-[#fcfdfd]">
            {showForm ? (
              <form onSubmit={handleFormSubmit} className="space-y-4.5 bg-white p-5.5 rounded-2xl border border-emerald-50/60 shadow-sm text-left">
                <div className="flex items-center gap-2 text-emerald-800 font-medium text-sm pb-1.5 border-b border-emerald-50/80">
                  <Compass size={17} className="text-emerald-600 animate-spin-slow" />
                  <span>Configure Your Getaway</span>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    📍 Destination Location
                  </label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Chamoli, Rishikesh, Nainital..."
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 bg-gray-50/40"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    🧭 Type of Experience
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 bg-white"
                  >
                    <option value="All">All Experiences</option>
                    <option value="Religious">Religious & Sacred Shrines</option>
                    <option value="Tourist Spots">Sightseeing & Adventure Spots</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    💰 Budget Preference
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['Silver', 'Gold', 'Diamond'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setBudget(tier)}
                        className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                          budget === tier
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800 shadow-sm'
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {tier === 'Silver' && '⭐ Silver'}
                        {tier === 'Gold' && '👑 Gold'}
                        {tier === 'Diamond' && '💎 Diamond'}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    📅 Trip Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-50 bg-white"
                  >
                    <option value="1-2 Days">Weekend Getaway (1-2 Days)</option>
                    <option value="3-5 Days">Short Holiday (3-5 Days)</option>
                    <option value="6-9 Days">Longer Expedition (6-9 Days)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  <Compass size={15} />
                  <span>Get Website Suggestions</span>
                </button>
              </form>
            ) : (
              <>
                {allMessages.map((msg) => (
                  <MessageBubble key={msg.id} message={msg} />
                ))}
                {isLoading && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          <div className="mx-4 h-px bg-gradient-to-r from-transparent via-emerald-100 to-transparent flex-shrink-0" />

          {/* Input Area */}
          <div className="px-4.5 py-3 bg-white flex-shrink-0">
            <div className="flex items-end gap-2.5 bg-gray-50 rounded-2xl border border-gray-200 px-3.5 py-2.5 focus-within:border-emerald-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-emerald-100 transition-all duration-200">
              <textarea
                id="chatbot-input"
                ref={inputRef}
                rows={1}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={showForm ? "Please fill form above first..." : "Ask Pahari Mitra..."}
                disabled={showForm}
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 resize-none outline-none leading-relaxed py-0.5 max-h-24 disabled:opacity-50"
                style={{ height: '24px' }}
              />
              <button
                id="chatbot-send-btn"
                onClick={() => handleSubmit()}
                disabled={!inputValue.trim() || isLoading || showForm}
                className={`flex-shrink-0 w-8.5 h-8.5 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer
                  ${inputValue.trim() && !isLoading && !showForm
                    ? 'bg-emerald-700 text-white hover:bg-emerald-600 shadow-sm hover:scale-105 active:scale-95'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
              >
                <Send size={13} />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-400 mt-2 select-none font-light">
              Powered by Uttarakhand Unlocked · RAG AI Guide
            </p>
          </div>
        </div>

        {/* FAB Button */}
        <button
          id="chatbot-fab-btn"
          aria-label={isOpen ? 'Close chat' : 'Open chat'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`
            relative w-14 h-14 rounded-full cursor-pointer
            flex items-center justify-center
            bg-gradient-to-br from-emerald-600 to-emerald-800
            shadow-[0_8px_32px_-4px_rgba(5,150,105,0.45),0_2px_8px_rgba(0,0,0,0.12)]
            hover:shadow-[0_12px_40px_-4px_rgba(5,150,105,0.6),0_4px_12px_rgba(0,0,0,0.18)]
            transition-shadow duration-300
            focus-visible:outline-none
            ${!isOpen ? 'chatbot-fab-float' : ''}
          `}
        >
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full bg-emerald-600 chatbot-fab-ping"
            />
          )}

          <span className={`absolute transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
            <X size={22} className="text-white" />
          </span>

          <span className={`absolute transition-all duration-300 ${isOpen ? 'opacity-0 -rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
            <Bot size={22} className="text-white" />
          </span>

          {!isOpen && allMessages.length > 1 && (
            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-rose-500 border-2 border-white flex items-center justify-center">
              <span className="text-white text-[9px] font-bold leading-none">
                {Math.min(allMessages.length - 1, 9)}
              </span>
            </span>
          )}
        </button>
      </div>
    </>
  )
}

export default ChatBot