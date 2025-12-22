import { useState, useEffect } from 'react'
import { getCurrentUser, updateProfile, type User } from '../services/auth'
import { Link } from 'react-router-dom'

export default function Profile() {
  const [user, setUser] = useState<User | null>(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  useEffect(() => {
    getCurrentUser().then((u) => {
      if (u) {
        setUser(u)
        setName(u.name || '')
        setEmail(u.email || '')
        setAddress(u.address || '')
        setPhone(u.phone || '')
      }
    })
  }, [])

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="text-slate-300">You are not logged in.</div>
        <Link to="/login" className="mt-4 inline-block rounded-lg px-4 py-2 border border-white/10 hover:border-amber-400">Go to Login</Link>
      </div>
    )
  }

  const onSave = async () => {
    setErr(''); setMsg('')
    try {
      await updateProfile({ name, address, phone })
      setMsg('Profile updated')
    } catch (e: any) {
      setErr(e.message)
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold">Profile</h1>
      <label className="block mt-4 text-sm">Name</label>
      <input className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" value={name} onChange={(e) => setName(e.target.value)} />
      <label className="block mt-3 text-sm">Email</label>
      <input className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" value={email} readOnly />
      <label className="block mt-3 text-sm">Address</label>
      <input className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" value={address} onChange={(e) => setAddress(e.target.value)} />
      <label className="block mt-3 text-sm">Phone</label>
      <input className="w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button className="mt-4 w-full rounded-lg px-4 py-2 gold-gradient text-slate-900 font-semibold" onClick={onSave}>Save</button>
      {msg && <div className="mt-3 text-amber-400">{msg}</div>}
      {err && <div className="mt-3 text-red-400">{err}</div>}
    </div>
  )
}
