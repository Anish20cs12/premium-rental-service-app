import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  const onLogin = async () => {
    setErr(''); setMsg('')
    try {
      await login(email, password)
      setMsg('Logged in')
      navigate('/')
    } catch (e: any) {
      setErr(e.message)
    }
  }
  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold">Login</h1>
      <input className="mt-4 w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="mt-2 w-full px-3 py-2 rounded-lg bg-slate-800 border border-white/10" placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="mt-4 w-full rounded-lg px-4 py-2 gold-gradient text-slate-900 font-semibold" onClick={onLogin}>Login</button>
      {msg && <div className="mt-3 text-amber-400">{msg}</div>}
      {err && <div className="mt-3 text-red-400">{err}</div>}
    </div>
  )
}
