import { ArrowRight, Tag } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useInView } from '../hooks/useInView';

const TOOLS_IMG = 'https://images.pexels.com/photos/6627660/pexels-photo-6627660.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800';

const prices = [
  { name: 'Scaling & Polishing (Teeth Cleaning)', old: '₦20,000', current: '₦10,000' },
  { name: 'Teeth Whitening', old: '₦40,000', current: '₦30,000' },
  { name: 'Scaling, Polishing + Whitening', old: '₦60,000', current: '₦40,000' },
  { name: 'Consultation', old: null, current: 'Free' },
];

export default function Pricing() {
  const { ref: listRef, inView: listInView } = useInView<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section id="pricing" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-dental-green/3 blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-dental-gold/5 blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <AnimatedSection animation="fade-right" duration={1000}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-dental-green/10 img-zoom glow-green group">
              <img
                src={TOOLS_IMG}
                alt="Dental tools on clean background"
                loading="lazy"
                className="w-full h-[400px] md:h-[550px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dental-green/30 to-transparent transition-opacity duration-500 group-hover:from-dental-green/40" />
            </div>
          </AnimatedSection>

          {/* Pricing Content */}
          <div className="space-y-8">
            <AnimatedSection animation="fade-left" delay={100}>
              <div className="inline-flex items-center gap-2 bg-dental-gold-light text-dental-gold px-4 py-2 rounded-full text-sm font-semibold">
                <Tag size={14} className="animate-float" />
                Limited Ileya Offer
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl text-text-dark leading-tight">
                Smile Fest pricing — valid through May 28.
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={300}>
              <p className="text-text-muted text-lg leading-relaxed">
                Our biggest discount of the season. Book your slot on WhatsApp and quote "Ileya Fest".
              </p>
            </AnimatedSection>

            {/* Price list */}
            <div ref={listRef} className="space-y-4">
              {prices.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-cream rounded-xl px-5 py-4 border border-cream-dark/30 transition-all duration-500 hover:shadow-md hover:border-dental-green/20 hover:-translate-x-1 cursor-default"
                  style={{
                    opacity: listInView ? 1 : 0,
                    transform: listInView ? 'translateX(0)' : 'translateX(40px)',
                    transition: `opacity 0.6s ${i * 100 + 400}ms cubic-bezier(0.22,1,0.36,1), transform 0.6s ${i * 100 + 400}ms cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, border-color 0.3s`,
                  }}
                >
                  <span className="text-sm font-medium text-text-dark">{p.name}</span>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    {p.old && (
                      <span className="text-sm text-text-light line-through">{p.old}</span>
                    )}
                    <span className="text-sm font-bold text-dental-green">{p.current}</span>
                  </div>
                </div>
              ))}
            </div>

            <AnimatedSection animation="fade-up" delay={800}>
              <a
                href="https://wa.me/2349047293574"
                target="_blank"
                rel="noreferrer"
                className="magnetic-btn btn-shimmer relative inline-flex items-center gap-2 bg-dental-green text-white px-7 py-3.5 rounded-full font-medium hover:bg-dental-green-dark transition-colors shadow-lg shadow-dental-green/20"
              >
                Claim your Ileya price
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
