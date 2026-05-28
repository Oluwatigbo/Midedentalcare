import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // entrance animation
    setTimeout(() => setVisible(true), 200);

    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream/90 backdrop-blur-xl shadow-lg shadow-dental-green/5 py-3'
          : 'bg-transparent py-5'
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1), background-color 0.5s, padding 0.5s, box-shadow 0.5s',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">🦷</span>
          <span className="font-serif text-xl font-semibold text-text-dark">
            Mide <span className="text-dental-green">Dental</span> Care
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-text-muted">
          {['Services', 'Pricing', 'About', 'Contact'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="underline-reveal hover:text-dental-green transition-colors duration-300"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(-10px)',
                transition: `opacity 0.5s ${300 + i * 80}ms, transform 0.5s ${300 + i * 80}ms, color 0.3s`,
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://wa.me/2349047293574"
            target="_blank"
            rel="noreferrer"
            className="magnetic-btn btn-shimmer bg-dental-green text-white px-5 py-2.5 rounded-full hover:bg-dental-green-dark transition-colors relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'opacity 0.5s 620ms, transform 0.5s 620ms',
            }}
          >
            Book Now
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-text-dark transition-transform duration-300 active:scale-90"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-6">
            <Menu
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                open ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
              }`}
            />
            <X
              size={24}
              className={`absolute inset-0 transition-all duration-300 ${
                open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile nav - slide down */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="bg-cream/95 backdrop-blur-xl border-t border-cream-dark/30 px-6 py-6 flex flex-col gap-1">
          {['Services', 'Pricing', 'About', 'Contact'].map((item, i) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="text-text-dark font-medium py-3 px-4 rounded-xl hover:bg-dental-green-light hover:text-dental-green transition-all duration-300"
              style={{
                transform: open ? 'translateX(0)' : 'translateX(-20px)',
                opacity: open ? 1 : 0,
                transition: `transform 0.4s ${i * 60}ms, opacity 0.4s ${i * 60}ms, background-color 0.3s, color 0.3s`,
              }}
            >
              {item}
            </a>
          ))}
          <a
            href="https://wa.me/2349047293574"
            target="_blank"
            rel="noreferrer"
            className="mt-2 bg-dental-green text-white px-5 py-3 rounded-full text-center font-medium magnetic-btn btn-shimmer relative"
            style={{
              transform: open ? 'translateX(0)' : 'translateX(-20px)',
              opacity: open ? 1 : 0,
              transition: 'transform 0.4s 240ms, opacity 0.4s 240ms',
            }}
          >
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
}
