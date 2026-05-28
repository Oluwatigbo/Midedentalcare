import { Sparkles, Sun, Layers, MessageCircle, GraduationCap, Home } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useInView } from '../hooks/useInView';

const services = [
  {
    num: '01',
    price: 'from ₦10,000',
    title: 'Scaling & Polishing',
    desc: 'Remove tartar and surface stains for a fresh, glossy finish.',
    icon: Sparkles,
  },
  {
    num: '02',
    price: 'from ₦30,000',
    title: 'Teeth Whitening',
    desc: 'Safe, professional whitening that brightens by several shades.',
    icon: Sun,
  },
  {
    num: '03',
    price: 'from ₦40,000',
    title: 'Whitening + Scaling',
    desc: 'The full pamper — clean, polish and brighten in one visit.',
    icon: Layers,
  },
  {
    num: '04',
    price: 'Free',
    title: 'Consultation',
    desc: 'Honest assessment and personalised plan, with no pressure.',
    icon: MessageCircle,
  },
  {
    num: '05',
    price: 'Included',
    title: 'Oral Hygiene Coaching',
    desc: 'One-on-one guidance on brushing, flossing and aftercare.',
    icon: GraduationCap,
  },
  {
    num: '06',
    price: 'By request',
    title: 'Home Visits & DMs',
    desc: 'Send a DM on TikTok or WhatsApp — we reply personally.',
    icon: Home,
  },
];

export default function Services() {
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section id="services" className="relative py-20 md:py-28 overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-20 -right-40 w-80 h-80 rounded-full bg-dental-green/3 blur-3xl animate-float-slow" />
      <div className="absolute bottom-20 -left-40 w-60 h-60 rounded-full bg-dental-gold/5 blur-3xl animate-float-reverse" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <AnimatedSection animation="fade-up" className="max-w-2xl mb-16">
          <p className="text-dental-green font-semibold text-sm uppercase tracking-wider mb-3">Our Services</p>
          <h2 className="font-serif text-4xl md:text-5xl text-text-dark leading-tight mb-4">
            Gentle care for every part of your smile.
          </h2>
          <p className="text-text-muted text-lg leading-relaxed">
            Every appointment starts with a free check-up so you only pay for what you actually need.
          </p>
        </AnimatedSection>

        {/* Service Cards - staggered grid */}
        <div
          ref={gridRef}
          className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${gridInView ? 'in-view' : ''}`}
        >
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.num}
                className="group card-hover bg-white rounded-2xl p-7 border border-cream-dark/50 hover:border-dental-green/30 cursor-default"
                style={{ transitionDelay: gridInView ? `${i * 80}ms` : '0ms' }}
              >
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-bold text-text-light tracking-wider">{s.num}</span>
                  <span className="text-xs font-semibold text-dental-green bg-dental-green-light px-3 py-1 rounded-full transition-all duration-300 group-hover:bg-dental-green group-hover:text-white">
                    {s.price}
                  </span>
                </div>
                <div className="w-12 h-12 bg-dental-green-light rounded-xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:bg-dental-green group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-lg group-hover:shadow-dental-green/20">
                  <Icon size={22} className="text-dental-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-text-dark mb-2 transition-colors duration-300 group-hover:text-dental-green">{s.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{s.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
