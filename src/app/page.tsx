import Link from 'next/link';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';

const features = ['AI-powered planning', 'Project + task operating system', 'Calendar-ready content pipeline', 'Actionable productivity analytics'];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-950 via-background to-background">
      <MarketingNavbar />
      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <div className="mx-auto max-w-3xl rounded-3xl glass p-8">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-primary">CreatorFlow</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">Plan, publish, and perform with one premium creator workspace.</h1>
          <p className="mt-5 text-lg text-muted-foreground">A production-ready productivity platform for creators, freelancers, and small teams.</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href="/auth/signup" className="rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground">Start Free</Link>
            <Link href="/auth/login" className="rounded-full border border-border px-6 py-3 font-medium">Open Demo</Link>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-6 md:grid-cols-2">
        {features.map((feature) => (
          <article key={feature} className="rounded-2xl border border-border/60 bg-card/80 p-6 transition hover:-translate-y-1 hover:border-primary/40">
            <h3 className="text-xl font-semibold">{feature}</h3>
            <p className="mt-2 text-muted-foreground">Designed with modern SaaS polish, thoughtful UX, and scalable architecture.</p>
          </article>
        ))}
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="text-3xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {['Create projects', 'Execute tasks', 'Track insights'].map((step, i) => (
            <div key={step} className="rounded-2xl border border-border/60 bg-card p-6">
              <p className="text-sm text-primary">0{i + 1}</p>
              <h3 className="mt-2 text-xl font-medium">{step}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="text-3xl font-semibold">Testimonials</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {['CreatorFlow gave my studio a calm, consistent pipeline.', 'The dashboard helps our team hit weekly publishing goals.'].map((quote) => (
            <blockquote key={quote} className="rounded-2xl border border-border/60 bg-card p-6 text-muted-foreground">“{quote}”</blockquote>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <h2 className="text-3xl font-semibold">Pricing</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {['Starter', 'Pro', 'Studio'].map((tier, index) => (
            <div key={tier} className="rounded-2xl border border-border/60 bg-card p-6">
              <h3 className="text-xl font-semibold">{tier}</h3>
              <p className="mt-2 text-3xl font-bold">${index === 0 ? '0' : index === 1 ? '29' : '79'}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto mt-20 max-w-4xl px-6">
        <h2 className="text-3xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-border/60 bg-card p-4"><p className="font-medium">Does this support teams?</p><p className="text-muted-foreground">Yes, CreatorFlow is optimized for solo creators and collaborative teams.</p></div>
          <div className="rounded-xl border border-border/60 bg-card p-4"><p className="font-medium">Can I test with demo data?</p><p className="text-muted-foreground">Yes — run the seed script and log in with the demo account.</p></div>
        </div>
      </section>
      <MarketingFooter />
    </main>
  );
}
