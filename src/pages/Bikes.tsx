import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { getBikes, type Item } from '../services/storage'
import { getCurrentUser } from '../services/auth'

export default function Bikes() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  useEffect(() => { setQ(params.get('q') || '') }, [params])
  const [sort, setSort] = useState<'price' | 'rating'>('price')
  const [items, setItems] = useState<Item[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => { 
    getBikes().then(setItems)
    getCurrentUser().then(u => setUserId(u?.id || ''))
  }, [])

  const filtered = useMemo(() => {
    const s = q.toLowerCase()
    const list = items.filter((i) => i.title.toLowerCase().includes(s) || i.location.toLowerCase().includes(s))
    return list.sort((a, b) => (sort === 'price' ? a.price_per_day - b.price_per_day : b.rating - a.rating))
  }, [q, sort, items])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-3">
        <input className="w-64 px-3 py-2 rounded-lg bg-slate-800 border border-white/10" placeholder="Search bikes" value={q} onChange={(e) => setQ(e.target.value)} />
        <select className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10" value={sort} onChange={(e) => setSort(e.target.value as 'price' | 'rating')}>
          <option value="price">Sort by price</option>
          <option value="rating">Sort by rating</option>
        </select>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((i: Item) => (
          <ItemCard key={i.id} item={i} userId={userId} />
        ))}
      </div>
    </div>
  )
}
