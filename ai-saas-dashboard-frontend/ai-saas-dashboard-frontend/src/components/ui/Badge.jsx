import clsx from 'clsx'

const TONES = {
  neutral: 'bg-black/5 dark:bg-white/5 text-foam-muted',
  signal: 'bg-signal/10 text-signal dark:text-signal-soft',
  pulse: 'bg-pulse/10 text-pulse',
  amber: 'bg-amber/10 text-amber',
  danger: 'bg-danger/10 text-danger',
}

export default function Badge({ tone = 'neutral', className, children }) {
  return (
    <span className={clsx('inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium', TONES[tone], className)}>
      {children}
    </span>
  )
}
