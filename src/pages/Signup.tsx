import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../services/auth'

export default function Signup() {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')
  const onSignup = async () => {
    setErr(''); setMsg('')
    if (password.length < 6) { setErr('Password must be at least 6 characters'); return }
    try {
      const { session } = await signup(name, email, password)
      if (!session) {
        setMsg('Signup successful! Please check your email to confirm your account before logging in.')
      } else {
        setMsg('Signed up and logged in')
        navigate('/')
      }
    } catch (e: any) {
      setErr(e.message)
    }
  }
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold">Signup</h1>
      <input className="mt-4 w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="mt-2 w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="mt-2 w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="mt-4 w-full rounded-lg px-4 py-2 gold-gradient text-slate-900 font-semibold" onClick={onSignup}>Signup</button>
      {msg && <div className="mt-3 text-amber-400">{msg}</div>}
      {err && <div className="mt-3 text-red-400">{err}</div>}
    </div>
  )
}
