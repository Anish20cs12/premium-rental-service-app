import { useEffect, useState } from 'react'
import { getBookings, updateBookingStatus, type Booking, getById, type Item } from '../services/storage'
import { getCurrentUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { formatINR } from '../lib/currency'

export default function Admin() {
  const navigate = useNavigate()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [items, setItems] = useState<Record<string, Item>>({})
  const [users, setUsers] = useState<Record<string, any>>({}) // Simple cache for user emails

  useEffect(() => {
    getCurrentUser().then((me) => {
      if (!me || me.role !== 'admin') { navigate('/'); return }
      loadData()
    })
  }, [navigate])

  const loadData = async () => {
    const list = await getBookings()
    setBookings(list)

    // Fetch related items and users
    const itemIds = Array.from(new Set(list.map(b => b.item_id)))
    const userIds = Array.from(new Set(list.map(b => b.user_id)))

    // Fetch Items
    const itemMap: Record<string, Item> = {}
    for (const id of itemIds) {
      const i = await getById(id)
      if (i) itemMap[id] = i
    }
    setItems(itemMap)

    // Fetch Users (Admins can view profiles, or we can fetch via supabase admin api if needed, 
    // but standard profiles table is public/viewable)
    const { data: profiles } = await supabase.from('profiles').select('*').in('id', userIds)
    const userMap: Record<string, any> = {}
    if (profiles) {
      profiles.forEach(p => userMap[p.id] = p)
    }
    setUsers(userMap)
  }

  const onCancel = async (id: string) => {
    await updateBookingStatus(id, 'cancelled')
    loadData()
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <div className="mt-6 rounded-xl border border-white/10 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-800/60">
            <tr>
              <th className="text-left px-3 py-2">User</th>
              <th className="text-left px-3 py-2">Service</th>
              <th className="text-left px-3 py-2">Dates</th>
              <th className="text-left px-3 py-2">Total</th>
              <th className="text-left px-3 py-2">Status</th>
              <th className="text-left px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => {
              const u = users[b.user_id]
              const item = items[b.item_id]
              return (
                <tr key={b.id} className="border-t border-white/10">
                  <td className="px-3 py-2">{u ? `${u.full_name} (${u.phone || 'No phone'})` : b.user_id}</td>
                  <td className="px-3 py-2">{item ? `${item.title} • ${item.category}` : b.item_id}</td>
                  <td className="px-3 py-2">{new Date(b.start_date).toLocaleDateString()} → {new Date(b.end_date).toLocaleDateString()}</td>
                  <td className="px-3 py-2">{formatINR(b.total_price)}</td>
                  <td className="px-3 py-2">{b.status}</td>
                  <td className="px-3 py-2">
                    {b.status !== 'cancelled' && (
                      <button className="rounded-md px-3 py-1 border border-white/10 hover:border-amber-400" onClick={() => onCancel(b.id)}>Cancel</button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
