import { Heart, MapPin, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getImage, toggleFavorite, getFavorites, type Item } from '../services/storage'
import { formatUsdToInr } from '../lib/currency'

type Props = { item: Item; userId?: string }

export default function ItemCard({ item, userId }: Props) {
  const [fav, setFav] = useState(() => {
    if (!userId) return false
    return getFavorites(userId).has(item.id)
  })

  useEffect(() => {
    if (userId) {
      setFav(getFavorites(userId).has(item.id))
    } else {
      setFav(false)
    }
  }, [userId, item.id])

  const handleToggle = () => {
    if (!userId) return
    toggleFavorite(userId, item.id)
    setFav(!fav)
  }

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="relative">
        <img src={getImage(item.images)} alt={item.title} className="h-48 w-full object-cover" onError={(e) => ((e.currentTarget.src = getImage([])))} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <button
          aria-label="Favorite"
          className={`absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full border ${fav ? 'bg-amber-500 text-slate-900 border-amber-400' : 'bg-slate-900/70 text-white border-white/10'}`}
          onClick={handleToggle}
        >
          <Heart className="h-5 w-5" />
        </button>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-sm text-white">
          <Star className="h-4 w-4 text-amber-400" />
          <span>{item.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold truncate max-w-[70%]">{item.title}</h3>
          <span className="text-amber-400 font-semibold">{formatUsdToInr(item.price_per_day)}/day</span>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
          <MapPin className="h-3 w-3" />
          <span className="truncate">{item.location}</span>
        </div>
        <div className="mt-3">
          <Link to={`/details/${item.id}`} className="inline-block text-xs rounded-md px-3 py-1 border border-white/10 hover:border-amber-400 transition">View details</Link>
        </div>
      </div>
    </div>
  )
}
