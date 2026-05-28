import { useEffect, useState } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

import FloatingParticles from './FloatingParticles';

const HERO_IMG = 'https://images.pexels.com/photos/3762441/pexels-photo-3762441.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800';

function StatCounter({ display, label, inView, delay }: {
  display: string; label: string; inView: boolean; delay: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (inView) {
      const t = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(t);
    }
  }, [inView, delay]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
        transition: 'opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1)',
      }}
    >
      <p className="text-3xl font-bold text-text-dark tabular-nums">{display}</p>
      <p className="text-sm text-text-muted">{label}</p>
    </div>
  );
}

export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const { ref: statsRef, inView: statsInView } = useInView({ threshold: 0.3 });

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section id="top" className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animate-gradient bg-gradient-to-br from-cream via-dental-green-light/20 to-dental-gold-light/30 opacity-60" />

      {/* Floating particles */}
      <FloatingParticles count={20} color="dental-green" />
      <FloatingParticles count={8} color="dental-gold" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Column */}
          <div className="space-y-8">
            {/* Location tag */}
            <div
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s 200ms cubic-bezier(0.22,1,0.36,1)',
              }}
              className="flex items-center gap-2 text-sm text-text-muted"
            >
              <MapPin size={14} className="text-dental-green" />
              <span>Registered Dental Nurse · Ijebu Ode &amp; Ikorodu</span>
            </div>

            {/* Headline - word-by-word reveal */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-tight text-text-dark">
              {['Let', 'your', 'smile'].map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(30deg)',
                    transition: `all 0.8s ${400 + i * 100}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  {word}
                </span>
              ))}
              <span
                className="inline-block relative text-dental-green"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(30deg)',
                  transition: 'all 0.8s 700ms cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                sparkle
                <Sparkles
                  size={22}
                  className="absolute -top-3 -right-7 text-dental-gold animate-sparkle"
                />
              </span>
              <br />
              {['—', 'gently,', 'brilliantly.'].map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.3em]"
                  style={{
                    opacity: loaded ? 1 : 0,
                    transform: loaded ? 'translateY(0) rotateX(0)' : 'translateY(40px) rotateX(30deg)',
                    transition: `all 0.8s ${800 + i * 100}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg text-text-muted max-w-lg leading-relaxed"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s 1000ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              Scaling, polishing, teeth whitening and warm, judgement-free dental pampering. Book a consultation — it's on the house.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex gap-10">
              <StatCounter display="20.9K" label="Smiles loved" inView={statsInView} delay={0} />
              <StatCounter display="2K+" label="TikTok family" inView={statsInView} delay={100} />
              <StatCounter display="100%" label="Free consults" inView={statsInView} delay={200} />
            </div>

            {/* CTA buttons */}
            <div
              className="flex flex-wrap gap-4"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s 1200ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <a
                href="https://wa.me/2349047293574"
                target="_blank"
                rel="noreferrer"
                className="magnetic-btn btn-shimmer relative bg-dental-green text-white px-7 py-3.5 rounded-full font-medium hover:bg-dental-green-dark transition-colors shadow-lg shadow-dental-green/20"
              >
                Book Free Consultation
              </a>
              <a
                href="#services"
                className="magnetic-btn border-2 border-dental-green/20 text-dental-green px-7 py-3.5 rounded-full font-medium hover:bg-dental-green-light transition-colors"
              >
                Our Services
              </a>
            </div>
          </div>

          {/* Image Column */}
          <div
            className="relative"
            style={{
              opacity: loaded ? 1 : 0,
              transform: loaded ? 'translateX(0) scale(1)' : 'translateX(60px) scale(0.92)',
              transition: 'all 1.2s 500ms cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-dental-green/10 img-zoom glow-green">
              <img
                src={HERO_IMG}
                alt="Bright confident smile after dental care"
                className="w-full h-[500px] md:h-[600px] object-cover"
              />
              {/* Overlay badge */}
              <div
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg"
                style={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.9)',
                  transition: 'all 0.7s 1400ms cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <p className="text-xs text-dental-green font-semibold uppercase tracking-wider">Today's pamper</p>
                <p className="text-sm font-bold text-text-dark">Scaling &amp; Polishing — ₦10,000</p>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="absolute -top-4 -right-4 md:top-6 md:-right-6 bg-dental-gold text-white rounded-2xl px-5 py-3 shadow-lg animate-float-slow"
              style={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? undefined : 'scale(0) rotate(-20deg)',
                transition: 'opacity 0.6s 1600ms, transform 0.6s 1600ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <p className="font-serif font-bold text-lg leading-tight">Ileya</p>
              <p className="text-xs font-medium">Smile Fest</p>
            </div>

            {/* Decorative circles */}
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full border-2 border-dental-green/10 animate-float-reverse" />
            <div className="absolute -top-12 -left-12 w-24 h-24 rounded-full bg-dental-gold/5 animate-float-slow" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          opacity: loaded ? 0.5 : 0,
          transition: 'opacity 1s 2000ms',
        }}
      >
        <span className="text-xs text-text-muted tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border-2 border-text-light/30 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-dental-green rounded-full animate-float" />
        </div>
      </div>
    </section>
  );
}
