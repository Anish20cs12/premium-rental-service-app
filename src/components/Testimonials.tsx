import { motion } from 'framer-motion'

const items = [
  { name: 'Sahil', text: 'Smooth booking, stunning cars. Loved the experience.' },
  { name: 'Rohit', text: 'Rooms were top-notch and easy to reserve.' },
  { name: 'Abhishek', text: 'Bike rentals were seamless. Great UI!' },
]

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16">
      <h2 className="text-2xl font-bold mb-4">What users say</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {items.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="rounded-xl border border-white/10 p-4 bg-slate-800/50">
            <div className="font-semibold">{t.name}</div>
            <p className="text-slate-300 text-sm mt-1">{t.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
