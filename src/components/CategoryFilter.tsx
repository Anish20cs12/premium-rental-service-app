import { useStore } from '../store/useStore'

type TabKey = 'all' | 'car' | 'bike' | 'suite'
const tabs: { key: TabKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'car', label: 'Exotic Cars' },
  { key: 'bike', label: 'Superbikes' },
  { key: 'suite', label: 'Luxury Suites' },
]

export default function CategoryFilter() {
  const { category, setCategory } = useStore()
  return (
    <div className="flex items-center gap-2 overflow-x-auto">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={
            'px-4 py-2 rounded-full border transition ' +
            (category === t.key
              ? 'border-amber-500 text-amber-400'
              : 'border-white/10 text-slate-300 hover:border-amber-500 hover:text-amber-400')
          }
          onClick={() => setCategory(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  )
}
