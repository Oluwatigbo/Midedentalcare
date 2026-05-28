import { Heart } from 'lucide-react';
import { useInView } from '../hooks/useInView';

export default function Footer() {
  const { ref, inView } = useInView<HTMLElement>({ threshold: 0.2 });

  return (
    <footer ref={ref} className="bg-text-dark text-white/60 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div
          className="grid md:grid-cols-3 gap-8 items-center"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3 group">
              <span className="text-xl transition-transform duration-300 group-hover:rotate-12">🦷</span>
              <span className="font-serif text-lg font-semibold text-white">
                Mide <span className="text-dental-green">Dental</span> Care
              </span>
            </div>
            <p className="text-sm">
              Registered Dental Nurse · Ijebu Ode &amp; Ikorodu
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-6 md:justify-center text-sm">
            {['Services', 'Pricing', 'About', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="underline-reveal hover:text-white transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm md:text-right">
            <p className="flex items-center gap-1 md:justify-end">
              Made with{' '}
              <Heart
                size={14}
                className="text-dental-green"
                style={{
                  animation: inView ? 'float 2s ease-in-out infinite' : 'none',
                }}
              />{' '}
              by Mide Dental Care
            </p>
            <p className="mt-1">© {new Date().getFullYear()} All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
