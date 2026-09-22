import { useEffect, useMemo, useState } from 'react';
import certificates, { CERT_CATEGORIES } from '../data/certificates';

const CertThumb = ({ cert, onOpen }) => {
  const [errored, setErrored] = useState(false);

  return (
    <button
      onClick={() => !errored && onOpen(cert)}
      className="group relative aspect-[4/3] rounded-xl border border-white/10 bg-[#141414] overflow-hidden text-left hover:border-red-600/60 transition-colors duration-300"
    >
      {!errored ? (
        <img
          src={cert.file}
          alt={cert.title}
          loading="lazy"
          onError={() => setErrored(true)}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4 text-center">
          <svg className="w-8 h-8 text-white/20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Awaiting Upload</span>
        </div>
      )}

      {cert.type && (
        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/70 backdrop-blur border border-white/15 text-[9px] font-mono uppercase tracking-wider text-white/80">
          {cert.type}
        </span>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent flex flex-col justify-end p-3">
        <p className="text-xs font-bold text-white leading-tight">{cert.title}</p>
        <p className="text-[10px] font-mono text-white/50 tracking-wide mt-0.5">{cert.issuer}</p>
      </div>
    </button>
  );
};

// Mounted only while open, so its state (filter, lightbox) resets automatically each time
const CertificatesGallery = ({ onClose }) => {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('All');

  const visible = useMemo(
    () => (filter === 'All' ? certificates : certificates.filter((c) => c.category === filter)),
    [filter]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (active) setActive(null);
        else onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, onClose]);

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 md:p-8 cursor-auto">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose}></div>

      {/* Gallery Panel */}
      <div className="relative z-10 w-full max-w-5xl max-h-[85vh] overflow-y-auto bg-[#0b0b0b] border border-white/10 rounded-3xl p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.9)]">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/10 border border-red-600/30 text-[11px] font-mono uppercase tracking-widest text-red-500">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
              EPISODE 05 // CERTIFIED
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight">
              Certifications{' '}
              <span className="text-white/30 text-lg font-mono font-normal">({certificates.length})</span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 shrink-0 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-red-600 hover:bg-red-600/10 transition-colors"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-2 -mx-1 px-1" role="tablist" aria-label="Certificate categories">
          {CERT_CATEGORIES.map((cat) => {
            const count = cat === 'All' ? certificates.length : certificates.filter((c) => c.category === cat).length;
            const on = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={on}
                onClick={() => setFilter(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full border text-[11px] font-mono tracking-wide transition-colors ${
                  on
                    ? 'bg-red-600 border-red-600 text-white shadow-[0_0_18px_rgba(229,9,20,0.45)]'
                    : 'border-white/15 text-white/60 hover:border-red-600/60 hover:text-white'
                }`}
              >
                {cat} <span className={on ? 'text-white/80' : 'text-white/30'}>{count}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {visible.map((cert) => (
            <CertThumb key={cert.file} cert={cert} onOpen={setActive} />
          ))}
        </div>
      </div>

      {/* Lightbox for a single certificate */}
      {active && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/95"
          onClick={() => setActive(null)}
        >
          <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={active.file}
              alt={active.title}
              className="w-full h-auto max-h-[75vh] object-contain rounded-xl border border-white/10"
            />
            <div className="flex items-center justify-between gap-4 mt-4">
              <div className="min-w-0">
                <p className="text-white font-bold">{active.title}</p>
                <p className="text-white/50 text-xs font-mono tracking-wide">
                  {active.issuer}
                  {active.date ? ` · ${active.date}` : ''}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {active.pdf && (
                  <a
                    href={active.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-red-600 text-white text-xs font-mono uppercase tracking-widest hover:bg-red-500 transition-colors"
                  >
                    Open PDF
                  </a>
                )}
                <button
                  onClick={() => setActive(null)}
                  className="px-4 py-2 rounded border border-white/20 text-white text-xs font-mono uppercase tracking-widest hover:border-red-600 hover:bg-red-600/10 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const CertificatesModal = ({ isOpen, onClose }) =>
  isOpen ? <CertificatesGallery onClose={onClose} /> : null;

export default CertificatesModal;
