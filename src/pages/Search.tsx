import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ItemCard from '../components/ItemCard'
import { getCars, getBikes, getRooms, type Item } from '../services/storage'
import { getCurrentUser } from '../services/auth'

export default function Search() {
  const [params] = useSearchParams()
  const [q, setQ] = useState(params.get('q') || '')
  useEffect(() => { setQ(params.get('q') || '') }, [params])

  const [items, setItems] = useState<Item[]>([])
  const [userId, setUserId] = useState('')

  useEffect(() => {
    Promise.all([getCars(), getBikes(), getRooms()]).then(([c, b, r]) => setItems([...c, ...b, ...r]))
    getCurrentUser().then(u => setUserId(u?.id || ''))
  }, [])

  const filtered = useMemo(() => {
    const s = q.toLowerCase()
    return items.filter((i) => i.title.toLowerCase().includes(s) || i.location.toLowerCase().includes(s))
  }, [q, items])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold">Search</h1>
      <div className="mt-2 text-slate-300 text-sm">Query: {q ? q : 'All'}</div>
      {filtered.length === 0 ? (
        <div className="mt-6 text-slate-400">No results</div>
      ) : (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((i) => (
            <ItemCard key={i.id} item={i} userId={userId} />
          ))}
        </div>
      )}
    </div>
  )
}
