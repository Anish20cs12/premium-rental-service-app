import { Heart, MapPin, Star } from 'lucide-react'
import type { Product } from '../store/useStore'
import { formatUsdToInr } from '../lib/currency'

type Props = { product: Product; onClick?: () => void }

export default function ProductCard({ product, onClick }: Props) {
  return (
    <div className="glass-card rounded-2xl overflow-hidden hover:scale-[1.01] transition cursor-pointer" onClick={onClick}>
      <div className="relative">
        <img src={product.images[0]} alt={product.title} className="h-56 w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/70 border border-white/10">
          <Heart className="h-5 w-5 text-amber-400" />
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm text-white/90">
          <Star className="h-4 w-4 text-amber-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <span className="text-amber-400 font-semibold">{formatUsdToInr(product.price_per_day)}/day</span>
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
          <MapPin className="h-4 w-4" />
          <span>{product.location}</span>
        </div>
      </div>
    </div>
  )
}
