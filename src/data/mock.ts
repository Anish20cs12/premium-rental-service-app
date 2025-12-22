import type { Product } from '../store/useStore'

export const mockProducts: Product[] = [
  {
    id: 'car-1',
    category: 'car',
    title: 'Ferrari 488 GTB',
    price_per_day: 1200,
    images: [
      'https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop',
    ],
    specs: { '0-60mph': '3.0s', Engine: '3.9L V8', Seats: 2 },
    rating: 4.9,
    location: 'Dubai Marina',
  },
  {
    id: 'bike-1',
    category: 'bike',
    title: 'Ducati Panigale V4',
    price_per_day: 450,
    images: [
      'https://images.unsplash.com/photo-1622185135505-2d79504399d9?q=80&w=1200&auto=format&fit=crop',
    ],
    specs: { 'Engine Capacity': '1103cc', Power: '214 hp' },
    rating: 4.8,
    location: 'Monaco',
  },
  {
    id: 'suite-1',
    category: 'suite',
    title: 'Oceanview Luxury Suite',
    price_per_day: 800,
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    ],
    specs: { View: 'Sea View', Size: '120 m²', Beds: 2 },
    rating: 4.7,
    location: 'Malibu',
  },
]
