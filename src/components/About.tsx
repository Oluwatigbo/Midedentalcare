import { CheckCircle } from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useInView } from '../hooks/useInView';

const NURSE_IMG = 'https://images.pexels.com/photos/16430835/pexels-photo-16430835.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800';

const features = [
  'Registered & trained dental nurse',
  'Sterile, single-use instruments',
  'Honest pricing — no surprise add-ons',
  'Free consultation, always',
];

export default function About() {
  const { ref: listRef, inView: listInView } = useInView<HTMLUListElement>({ threshold: 0.3 });

  return (
    <section id="about" className="relative py-20 md:py-28 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-dental-green/3 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <AnimatedSection animation="fade-right" duration={1000}>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-dental-green/10 img-zoom glow-green">
                <img
                  src={NURSE_IMG}
                  alt="Mide, registered dental nurse"
                  loading="lazy"
                  className="w-full h-[400px] md:h-[550px] object-cover"
                />
              </div>
              {/* Decorative elements - animated */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-dental-green-light rounded-2xl -z-10 animate-float-slow" />
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-dental-gold-light rounded-2xl -z-10 animate-float-reverse" />
              {/* Floating sparkle accents */}
              <div className="absolute top-8 -left-8 text-2xl animate-sparkle">✨</div>
              <div className="absolute -bottom-2 right-8 text-xl animate-float" style={{ animationDelay: '-3s' }}>🦷</div>
            </div>
          </AnimatedSection>

          {/* Text */}
          <div className="space-y-6">
            <AnimatedSection animation="fade-left" delay={100}>
              <p className="text-dental-green font-semibold text-sm uppercase tracking-wider">Meet Mide</p>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={200}>
              <h2 className="font-serif text-4xl md:text-5xl text-text-dark leading-tight">
                A registered dental nurse on a mission to make care feel like self-care.
              </h2>
            </AnimatedSection>

            <AnimatedSection animation="fade-left" delay={350}>
              <p className="text-text-muted text-lg leading-relaxed">
                I'm Mide — founder of Mide Dental Care. I trained as a registered dental nurse and now run a warm, modern practice across Ijebu Ode and Ikorodu. Whether you've been nervous about the dentist for years or you just want the brightest smile of your life, you're in good hands.
              </p>
            </AnimatedSection>

            <ul ref={listRef} className="space-y-3">
              {features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-text-dark"
                  style={{
                    opacity: listInView ? 1 : 0,
                    transform: listInView ? 'translateX(0)' : 'translateX(-30px)',
                    transition: `opacity 0.5s ${i * 120 + 500}ms cubic-bezier(0.22,1,0.36,1), transform 0.5s ${i * 120 + 500}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <CheckCircle
                    size={20}
                    className="text-dental-green shrink-0"
                    style={{
                      transform: listInView ? 'scale(1) rotate(0)' : 'scale(0) rotate(-90deg)',
                      transition: `transform 0.4s ${i * 120 + 600}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  />
                  <span className="text-sm font-medium">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
