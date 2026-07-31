import { useState, useCallback } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'

/**
 * useChatAPI
 *
 * Manages message state and handles all communication with the RAG backend.
 * Pass the returned values directly to the <ChatBot /> component.
 *
 * @returns {{
 *   messages: Array<{id, role, content, timestamp, sources}>,
 *   isLoading: boolean,
 *   error: string|null,
 *   sendMessage: (text: string) => Promise<void>,
 *   clearMessages: () => void,
 * }}
 */
export function useChatAPI() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim()) return

    // Optimistically add user message
    const userMsg = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
      sources: [],
    }

    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)
    setError(null)

    // Build conversation history for multi-turn context (last 6 messages)
    const history = messages.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim(), history }),
      })

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}))
        throw new Error(errData.error || `Server error: ${response.status}`)
      }

      const data = await response.json()

      const botMsg = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: data.reply,
        timestamp: new Date(),
        sources: data.sources || [],
      }

      setMessages((prev) => [...prev, botMsg])
    } catch (err) {
      console.error('[useChatAPI] Error:', err)
      setError(err.message)

      // Add an error message to the chat so the user sees it
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: `🔴 Sorry, I couldn't connect to the server. Make sure the backend is running at ${API_BASE}.\n\nError: ${err.message}`,
          timestamp: new Date(),
          sources: [],
          isError: true,
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }, [messages])

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isLoading, error, sendMessage, clearMessages }
}