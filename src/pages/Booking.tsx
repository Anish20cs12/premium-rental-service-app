import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getById, saveBooking, hasOverlap, type Item, type Booking as BookingType } from '../services/storage'
import DateRangePicker from '../components/DateRangePicker'
import type { DateRange } from 'react-day-picker'
import { getCurrentUser, type User } from '../services/auth'
import { toINR, formatINR } from '../lib/currency'
import { CheckCircle, QrCode, Wallet, CalendarDays } from 'lucide-react'

export default function Booking() {
  const { id } = useParams()
  const [item, setItem] = useState<Item | null>(null)
  const [user, setUser] = useState<User | null>(null)
  
  useEffect(() => {
    if (id) getById(id).then(setItem)
    getCurrentUser().then(setUser)
  }, [id])

  const [range, setRange] = useState<DateRange | undefined>()
  const [error, setError] = useState<string>('')
  
  const [step, setStep] = useState<'dates' | 'payment' | 'success'>('dates')
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'qr'>('cod')
  const [confirmedBooking, setConfirmedBooking] = useState<BookingType | null>(null)

  if (!item) return <div className="mx-auto max-w-7xl px-4 py-10">Loading...</div>

  // Calculate total for display
  const days = range?.from && range?.to ? Math.max(1, Math.ceil((range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24))) : 0
  const total = days * toINR(item.price_per_day)

  const onProceed = async () => {
    setError('')
    if (!user) { setError('Please login to book'); return }
    if (!range?.from || !range?.to) { setError('Select start and end dates'); return }
    
    const start = range.from.toISOString()
    const end = range.to.toISOString()
    
    const overlap = await hasOverlap(item.id, start, end)
    if (overlap) { setError('Selected dates overlap with existing bookings'); return }
    
    setStep('payment')
  }

  const onConfirm = async () => {
    if (!range?.from || !range?.to) {
      setError('Invalid dates selected')
      return
    }
    if (!user) {
      setError('User session not found. Please login again.')
      return
    }
    
    try {
      const b = await saveBooking({ 
        user_id: user.id, 
        item_id: item.id, 
        start_date: range.from.toISOString(), 
        end_date: range.to.toISOString()
      }, toINR(item.price_per_day))
      setConfirmedBooking(b)
      setStep('success')
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (step === 'success' && confirmedBooking) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center">
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/10 shadow-xl">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-500/20 text-green-400 mb-6">
            <CheckCircle className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Booking Successful!</h1>
          <p className="text-slate-300 mb-6">Your booking for <span className="text-amber-400 font-semibold">{item.title}</span> has been confirmed.</p>
          
          <div className="bg-slate-900/50 p-4 rounded-xl text-left space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-slate-400">Total Amount</span>
              <span className="font-semibold text-xl">{formatINR(confirmedBooking.total_price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Method</span>
              <span className="font-medium capitalize flex items-center gap-2">
                {paymentMethod === 'cod' ? <Wallet className="h-4 w-4" /> : <QrCode className="h-4 w-4" />}
                {paymentMethod === 'cod' ? 'Cash on Delivery' : 'QR Code'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Dates</span>
              <span className="font-medium">
                {new Date(confirmedBooking.start_date).toLocaleDateString()} - {new Date(confirmedBooking.end_date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/my-bookings" className="rounded-lg px-6 py-2 bg-slate-700 hover:bg-slate-600 transition font-semibold">My Bookings</Link>
            <Link to="/" className="rounded-lg px-6 py-2 gold-gradient text-slate-900 font-semibold">Back to Home</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Booking: {item.title}</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          {step === 'dates' && (
            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-amber-400" /> Select Dates
              </h2>
              <DateRangePicker selected={range} onSelect={setRange} />
              {error && <div className="mt-4 text-red-400 bg-red-400/10 p-3 rounded-lg">{error}</div>}
              <button 
                className="mt-6 w-full rounded-lg px-4 py-3 gold-gradient text-slate-900 font-bold text-lg hover:shadow-lg hover:shadow-amber-400/20 transition" 
                onClick={onProceed}
              >
                Proceed to Payment
              </button>
            </div>
          )}

          {step === 'payment' && (
            <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Wallet className="h-5 w-5 text-amber-400" /> Choose Payment Method
              </h2>
              
              <div className="space-y-3">
                <div 
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-4 ${paymentMethod === 'cod' ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 hover:border-white/30'}`}
                  onClick={() => setPaymentMethod('cod')}
                >
                  <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <Wallet className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Cash on Delivery</div>
                    <div className="text-sm text-slate-400">Pay when you receive the vehicle/room</div>
                  </div>
                  {paymentMethod === 'cod' && <CheckCircle className="ml-auto h-5 w-5 text-amber-400" />}
                </div>

                <div 
                  className={`p-4 rounded-xl border cursor-pointer transition flex items-center gap-4 ${paymentMethod === 'qr' ? 'border-amber-400 bg-amber-400/10' : 'border-white/10 hover:border-white/30'}`}
                  onClick={() => setPaymentMethod('qr')}
                >
                  <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <QrCode className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">QR Code Payment</div>
                    <div className="text-sm text-slate-400">Scan and pay instantly</div>
                  </div>
                  {paymentMethod === 'qr' && <CheckCircle className="ml-auto h-5 w-5 text-amber-400" />}
                </div>
              </div>

              {paymentMethod === 'qr' && (
                <div className="mt-6 text-center p-6 bg-white/10 rounded-xl border border-white/10">
                  <p className="text-amber-400 font-semibold text-lg">This service will be available soon...</p>
                </div>
              )}

              {error && <div className="mt-4 text-red-400 bg-red-400/10 p-3 rounded-lg">{error}</div>}

              <div className="flex gap-3 mt-6">
                <button className="flex-1 rounded-lg px-4 py-3 border border-white/10 hover:bg-white/5 font-semibold" onClick={() => setStep('dates')}>Back</button>
                <button 
                  className={`flex-[2] rounded-lg px-4 py-3 font-bold text-lg transition ${paymentMethod === 'qr' ? 'bg-slate-700 text-slate-400 cursor-not-allowed' : 'gold-gradient text-slate-900 hover:shadow-lg hover:shadow-amber-400/20'}`} 
                  onClick={onConfirm}
                  disabled={paymentMethod === 'qr'}
                >
                  Complete Booking
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10 sticky top-24">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <img src={item.images[0]} alt={item.title} className="w-full h-32 object-cover rounded-lg mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">{item.title}</span>
                <span>{formatINR(toINR(item.price_per_day))}/day</span>
              </div>
              {days > 0 && (
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span>{days} days</span>
                </div>
              )}
              <div className="h-px bg-white/10 my-2" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-amber-400">{formatINR(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
