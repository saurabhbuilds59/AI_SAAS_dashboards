import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import clsx from 'clsx'

const TIERS = [
  {
    name: 'Free',
    price: '$0',
    role: 'free',
    tagline: 'Try the workspace',
    features: ['50 AI credits / month', '3 active projects', 'Community support', '1 team seat'],
  },
  {
    name: 'Premium',
    price: '$29',
    role: 'premium',
    tagline: 'For builders shipping weekly',
    highlighted: true,
    features: ['2,000 AI credits / month', 'Unlimited projects', 'Priority support', '10 team seats', 'Export to CSV / PDF', 'API access'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    role: 'admin',
    tagline: 'For organizations at scale',
    features: ['Unlimited credits', 'Unlimited seats', 'SSO & audit logs', 'Dedicated support', 'Custom rate limits'],
  },
]

export default function Pricing() {
  return (
    <div className="container-page py-20">
      <div className="mx-auto mb-14 max-w-xl text-center">
        <p className="mb-2 font-mono text-xs uppercase tracking-wider text-signal">Pricing</p>
        <h1 className="font-display text-4xl font-semibold tracking-tight">Pay for what your team ships.</h1>
        <p className="mt-3 text-foam-muted">Every plan includes the full AI module. Higher tiers raise your credit ceiling and seats.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={clsx(
              'card p-8',
              tier.highlighted && 'border-signal ring-1 ring-signal',
            )}
          >
            {tier.highlighted && <span className="mb-3 inline-block rounded-full bg-signal/10 px-3 py-1 text-xs font-medium text-signal dark:text-signal-soft">Most popular</span>}
            <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
            <p className="mt-1 text-sm text-foam-muted">{tier.tagline}</p>
            <p className="mt-6 font-display text-4xl font-semibold">
              {tier.price}
              {tier.price !== 'Custom' && <span className="text-base font-normal text-foam-muted">/mo</span>}
            </p>
            <ul className="mt-6 space-y-3">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-pulse" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/register"
              className={clsx('mt-8 w-full', tier.highlighted ? 'btn-primary' : 'btn-secondary')}
            >
              {tier.price === 'Custom' ? 'Contact sales' : 'Start free'}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
