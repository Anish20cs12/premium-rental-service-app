import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?q=80&w=1920&auto=format&fit=crop"
          alt="Hero"
          className="h-[36rem] md:h-[40rem] w-full object-cover opacity-50"
          style={{ objectPosition: '50% 96%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/50" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-black tracking-tight">
          Premium Rental Service
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-3 text-slate-300 max-w-2xl">
          Browse cars, bikes, and rooms in one fast, beautiful interface.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-6 flex items-center gap-3">
          <Link to="/cars" className="rounded-lg px-4 py-2 border border-white/10 hover:border-amber-400">Explore Cars</Link>
          <Link to="/bikes" className="rounded-lg px-4 py-2 border border-white/10 hover:border-amber-400">Explore Bikes</Link>
          <Link to="/rooms" className="rounded-lg px-4 py-2 border border-white/10 hover:border-amber-400">Explore Rooms</Link>
        </motion.div>
      </div>
    </section>
  )
}
