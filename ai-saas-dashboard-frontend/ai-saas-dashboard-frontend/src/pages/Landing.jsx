import { Link } from 'react-router-dom'
import { ArrowRight, FileText, Languages, Code2, MessageSquare, SpellCheck, FileSearch } from 'lucide-react'
import PulseStrip from '../components/PulseStrip'

const FEATURES = [
  { icon: FileText, title: 'Generate text', desc: 'Draft copy, docs, and emails from a single prompt.' },
  { icon: FileSearch, title: 'Summarize documents', desc: 'Turn long reports into the three lines that matter.' },
  { icon: Languages, title: 'Translate', desc: 'Ship copy in every market your team supports.' },
  { icon: SpellCheck, title: 'Grammar correction', desc: 'Catch what spellcheck misses, in your own voice.' },
  { icon: Code2, title: 'Code generation', desc: 'From function stub to working implementation.' },
  { icon: MessageSquare, title: 'Chat assistant', desc: 'A running conversation that remembers the project.' },
]

const LOG = [
  { who: 'Priya', action: 'generated release notes', time: '2s ago' },
  { who: 'Cortex', action: 'summarized 4 PDFs into 1 brief', time: '11s ago' },
  { who: 'Ben', action: 'translated onboarding flow → ES', time: '38s ago' },
]

export default function Landing() {
  return (
    <div>
      {/* Hero */}
      <section className="container-page pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="animate-fadeUp">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/10 dark:border-ink-line px-3 py-1.5 text-xs font-medium text-foam-muted">
              <PulseStrip className="h-3 w-8" />
              Live: 12,482 requests processed today
            </div>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">
              The AI workspace that shows its <span className="text-gradient">work</span>.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-foam-muted">
              Generate, summarize, translate, and ship code from one dashboard — with every prompt, response, and credit logged where your whole team can see it.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/register" className="btn-primary !px-6 !py-3 text-base">
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="btn-secondary !px-6 !py-3 text-base">
                See pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-foam-muted">No credit card required · 50 free AI credits</p>
          </div>

          <div className="animate-fadeUp card !bg-ink !border-ink-line p-6 text-foam" style={{ animationDelay: '0.1s' }}>
            <div className="mb-4 flex items-center justify-between">
              <span className="font-mono text-xs text-foam-muted">activity_feed.log</span>
              <PulseStrip className="h-3 w-10" />
            </div>
            <div className="space-y-3 font-mono text-xs">
              {LOG.map((item) => (
                <div key={item.action} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5">
                  <span><span className="text-pulse">{item.who}</span> {item.action}</span>
                  <span className="text-foam-muted">{item.time}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
              {[['Requests', '12,482'], ['Avg. latency', '840ms'], ['Uptime', '99.98%']].map(([label, value]) => (
                <div key={label}>
                  <p className="font-mono text-lg font-semibold">{value}</p>
                  <p className="text-xs text-foam-muted">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-page py-20">
        <div className="mb-12 max-w-xl">
          <p className="mb-2 font-mono text-xs uppercase tracking-wider text-signal">The AI module</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Seven tools, one credit meter.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 transition-transform hover:-translate-y-0.5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-signal/10 text-signal dark:text-signal-soft">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-base font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-foam-muted">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-page pb-24">
        <div className="card !bg-signal !border-signal p-10 text-center text-white md:p-16">
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">Give your team a shared AI workspace.</h2>
          <p className="mx-auto mt-3 max-w-md text-white/80">Every prompt logged, every credit accounted for, every project searchable.</p>
          <Link to="/register" className="btn mt-7 inline-flex bg-white !px-6 !py-3 text-base text-signal hover:bg-white/90">
            Create your workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
