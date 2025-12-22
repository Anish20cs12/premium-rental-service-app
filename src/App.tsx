import { } from 'react'
import Navbar from './components/Navbar'
import Background from './components/Background'
import HeroSection from './components/HeroSection'
import Testimonials from './components/Testimonials'
import { Routes, Route } from 'react-router-dom'
import Cars from './pages/Cars'
import Bikes from './pages/Bikes'
import Rooms from './pages/Rooms'
import ItemDetails from './pages/ItemDetails'
import Booking from './pages/Booking'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Search from './pages/Search'
import MyBookings from './pages/MyBookings'

const isConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY
  return url && key && !url.includes('your-project-id') && !key.includes('your-anon-key')
}

export default function App() {
  if (!isConfigured()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-300 p-4">
        <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl border border-red-500/20 shadow-2xl">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Configuration Required</h1>
          <p className="mb-4">
            It looks like you haven't connected your Supabase project yet. The "Failed to fetch" error occurs because the app is trying to connect to a placeholder URL.
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-6 text-sm">
            <li>Open your project in the <a href="https://supabase.com/dashboard" target="_blank" className="text-amber-400 hover:underline">Supabase Dashboard</a>.</li>
            <li>Go to <strong>Settings</strong> &gt; <strong>API</strong>.</li>
            <li>Copy the <strong>Project URL</strong> and <strong>anon public key</strong>.</li>
            <li>Open the <code className="bg-slate-950 px-1 py-0.5 rounded text-amber-400">.env</code> file in your project root.</li>
            <li>Replace the placeholder values with your actual keys.</li>
            <li>Restart the development server if needed.</li>
          </ol>
          <div className="text-xs text-slate-500">
            Current URL: {import.meta.env.VITE_SUPABASE_URL}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Background />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <Testimonials />
          </>
        } />
        <Route path="/cars" element={<Cars />} />
        <Route path="/bikes" element={<Bikes />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/details/:id" element={<ItemDetails />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </div>
  )
}
