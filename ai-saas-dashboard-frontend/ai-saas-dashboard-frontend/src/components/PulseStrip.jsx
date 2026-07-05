// The pulse strip is Cortex's signature element: a row of ticks that read
// like a live waveform, used anywhere the product wants to say "something is
// actively happening" — on stat cards, the landing hero, and next to the
// chat assistant while it's responding.
const HEIGHTS = [0.4, 0.7, 1, 0.55, 0.85, 0.3, 0.9, 0.5, 0.65, 1, 0.45, 0.75]

export default function PulseStrip({ active = true, className = '', color = 'bg-signal' }) {
  return (
    <div className={`flex items-end gap-[3px] h-4 ${className}`} aria-hidden="true">
      {HEIGHTS.map((h, i) => (
        <span
          key={i}
          className={`w-[3px] rounded-full ${color} ${active ? 'animate-pulseBar' : ''}`}
          style={{ height: `${h * 100}%`, animationDelay: `${i * 0.08}s`, opacity: active ? undefined : 0.35 }}
        />
      ))}
    </div>
  )
}
