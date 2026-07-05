import clsx from 'clsx'
import { Loader2 } from 'lucide-react'

const VARIANTS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn bg-danger text-white hover:bg-danger/90',
}

export default function Button({
  as: Component = 'button',
  variant = 'primary',
  loading = false,
  className,
  children,
  ...props
}) {
  return (
    <Component className={clsx(VARIANTS[variant], className)} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Component>
  )
}
