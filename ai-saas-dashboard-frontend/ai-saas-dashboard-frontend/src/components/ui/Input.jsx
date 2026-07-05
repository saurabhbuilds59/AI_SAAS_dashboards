import clsx from 'clsx'

export default function Input({ label, error, id, className, ...props }) {
  const inputId = id || props.name
  return (
    <div className={className}>
      {label && <label htmlFor={inputId} className="label">{label}</label>}
      <input id={inputId} className={clsx('input', error && 'border-danger focus:border-danger focus:ring-danger')} {...props} />
      {error && <p className="mt-1.5 text-xs text-danger">{error}</p>}
    </div>
  )
}
