const items = [
  '🦷 Scaling & Polishing',
  '✨ Teeth Whitening',
  '💫 Free Consultation',
  '🪥 Oral Hygiene Coaching',
  '🏠 Home Visits',
  '💝 Judgement-Free Care',
  '📍 Ijebu Ode & Ikorodu',
];

export default function Marquee() {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative py-5 bg-dental-green overflow-hidden select-none">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-dental-green to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-dental-green to-transparent z-10" />

      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="mx-8 text-sm font-medium text-white/80 tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
