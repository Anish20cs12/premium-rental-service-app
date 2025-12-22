import { X, CalendarDays, Info } from 'lucide-react'
import { useStore } from '../store/useStore'
import { toINR, formatINR } from '../lib/currency'
import DateRangePicker from './DateRangePicker'
import type { DateRange } from 'react-day-picker'

export default function ProductDetail() {
  const { selected, setDateRange, dateRange, selectProduct, addBooking } = useStore()
  if (!selected) return null

  const days = dateRange.from && dateRange.to ? Math.max(1, (dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24)) : 0
  const pricePerDayInInr = toINR(selected.price_per_day || 0)
  const totalInInr = pricePerDayInInr * (days || 1)

  const onRange = (range?: DateRange) => setDateRange({ from: range?.from, to: range?.to })

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => selectProduct(undefined)}>
      <div className="glass-card max-w-4xl w-full rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <img src={selected.images[0]} alt={selected.title} className="h-72 w-full object-cover" />
          <button className="absolute top-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 border border-white/10" onClick={() => selectProduct(undefined)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div>
            <h2 className="text-2xl font-bold">{selected.title}</h2>
            <div className="mt-3 space-y-2 text-sm text-slate-300">
              {Object.entries(selected.specs).map(([k, v]) => (
                <div key={k} className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-amber-400" />
                  <span className="font-medium">{k}:</span>
                  <span>{String(v)}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-amber-400" />
              <span className="font-semibold">Select dates</span>
            </div>
            <div className="mt-3">
              <DateRangePicker selected={{ from: dateRange.from, to: dateRange.to }} onSelect={onRange} />
            </div>
            <div className="mt-4 p-4 rounded-xl border border-white/10 bg-slate-800/50">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Price per day</span>
                <span className="font-semibold">{formatINR(pricePerDayInInr)}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-slate-300">Days</span>
                <span className="font-semibold">{days || 1}</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-slate-300">Total</span>
                <span className="text-amber-400 font-bold">{formatINR(totalInInr)}</span>
              </div>
              <button
                className="mt-4 w-full rounded-lg gold-gradient text-slate-900 font-semibold py-2"
                onClick={() => {
                  if (!dateRange.from || !dateRange.to) return
                  addBooking({
                    user_id: 'guest',
                    product_id: selected.id,
                    start_date: dateRange.from,
                    end_date: dateRange.to,
                    status: 'pending',
                  })
                  selectProduct(undefined)
                }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
