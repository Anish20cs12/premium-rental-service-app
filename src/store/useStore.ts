import { create } from 'zustand'
import { differenceInCalendarDays } from 'date-fns'
import { toINR } from '../lib/currency'

export type Category = 'car' | 'bike' | 'suite'

export type Product = {
  id: string
  category: Category
  title: string
  price_per_day: number
  images: string[]
  specs: Record<string, string | number>
  rating: number
  location: string
}

export type Booking = {
  id: string
  user_id: string
  product_id: string
  start_date: Date
  end_date: Date
  total_price: number
  status: 'pending' | 'confirmed' | 'cancelled'
}

type DateRange = { from?: Date; to?: Date }

type Store = {
  products: Product[]
  category: Category | 'all'
  search: string
  dateRange: DateRange
  selected?: Product
  bookings: Booking[]
  setProducts: (p: Product[]) => void
  setCategory: (c: Store['category']) => void
  setSearch: (s: string) => void
  setDateRange: (dr: DateRange) => void
  selectProduct: (p?: Product) => void
  addBooking: (b: Omit<Booking, 'id' | 'total_price'>) => Booking
}

export const useStore = create<Store>((set, get) => ({
  products: [],
  category: 'all',
  search: '',
  dateRange: {},
  selected: undefined,
  bookings: [],
  setProducts: (p) => set({ products: p }),
  setCategory: (c) => set({ category: c }),
  setSearch: (s) => set({ search: s }),
  setDateRange: (dr) => set({ dateRange: dr }),
  selectProduct: (p) => set({ selected: p }),
  addBooking: (b) => {
    const days = b.start_date && b.end_date ? Math.max(1, differenceInCalendarDays(b.end_date, b.start_date)) : 1
    const product = get().products.find((p) => p.id === b.product_id)
    const total_price = toINR(product?.price_per_day ?? 0) * days
    const booking: Booking = {
      id: crypto.randomUUID(),
      total_price,
      ...b,
      status: b.status ?? 'pending',
    }
    set((s) => ({ bookings: [...s.bookings, booking] }))
    return booking
  },
}))
