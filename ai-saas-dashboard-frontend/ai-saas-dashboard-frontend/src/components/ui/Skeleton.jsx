import clsx from 'clsx'

export default function Skeleton({ className }) {
  return <div className={clsx('animate-pulse rounded-md bg-black/5 dark:bg-white/5', className)} />
}

export function SkeletonCard() {
  return (
    <div className="card p-5">
      <Skeleton className="h-3 w-24 mb-4" />
      <Skeleton className="h-7 w-20 mb-2" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 py-3">
      <Skeleton className="h-9 w-9 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
    </div>
  )
}
