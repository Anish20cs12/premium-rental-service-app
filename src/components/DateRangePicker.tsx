import type { DateRange } from 'react-day-picker'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/style.css'

type Props = {
  selected?: DateRange
  onSelect: (range?: DateRange) => void
}

export default function DateRangePicker({ selected, onSelect }: Props) {
  return (
    <div className="rounded-xl border border-white/10 p-2 bg-slate-800/50">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        styles={{ caption: { color: 'white' } }}
      />
    </div>
  )
}
