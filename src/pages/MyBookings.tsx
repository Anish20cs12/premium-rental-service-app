import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, type User } from '../services/auth'
import { getUserBookings, type Booking, getById, type Item, updateBookingStatus } from '../services/storage'
import DateRangePicker from '../components/DateRangePicker'
import type { DateRange } from 'react-day-picker'
import { formatINR } from '../lib/currency'

export default function MyBookings() {
  const [user, setUser] = useState<User | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [items, setItems] = useState<Record<string, Item>>({})
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'all' | Booking['status']>('all')
  const [range, setRange] = useState<DateRange | undefined>()

  useEffect(() => {
    getCurrentUser().then(async (u) => {
      setUser(u)
      if (!u) { setLoading(false); return }
      const list = await getUserBookings(u.id)
      setBookings(list)
      const ids = Array.from(new Set(list.map(b => b.item_id)))
      const map: Record<string, Item> = {}
      for (const id of ids) {
        const i = await getById(id)
        if (i) map[id] = i
      }
      setItems(map)
      setLoading(false)
    })
  }, [])

  const filtered = useMemo(() => {
    return bookings.filter((b) => {
      if (status !== 'all' && b.status !== status) return false
      if (range?.from && new Date(b.start_date) < range.from) return false
      if (range?.to && new Date(b.end_date) > range.to) return false
      return true
    })
  }, [bookings, status, range])

  const onCancel = async (id: string, startISO: string, currentStatus: Booking['status']) => {
    // Allow cancel only if not already cancelled and start date is in the future
    const startsInFuture = new Date(startISO).getTime() > Date.now()
    if (currentStatus === 'cancelled' || !startsInFuture) return
    const ok = window.confirm('Cancel this booking?')
    if (!ok) return
    await updateBookingStatus(id, 'cancelled')
    // Refresh list
    if (user) {
      const list = await getUserBookings(user.id)
      setBookings(list)
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-10">Loading...</div>
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-10">
        <div className="text-slate-300">You are not logged in.</div>
        <Link to="/login" className="mt-4 inline-block rounded-lg px-4 py-2 border border-white/10 hover:border-amber-400">Go to Login</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-2xl font-bold">My Bookings</h1>
      <div className="mt-4 flex flex-col md:flex-row md:items-center gap-4">
        <select className="px-3 py-2 rounded-lg bg-slate-800 border border-white/10 w-48" value={status} onChange={(e) => setStatus(e.target.value as any)}>
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <div className="max-w-full">
          <DateRangePicker selected={range} onSelect={setRange} />
        </div>
      </div>
      {bookings.length === 0 ? (
        <div className="mt-6 text-slate-400">No bookings found</div>
      ) : (
        <div className="mt-6 rounded-xl border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-800/60">
              <tr>
                <th className="text-left px-3 py-2">Service</th>
                <th className="text-left px-3 py-2">Dates</th>
                <th className="text-left px-3 py-2">Total</th>
                <th className="text-left px-3 py-2">Status</th>
                <th className="text-left px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => {
                const item = items[b.item_id]
                const canCancel = b.status !== 'cancelled' && new Date(b.start_date).getTime() > Date.now()
                return (
                  <tr key={b.id} className="border-t border-white/10">
                    <td className="px-3 py-2">{item ? `${item.title} • ${item.category}` : b.item_id}</td>
                    <td className="px-3 py-2">{new Date(b.start_date).toLocaleDateString()} → {new Date(b.end_date).toLocaleDateString()}</td>
                    <td className="px-3 py-2">{formatINR(b.total_price)}</td>
                    <td className="px-3 py-2">{b.status}</td>
                    <td className="px-3 py-2">
                      {canCancel ? (
                        <button className="rounded-md px-3 py-1 border border-white/10 hover:border-amber-400" onClick={() => onCancel(b.id, b.start_date, b.status)}>Cancel</button>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
