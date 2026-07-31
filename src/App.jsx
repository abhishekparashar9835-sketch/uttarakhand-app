import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import authService from './services/authService'
import { login, logout } from './store/authSlice'

// Core Layout Wrappers
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

// Core Page Components
import Home from './components/Home/Home'
import Places from './components/Places/Places'
import HotelsVendors from './components/HotelsVendors/HotelsVendors'
import Menu from './components/Menu/Menu'
import Contact from './components/Contact/Contact'
import Profile from './components/Profile/Profile'
import GovDashBoard from './components/GovDashBoard/GovDashBoard'

// Auth Components
import Login from './components/Login'
import Signup from './components/Signup'

// Global Floating ChatBot
import ChatBot from './components/ChatBot/ChatBot'
import { useChatAPI } from './hooks/useChatAPI'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  // RAG chatbot state — shared across all routes
  const { messages, isLoading: chatLoading, sendMessage } = useChatAPI()

  useEffect(() => {
    // Check auth status on app load via Appwrite
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.log("No active session found (User is a guest)");
        dispatch(logout())
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4fbf7] flex items-center justify-center">
        <div className="animate-pulse text-[#1b3d2b] font-serif text-xl tracking-wide">
          Loading Uttarakhand Unlocked...
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-[#f4fbf7] text-gray-800">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            {/* Main Public Flow Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/hotels" element={<HotelsVendors />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />

            {/* Account & Security Views */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />

            {/* Management Admin Dashboard */}
            <Route path="/dashboard" element={<GovDashBoard />} />
            
            {/* Catch-all Routing Strategy (Always keep at the absolute bottom) */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />

        {/* Floating AI chatbot — persists across all routes, wired to RAG backend */}
        <ChatBot
          messages={messages}
          onSubmit={sendMessage}
          isLoading={chatLoading}
        />
      </div>
    </Router>
  )
}

export default App;