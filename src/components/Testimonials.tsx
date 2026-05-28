import { Quote } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import FloatingParticles from './FloatingParticles';
import { useInView } from '../hooks/useInView';

const testimonials = [
  {
    text: 'My teeth have never felt this clean. Mide is gentle and so professional.',
    name: 'Adaeze',
    location: 'Ikorodu',
  },
  {
    text: 'Whitening + scaling for ₦40k? Best money I spent all Ileya season.',
    name: 'Tunde',
    location: 'Ijebu Ode',
  },
  {
    text: 'I used to dread the dentist. Now I actually look forward to my appointments.',
    name: 'Folake',
    location: 'Lagos',
  },
];

export default function Testimonials() {
  const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section className="relative py-20 md:py-28 bg-dental-green overflow-hidden">
      {/* Floating light particles */}
      <FloatingParticles count={15} color="white" />

      {/* Large decorative shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 animate-float-slow" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/3 translate-x-1/3 translate-y-1/3 animate-float-reverse" />

      <div className="relative max-w-7xl mx-auto px-6">
        <AnimatedSection animation="blur-in" className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
            Loved by our TikTok family.
          </h2>
        </AnimatedSection>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="card-hover bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 cursor-default"
              style={{
                opacity: gridInView ? 1 : 0,
                transform: gridInView
                  ? 'translateY(0) scale(1)'
                  : `translateY(50px) scale(0.92)`,
                transition: `opacity 0.7s ${i * 150}ms cubic-bezier(0.22,1,0.36,1), transform 0.7s ${i * 150}ms cubic-bezier(0.22,1,0.36,1)`,
              }}
            >
              <Quote
                size={28}
                className="text-dental-gold mb-4"
                style={{
                  transform: gridInView ? 'rotate(0)' : 'rotate(-20deg)',
                  transition: `transform 0.5s ${i * 150 + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                }}
              />
              <blockquote className="text-white text-lg leading-relaxed mb-6 font-light">
                "{t.text}"
              </blockquote>
              <figcaption className="text-white/70 text-sm font-medium">
                — {t.name}, {t.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
