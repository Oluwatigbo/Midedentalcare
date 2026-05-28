import { useState, type FormEvent } from 'react';
import {
  MessageCircle,
  ArrowRight,
  User,
  Phone,
  CalendarDays,
  Clock,
  MapPin,
  Sparkles,
  Send,
  CheckCircle,
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import { useInView } from '../hooks/useInView';
import FloatingParticles from './FloatingParticles';

const services = [
  'Scaling & Polishing (₦10,000)',
  'Teeth Whitening (₦30,000)',
  'Scaling, Polishing + Whitening (₦40,000)',
  'Consultation (Free)',
  'Oral Hygiene Coaching',
  'Home Visit',
];

const locations = ['Ijebu Ode', 'Ikorodu'];

const timeSlots = [
  '9:00 AM',
  '10:00 AM',
  '11:00 AM',
  '12:00 PM',
  '1:00 PM',
  '2:00 PM',
  '3:00 PM',
  '4:00 PM',
  '5:00 PM',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: '',
    location: '',
    date: '',
    time: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { ref: formRef, inView: formInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
  const { ref: infoRef, inView: infoInView } = useInView<HTMLDivElement>({ threshold: 0.15 });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const formattedDate = form.date
      ? new Date(form.date + 'T00:00:00').toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '';

    const lines = [
      `🦷 *New Appointment Request*`,
      ``,
      `👤 *Name:* ${form.name}`,
      `📞 *Phone:* ${form.phone}`,
      `✨ *Service:* ${form.service}`,
      `📍 *Location:* ${form.location}`,
      `📅 *Date:* ${formattedDate}`,
      `🕐 *Time:* ${form.time}`,
    ];

    if (form.notes.trim()) {
      lines.push(`📝 *Notes:* ${form.notes}`);
    }

    lines.push(``, `Sent from Mide Dental Care website`);

    const message = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/2349047293574?text=${message}`;

    setSubmitted(true);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  const resetForm = () => {
    setForm({ name: '', phone: '', service: '', location: '', date: '', time: '', notes: '' });
    setSubmitted(false);
  };

  /* shared input classes */
  const inputBase = (field: string) =>
    `w-full bg-white border rounded-xl px-4 py-3.5 text-sm text-text-dark placeholder:text-text-light focus:outline-none transition-all duration-300 ${
      focusedField === field
        ? 'border-dental-green ring-2 ring-dental-green/20 shadow-lg shadow-dental-green/5'
        : 'border-cream-dark/60'
    }`;
  const labelBase = 'flex items-center gap-2 text-sm font-medium text-text-dark mb-1.5';

  const formFields = [
    { id: 'name', delay: 0 },
    { id: 'phone', delay: 60 },
    { id: 'service', delay: 120 },
    { id: 'location', delay: 180 },
    { id: 'date', delay: 240 },
    { id: 'time', delay: 300 },
    { id: 'notes', delay: 360 },
  ];

  return (
    <section id="contact" className="relative py-20 md:py-28 overflow-hidden">
      {/* Background particles */}
      <FloatingParticles count={12} color="dental-green" />
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-dental-green/3 blur-3xl translate-x-1/3 -translate-y-1/3 animate-float-slow" />
      <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-dental-gold/5 blur-3xl -translate-x-1/3 translate-y-1/3 animate-float-reverse" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <AnimatedSection animation="blur-in" className="text-center mb-14">
          <p className="text-dental-green font-semibold text-sm uppercase tracking-wider mb-3">
            Book an appointment
          </p>
          <h2 className="font-serif text-5xl md:text-6xl text-text-dark leading-tight mb-4">
            Ready for your<br />sparkle moment?
          </h2>
          <p className="text-text-muted text-lg leading-relaxed max-w-xl mx-auto">
            Fill in the form below and we'll confirm your appointment on WhatsApp. Consultation is always free.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-5 gap-10 items-start">
          {/* ── Form column (3/5) ── */}
          <div
            ref={formRef}
            className="md:col-span-3 bg-white rounded-3xl p-8 md:p-10 shadow-xl shadow-dental-green/5 border border-cream-dark/30 transition-all duration-700"
            style={{
              opacity: formInView ? 1 : 0,
              transform: formInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
              transition: 'opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {submitted ? (
              /* ── Success state ── */
              <div className="flex flex-col items-center justify-center text-center py-12">
                <div
                  className="w-20 h-20 bg-dental-green-light rounded-full flex items-center justify-center mb-6"
                  style={{
                    animation: 'scale-bounce 0.6s cubic-bezier(0.22,1,0.36,1) forwards',
                  }}
                >
                  <CheckCircle size={40} className="text-dental-green" />
                </div>
                <h3
                  className="font-serif text-3xl text-text-dark mb-3"
                  style={{
                    opacity: 0,
                    animation: 'scale-bounce 0.5s 300ms forwards',
                  }}
                >
                  You're all set, {form.name.split(' ')[0]}!
                </h3>
                <p
                  className="text-text-muted max-w-md mb-8 leading-relaxed"
                  style={{
                    opacity: 0,
                    animation: 'scale-bounce 0.5s 500ms forwards',
                  }}
                >
                  Your appointment details have been sent to WhatsApp. If it didn't open automatically, tap the button below.
                </p>
                <div
                  className="flex flex-col sm:flex-row gap-4"
                  style={{
                    opacity: 0,
                    animation: 'scale-bounce 0.5s 700ms forwards',
                  }}
                >
                  <a
                    href="https://wa.me/2349047293574"
                    target="_blank"
                    rel="noreferrer"
                    className="magnetic-btn btn-shimmer relative inline-flex items-center gap-2 bg-dental-green text-white px-7 py-3.5 rounded-full font-medium hover:bg-dental-green-dark transition-colors"
                  >
                    <MessageCircle size={18} />
                    Open WhatsApp
                  </a>
                  <button
                    onClick={resetForm}
                    className="magnetic-btn inline-flex items-center gap-2 border-2 border-dental-green/20 text-dental-green px-7 py-3.5 rounded-full font-medium hover:bg-dental-green-light transition-colors"
                  >
                    Book another
                  </button>
                </div>
              </div>
            ) : (
              /* ── Form ── */
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1: Name + Phone */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div
                    style={{
                      opacity: formInView ? 1 : 0,
                      transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ${formFields[0].delay + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  >
                    <label className={labelBase}>
                      <User size={14} className="text-dental-green" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adaeze Okafor"
                      value={form.name}
                      onChange={(e) => update('name', e.target.value)}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={inputBase('name')}
                    />
                  </div>
                  <div
                    style={{
                      opacity: formInView ? 1 : 0,
                      transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ${formFields[1].delay + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  >
                    <label className={labelBase}>
                      <Phone size={14} className="text-dental-green" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 0812 345 6789"
                      value={form.phone}
                      onChange={(e) => update('phone', e.target.value)}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className={inputBase('phone')}
                    />
                  </div>
                </div>

                {/* Row 2: Service + Location */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div
                    style={{
                      opacity: formInView ? 1 : 0,
                      transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ${formFields[2].delay + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  >
                    <label className={labelBase}>
                      <Sparkles size={14} className="text-dental-green" />
                      Service
                    </label>
                    <select
                      required
                      value={form.service}
                      onChange={(e) => update('service', e.target.value)}
                      onFocus={() => setFocusedField('service')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase('service')} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select a service
                      </option>
                      {services.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div
                    style={{
                      opacity: formInView ? 1 : 0,
                      transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ${formFields[3].delay + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  >
                    <label className={labelBase}>
                      <MapPin size={14} className="text-dental-green" />
                      Preferred Location
                    </label>
                    <select
                      required
                      value={form.location}
                      onChange={(e) => update('location', e.target.value)}
                      onFocus={() => setFocusedField('location')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase('location')} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select a location
                      </option>
                      {locations.map((l) => (
                        <option key={l} value={l}>
                          {l}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 3: Date + Time */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div
                    style={{
                      opacity: formInView ? 1 : 0,
                      transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ${formFields[4].delay + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  >
                    <label className={labelBase}>
                      <CalendarDays size={14} className="text-dental-green" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      required
                      min={todayStr}
                      value={form.date}
                      onChange={(e) => update('date', e.target.value)}
                      onFocus={() => setFocusedField('date')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase('date')} cursor-pointer`}
                    />
                  </div>
                  <div
                    style={{
                      opacity: formInView ? 1 : 0,
                      transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                      transition: `all 0.5s ${formFields[5].delay + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  >
                    <label className={labelBase}>
                      <Clock size={14} className="text-dental-green" />
                      Preferred Time
                    </label>
                    <select
                      required
                      value={form.time}
                      onChange={(e) => update('time', e.target.value)}
                      onFocus={() => setFocusedField('time')}
                      onBlur={() => setFocusedField(null)}
                      className={`${inputBase('time')} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        Select a time
                      </option>
                      {timeSlots.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Row 4: Notes */}
                <div
                  style={{
                    opacity: formInView ? 1 : 0,
                    transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.5s ${formFields[6].delay + 200}ms cubic-bezier(0.22,1,0.36,1)`,
                  }}
                >
                  <label className={labelBase}>
                    📝 Additional Notes
                    <span className="text-text-light font-normal">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Any concerns, questions or special requests…"
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    onFocus={() => setFocusedField('notes')}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputBase('notes')} resize-none`}
                  />
                </div>

                {/* Submit */}
                <div
                  style={{
                    opacity: formInView ? 1 : 0,
                    transform: formInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'all 0.5s 800ms cubic-bezier(0.22,1,0.36,1)',
                  }}
                >
                  <button
                    type="submit"
                    className="magnetic-btn btn-shimmer relative w-full inline-flex items-center justify-center gap-3 bg-dental-green text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-dental-green-dark transition-colors shadow-lg shadow-dental-green/20 cursor-pointer"
                  >
                    <Send size={18} />
                    Book &amp; Send to WhatsApp
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* ── Info column (2/5) ── */}
          <div ref={infoRef} className="md:col-span-2 space-y-6">
            {/* Quick info card */}
            <div
              className="bg-dental-green rounded-3xl p-8 text-white space-y-6 glow-green"
              style={{
                opacity: infoInView ? 1 : 0,
                transform: infoInView ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.95)',
                transition: 'all 0.8s 100ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <h3 className="font-serif text-2xl">How it works</h3>
              <ol className="space-y-5 text-sm text-white/85">
                {[
                  'Fill the form with your details and preferred service.',
                  'Tap "Book & Send" — your details go straight to our WhatsApp.',
                  'We confirm your slot personally within a few hours.',
                ].map((step, i) => (
                  <li
                    key={i}
                    className="flex gap-3"
                    style={{
                      opacity: infoInView ? 1 : 0,
                      transform: infoInView ? 'translateX(0)' : 'translateX(20px)',
                      transition: `all 0.5s ${i * 120 + 300}ms cubic-bezier(0.22,1,0.36,1)`,
                    }}
                  >
                    <span className="shrink-0 w-7 h-7 bg-white/15 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Contact details card */}
            <div
              className="bg-white rounded-3xl p-8 border border-cream-dark/30 space-y-5 card-hover"
              style={{
                opacity: infoInView ? 1 : 0,
                transform: infoInView ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.95)',
                transition: 'all 0.8s 300ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <h3 className="font-serif text-xl text-text-dark">Prefer to reach out directly?</h3>
              <div className="space-y-4 text-sm text-text-muted">
                <div className="flex items-start gap-3 group cursor-default">
                  <MessageCircle size={18} className="text-dental-green shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-medium text-text-dark">WhatsApp</p>
                    <a
                      href="https://wa.me/2349047293574"
                      target="_blank"
                      rel="noreferrer"
                      className="text-dental-green hover:underline"
                    >
                      +234 904 729 3574
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 group cursor-default">
                  <MapPin size={18} className="text-dental-green shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-medium text-text-dark">Locations</p>
                    <p>Ijebu Ode &amp; Ikorodu, Lagos</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 group cursor-default">
                  <Clock size={18} className="text-dental-green shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <p className="font-medium text-text-dark">Hours</p>
                    <p>Mon – Sat · 9 AM – 5 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative teeth */}
            <div
              className="flex justify-center gap-3 text-3xl pt-2"
              style={{
                opacity: infoInView ? 0.25 : 0,
                transition: 'opacity 1s 600ms',
              }}
            >
              {['🦷', '✨', '🦷', '✨', '🦷'].map((e, i) => (
                <span
                  key={i}
                  className="inline-block"
                  style={{
                    animation: infoInView ? `float ${5 + i}s ease-in-out ${i * 0.4}s infinite` : 'none',
                  }}
                >
                  {e}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
