import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getById, type Item } from '../services/storage'
import { formatUsdToInr } from '../lib/currency'

export default function ItemDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState<Item | null>(null)
  
  useEffect(() => {
    if (id) getById(id).then(setItem)
  }, [id])

  if (!item) return <div className="mx-auto max-w-7xl px-4 py-10">Loading...</div>
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <img src={item.images[0]} alt={item.title} className="rounded-2xl w-full h-80 object-cover" />
      <div className="mt-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">{item.title}</h1>
        <span className="text-amber-400 font-semibold">{formatUsdToInr(item.price_per_day)}/day</span>
      </div>
      <p className="mt-3 text-slate-300">{item.description}</p>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {Object.entries(item.specs).map(([k, v]) => (
          <div key={k} className="rounded-lg border border-white/10 p-3 bg-slate-800/50">
            <span className="text-slate-300">{k}</span>
            <div className="font-semibold">{String(v)}</div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <button className="rounded-lg px-4 py-2 border border-white/10 hover:border-amber-400" onClick={() => navigate(-1)}>Back</button>
        <Link to={`/booking/${item.id}`} className="rounded-lg px-4 py-2 gold-gradient text-slate-900 font-semibold">Book now</Link>
      </div>
    </div>
  )
}
