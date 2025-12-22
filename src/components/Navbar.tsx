import { Crown, Search, LogOut, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore'
import { getCurrentUser, logout, type User } from '../services/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const { setSearch } = useStore()
  const [current, setCurrent] = useState<User | null>(null)
  useEffect(() => {
    getCurrentUser().then(setCurrent)
    const handler = () => getCurrentUser().then(setCurrent)
    window.addEventListener('auth-changed', handler)
    return () => window.removeEventListener('auth-changed', handler)
  }, [])
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-slate-900/80">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg gold-gradient text-slate-900">
            <Crown className="h-5 w-5" />
          </span>
          <span className="text-xl font-bold tracking-wide">Premium Rental Service</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <Link to="/cars" className="hover:text-amber-400">Exotic Cars</Link>
          <Link to="/bikes" className="hover:text-amber-400">Superbikes</Link>
          <Link to="/rooms" className="hover:text-amber-400">Luxury Suites</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <div className="relative w-56 hidden sm:block">
            <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by brand, location..."
              className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-800 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              onChange={(e) => {
                const q = e.target.value
                setSearch(q)
                navigate(`/search?q=${encodeURIComponent(q)}`)
              }}
            />
          </div>
          {current ? (
            <div className="flex items-center gap-2">
              <Link to="/profile" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 hover:border-amber-400 transition">
                <span className="text-sm">Profile</span>
              </Link>
              <Link to="/my-bookings" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 hover:border-amber-400 transition">
                <span className="text-sm">My Bookings</span>
              </Link>
              {current.role === 'admin' && (
                <Link to="/admin" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 hover:border-amber-400 transition">
                  <span className="text-sm">Admin</span>
                </Link>
              )}
              <button className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 hover:border-amber-400 transition" onClick={async () => { await logout(); navigate('/') }}>
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 hover:border-amber-400 transition">
                <LogIn className="h-4 w-4" />
                <span className="text-sm">Login</span>
              </Link>
              <Link to="/signup" className="inline-flex items-center gap-2 rounded-lg px-3 py-2 border border-white/10 hover:border-amber-400 transition">
                <span className="text-sm">Signup</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
