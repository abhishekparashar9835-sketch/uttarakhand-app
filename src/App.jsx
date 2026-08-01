import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import authService from "./services/authService";
import { login, logout } from "./store/authSlice";

// Layout
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./components/Home/Home";
import Places from "./components/Places/Places";
import HotelsVendors from "./components/HotelsVendors/HotelsVendors";
import Menu from "./components/Menu/Menu";
import Contact from "./components/Contact/Contact";
import Profile from "./components/Profile/Profile";
import GovDashBoard from "./components/GovDashBoard/GovDashBoard";
import BookYatra from "./components/BookYatra/BookYatra";
import MyBookings from "./components/MyBookings/MyBookings";

// Auth
import Login from "./components/Login";
import Signup from "./components/Signup";

// Chatbot
import ChatBot from "./components/ChatBot/ChatBot";
import { useChatAPI } from "./hooks/useChatAPI";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // Chatbot state
  const {
    messages,
    isLoading: chatLoading,
    sendMessage,
  } = useChatAPI();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          dispatch(logout());
          return;
        }

        const userData = await authService.getCurrentUser();

        if (userData) {
          // ✅ Store actual user object
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log("No active session:", error);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4fbf7] flex items-center justify-center">
        <div className="animate-pulse text-[#1b3d2b] text-xl font-serif">
          Loading Uttarakhand Unlocked...
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f4fbf7] text-gray-800">

        <Header />

        <main className="flex-grow">
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/places" element={<Places />} />
            <Route path="/hotels" element={<HotelsVendors />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-yatra" element={<BookYatra />} />
            <Route path="/my-bookings" element={<MyBookings />} />

            {/* Authentication */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* User */}
            <Route path="/profile" element={<Profile />} />

            {/* Admin */}
            <Route path="/dashboard" element={<GovDashBoard />} />

            {/* Unknown Routes */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>

        <Footer />

        <ChatBot
          messages={messages}
          onSubmit={sendMessage}
          isLoading={chatLoading}
        />

      </div>
    </Router>
  );
}

export default App;