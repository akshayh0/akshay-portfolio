import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// Shown on the intro screen (the last "H" is highlighted in red)
const NAME = 'AKSHAY H';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&@<>/*+';
// Anton: tall, condensed, cinematic movie-title lettering
const FONT_STACK = "'Anton', 'Bebas Neue', 'Impact', 'Arial Narrow', sans-serif";

// "Welcome" in different languages. They melt into each other like liquid, Kannada first.
// Edit / reorder / add more here. { text, lang (label under the word), code (HTML lang), font (for preloading) }
const WELCOMES = [
  { text: 'ಸ್ವಾಗತ', lang: 'Kannada', code: 'kn', font: 'Noto Sans Kannada' },
  { text: 'நல்வரவு', lang: 'Tamil', code: 'ta', font: 'Noto Sans Tamil' },
  { text: 'స్వాగతం', lang: 'Telugu', code: 'te', font: 'Noto Sans Telugu' },
  { text: 'स्वागत है', lang: 'Hindi', code: 'hi', font: 'Noto Sans Devanagari' },
  { text: 'സ്വാഗതം', lang: 'Malayalam', code: 'ml', font: 'Noto Sans Malayalam' },
  { text: 'স্বাগতম', lang: 'Bengali', code: 'bn', font: 'Noto Sans Bengali' },
  { text: 'Welcome', lang: 'English', code: 'en', font: null },
];
const EMPTY = { text: '', lang: '', code: 'en' };
const WELCOME_FONT_STACK =
  "'Noto Sans Kannada', 'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Devanagari', 'Noto Sans Malayalam', 'Noto Sans Bengali', system-ui, sans-serif";

// Timing (seconds)
const LANG_START = 0.5; // when the first language starts melting in
const MORPH = 0.36; // one liquid morph between two languages
const HOLD = 0.2; // how long each language stays readable
const LAST_HOLD = 0.35; // extra pause on the last language before it drips into the button

const RED = '#E50914';

const NetflixPreloader = ({ onEntering, onComplete }) => {
  const rootRef = useRef(null);
  const btnRef = useRef(null);
  const nameRef = useRef(null);
  const enterRef = useRef(null);
  const ringRef = useRef(null);
  const arrowRef = useRef(null);
  const hintRef = useRef(null);
  const barRef = useRef(null);
  const barWrapRef = useRef(null);
  const scanRef = useRef(null);
  const statusRef = useRef(null);
  const wordARef = useRef(null);
  const wordBRef = useRef(null);
  const gooRef = useRef(null);
  const langRef = useRef(null);
  const dropRef = useRef(null);
  const liquidRef = useRef(null);
  const waveRef = useRef(null);

  const [ready, setReady] = useState(false);
  const exitingRef = useRef(false);

  // --- Intro ---
  // name decodes -> becomes an empty ENTER pill -> "Welcome" melts through every language at the top
  // -> after the last language a red drop falls into the pill and liquid fills it completely -> ready.
  useEffect(() => {
    let cancelled = false;
    let ctx;

    // Wait for the display fonts so measurements are correct (but never hang if offline)
    const fontReady = Promise.race([
      Promise.all([
        document.fonts.load("100px 'Anton'").catch(() => {}),
        ...WELCOMES.filter((w) => w.font).map((w) =>
          document.fonts.load(`600 40px '${w.font}'`, w.text).catch(() => {})
        ),
      ]),
      new Promise((res) => setTimeout(res, 1500)),
    ]);

    fontReady.then(() => {
      if (cancelled || !rootRef.current) return;

      ctx = gsap.context(() => {
        const btn = btnRef.current;
        const nameEl = nameRef.current;
        const letters = Array.from(nameEl.querySelectorAll('.p-letter'));

        // Reset letters (safe for React StrictMode double-run) and lock each to its final width
        // so the scramble never makes the name jitter sideways.
        letters.forEach((el) => {
          el.textContent = el.dataset.char === ' ' ? '\u00A0' : el.dataset.char;
          el.style.width = '';
        });
        letters.forEach((el) => {
          const w = el.getBoundingClientRect().width;
          el.style.width = `${w}px`;
        });

        gsap.set(btn, {
          borderColor: 'rgba(229,9,20,0)',
          boxShadow: '0 0 0 rgba(229,9,20,0)',
          borderRadius: 0,
        });
        gsap.set(enterRef.current, { opacity: 0 });
        gsap.set(ringRef.current, { opacity: 0 });
        gsap.set(letters, { opacity: 0 });
        gsap.set(scanRef.current, { scaleX: 0, opacity: 1 });
        gsap.set(barRef.current, { scaleX: 0 });
        gsap.set(dropRef.current, { opacity: 0, xPercent: -50, yPercent: -50 });
        // liquid starts just below the pill (the +24px hides the wave crest too)
        gsap.set(liquidRef.current, { y: 24, yPercent: 0 });

        // Endless gentle wave on the liquid surface
        gsap.to(waveRef.current, { xPercent: -50, duration: 1.4, repeat: -1, ease: 'none' });

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // ---------- Liquid "Welcome" morph (two overlapping words + SVG goo threshold) ----------
        const A = wordARef.current;
        const B = wordBRef.current;
        const langEl = langRef.current;
        const applyMorph = (f) => {
          const fa = 1 - f;
          B.style.filter = `blur(${Math.min(8 / Math.max(f, 0.0001) - 8, 100)}px)`;
          B.style.opacity = `${Math.pow(f, 0.4) * 100}%`;
          A.style.filter = `blur(${Math.min(8 / Math.max(fa, 0.0001) - 8, 100)}px)`;
          A.style.opacity = `${Math.pow(fa, 0.4) * 100}%`;
        };
        applyMorph(0);

        let prev = EMPTY;
        // Appends: [set texts] -> [liquid morph prev -> next] -> [hold] onto any timeline
        const stepInto = (target, next, hold) => {
          const m = { f: 0 };
          const from = prev;
          target
            .call(() => {
              A.textContent = from.text;
              A.lang = from.code;
              B.textContent = next.text;
              B.lang = next.code;
              langEl.textContent = next.lang;
              gsap.fromTo(langEl, { opacity: 0, y: 6 }, { opacity: next.lang ? 1 : 0, y: 0, duration: 0.3, overwrite: true });
              applyMorph(0);
            })
            .to(m, { f: 1, duration: MORPH, ease: 'power1.inOut', onUpdate: () => applyMorph(m.f) })
            .to({}, { duration: hold });
          prev = next;
        };

        const wtl = gsap.timeline();
        WELCOMES.forEach((w, i) => stepInto(wtl, w, i === WELCOMES.length - 1 ? HOLD + LAST_HOLD : HOLD));

        // ---------- Master timeline ----------
        const tl = gsap.timeline();
        if (reduceMotion) tl.timeScale(8);
        const progress = { v: 0 };

        tl.set(rootRef.current, { autoAlpha: 1 })
          // 1. A thin red light-slit stretches across the screen
          .to(scanRef.current, { scaleX: 1, duration: 0.6, ease: 'expo.out' })
          // 2. Letters flip up in 3D from the centre outwards
          .fromTo(
            letters,
            { rotationX: -100, y: 40, opacity: 0, transformOrigin: '50% 100%' },
            {
              rotationX: 0,
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'back.out(1.8)',
              stagger: { each: 0.08, from: 'center' },
            },
            '-=0.25'
          )
          // 3. Each letter "decodes": cycles random glyphs, then locks onto its real character
          .addLabel('decode', '<');

        letters.forEach((el, i) => {
          const final = el.dataset.char;
          if (final === ' ') return;
          const st = { p: 0, last: -1 };
          tl.to(
            st,
            {
              p: 1,
              duration: 0.85,
              ease: 'none',
              onUpdate: () => {
                const step = Math.floor(st.p * 14);
                if (step === st.last) return;
                st.last = step;
                el.textContent = st.p >= 0.98 ? final : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
              },
              onComplete: () => {
                el.textContent = final;
              },
            },
            `decode+=${0.1 + i * 0.09}`
          );
        });

        tl
          // 4. Glitch flash: RGB split snaps together, letters pulse
          .addLabel('lock')
          .fromTo(
            nameEl,
            { textShadow: '7px 0 rgba(0,255,255,0.75), -7px 0 rgba(229,9,20,0.95)', x: -4 },
            {
              textShadow: '0 0 0 rgba(0,255,255,0), 0 0 0 rgba(229,9,20,0)',
              x: 0,
              duration: 0.35,
              ease: 'steps(5)',
              clearProps: 'textShadow',
            },
            'lock'
          )
          .fromTo(nameEl, { scale: 1.04 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' }, 'lock')
          .to(scanRef.current, { opacity: 0, duration: 0.3 }, 'lock')
          .to({}, { duration: 0.35 })
          // 5. Lock the button to the name's size, then pull the name out of flow
          .add(() => {
            const r = btn.getBoundingClientRect();
            gsap.set(btn, { width: r.width, height: r.height });
            gsap.set(nameEl, { position: 'absolute', left: '50%', top: '50%', xPercent: -50, yPercent: -50 });
          })
          .addLabel('morph')
          // 6. The name collapses into an EMPTY outlined pill (it gets filled at the very end)
          .to(nameEl, { scale: 0.18, opacity: 0, letterSpacing: '0.4em', duration: 0.75, ease: 'power4.inOut' }, 'morph')
          .to(
            btn,
            {
              width: Math.min(270, window.innerWidth - 48),
              height: 66,
              borderRadius: 999,
              borderColor: 'rgba(229,9,20,1)',
              boxShadow: '0 0 30px rgba(229,9,20,0.35)',
              duration: 0.75,
              ease: 'power4.inOut',
            },
            'morph'
          )
          // dim "ENTER" so it reads as a button that is still charging
          .fromTo(
            enterRef.current,
            { opacity: 0, scale: 0.6, letterSpacing: '0.7em' },
            { opacity: 0.3, scale: 1, letterSpacing: '0.3em', duration: 0.55, ease: 'back.out(2)' },
            'morph+=0.5'
          );

        // 7. Languages melt into each other at the top (runs alongside the name intro)
        tl.add(wtl, LANG_START);

        // Progress bar + percentage follow the languages
        tl.to(
          progress,
          {
            v: 100,
            duration: wtl.duration(),
            ease: 'none',
            onUpdate: () => {
              if (statusRef.current)
                statusRef.current.textContent = `Initialising  ${String(Math.round(progress.v)).padStart(3, '0')}%`;
            },
          },
          LANG_START
        ).to(barRef.current, { scaleX: 1, duration: wtl.duration(), ease: 'none' }, LANG_START);

        // 8. ALL languages done -> last word melts away and becomes a red drop
        tl.addLabel('melt');
        stepInto(tl, EMPTY, 0);
        tl.add(() => {
          const rr = rootRef.current.getBoundingClientRect();
          const wr = gooRef.current.getBoundingClientRect();
          gsap.set(dropRef.current, {
            x: 0,
            y: wr.top - rr.top + wr.height / 2,
            scale: 0,
            scaleX: 1,
            scaleY: 1,
            opacity: 1,
          });
        }, 'melt')
          .to(dropRef.current, { scale: 1, duration: 0.25, ease: 'back.out(3)' }, 'melt+=0.05')
          // ...and falls into the button
          .to(
            dropRef.current,
            {
              y: () => {
                const rr = rootRef.current.getBoundingClientRect();
                const br = btn.getBoundingClientRect();
                return br.top - rr.top + 8;
              },
              scaleX: 0.7,
              scaleY: 1.8,
              duration: 0.42,
              ease: 'power2.in',
            },
            'melt+=0.3'
          )
          .addLabel('impact')
          // 9. Splash -> the pill FILLS COMPLETELY with liquid
          .to(dropRef.current, { opacity: 0, scale: 0, duration: 0.12 }, 'impact')
          .fromTo(
            btn,
            { scaleX: 1.06, scaleY: 0.9 },
            { scaleX: 1, scaleY: 1, duration: 0.7, ease: 'elastic.out(1, 0.45)' },
            'impact'
          )
          .to(liquidRef.current, { y: 0, yPercent: -100, duration: 1.1, ease: 'power2.inOut' }, 'impact+=0.05')
          .to(btn, { boxShadow: '0 0 55px rgba(229,9,20,0.7)', duration: 1.1 }, 'impact+=0.05')
          .to(enterRef.current, { opacity: 1, duration: 0.4 }, 'impact+=0.6')
          .to(barWrapRef.current, { opacity: 0, duration: 0.3 }, 'impact')
          .add(() => {
            if (statusRef.current) statusRef.current.textContent = 'Click to open the portfolio';
            setReady(true);
          })
          .fromTo(hintRef.current, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4 }, '<');

        // Hint text (bar + %) is visible during the loading phase too
        gsap.set(hintRef.current, { opacity: 1, y: 0 });
      }, rootRef);
    });

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  // Once live: pulse ring + nudging arrow, and focus so Enter/Space works
  useEffect(() => {
    if (!ready) return;
    if (btnRef.current) btnRef.current.focus({ preventScroll: true });

    const idle = gsap.context(() => {
      gsap.fromTo(
        ringRef.current,
        { scale: 1, opacity: 0.7 },
        { scale: 1.35, opacity: 0, duration: 1.5, repeat: -1, ease: 'power2.out' }
      );
      gsap.to(arrowRef.current, { x: 5, duration: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, rootRef);
    return () => idle.revert();
  }, [ready]);

  // --- Click: play exit, then open the portfolio ---
  const handleEnter = () => {
    if (!ready || exitingRef.current) return;
    exitingRef.current = true;

    if (onEntering) onEntering();

    gsap
      .timeline({
        onComplete: () => {
          window.scrollTo(0, 0);
          if (onComplete) onComplete();
        },
      })
      .to(hintRef.current, { opacity: 0, duration: 0.2 })
      .to(btnRef.current, { scale: 14, opacity: 0, duration: 0.7, ease: 'power3.in' }, '<')
      .to(rootRef.current, { opacity: 0, duration: 0.45, ease: 'power2.inOut' }, '-=0.3');
  };

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex items-center justify-center select-none overflow-hidden"
    >
      {/* SVG "goo" threshold filter: makes the two overlapping words melt into each other like liquid */}
      <svg aria-hidden="true" className="absolute w-0 h-0" focusable="false">
        <defs>
          <filter id="p-goo" colorInterpolationFilters="sRGB">
            <feColorMatrix
              in="SourceGraphic"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* Ambient red spotlight */}
      <div className="absolute w-[60vw] h-[60vw] max-w-[650px] max-h-[650px] bg-red-600/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Horizontal light-slit */}
      <div
        ref={scanRef}
        style={{ transform: 'scaleX(0)' }}
        className="absolute left-0 top-1/2 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_25px_6px_rgba(229,9,20,0.6)] pointer-events-none origin-center"
      />

      {/* Multi-language liquid "Welcome" at the top of the page */}
      <div
        aria-hidden="true"
        className="absolute top-[6vh] left-0 w-full z-10 flex flex-col items-center gap-1 px-4 text-center pointer-events-none"
      >
        <div
          ref={gooRef}
          className="relative w-full h-[1.7em] text-white font-semibold"
          style={{
            fontFamily: WELCOME_FONT_STACK,
            fontSize: 'clamp(2rem, 5.5vw, 4rem)',
            filter: 'url(#p-goo) blur(0.5px)',
          }}
        >
          <span ref={wordARef} className="absolute inset-0 flex items-center justify-center whitespace-nowrap" />
          <span ref={wordBRef} className="absolute inset-0 flex items-center justify-center whitespace-nowrap" />
        </div>
        <span
          ref={langRef}
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-red-500 min-h-[1em]"
        />
      </div>

      {/* The red drop that falls into the button */}
      <span
        ref={dropRef}
        aria-hidden="true"
        className="absolute top-0 left-1/2 z-20 w-4 h-4 rounded-full pointer-events-none"
        style={{ background: RED, boxShadow: '0 0 18px rgba(229,9,20,0.85)', opacity: 0 }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center px-4 w-full text-center">
        {/* The name IS the button: it morphs into a pill, then liquid fills it */}
        <button
          ref={btnRef}
          type="button"
          onClick={handleEnter}
          aria-label="Enter AKSHAY H's portfolio"
          tabIndex={ready ? 0 : -1}
          className={`group relative border-2 border-transparent border-solid bg-transparent p-0 text-white outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-transform duration-300 ${
            ready ? 'pointer-events-auto hover:scale-105 active:scale-95' : 'pointer-events-none'
          }`}
        >
          {/* Pulse ring (only visible when the button is live) */}
          <span
            ref={ringRef}
            className="absolute inset-[-2px] rounded-full border-2 border-red-600 pointer-events-none opacity-0"
          />

          {/* Liquid that fills the pill (clipped to the pill shape) */}
          <span className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
            <span
              ref={liquidRef}
              className="absolute left-0 top-full block w-full h-full"
              style={{ background: RED }}
            >
              <svg
                ref={waveRef}
                className="absolute left-0 bottom-full block h-[18px] w-[200%]"
                viewBox="0 0 200 18"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  fill={RED}
                  d="M0 9 Q12.5 0 25 9 T50 9 T75 9 T100 9 T125 9 T150 9 T175 9 T200 9 V18 H0 Z"
                />
              </svg>
            </span>
          </span>

          {/* Big name */}
          <span
            ref={nameRef}
            aria-hidden="true"
            className="relative block whitespace-nowrap px-3 py-2 uppercase leading-none"
            style={{
              fontFamily: FONT_STACK,
              fontWeight: 400,
              letterSpacing: '0.05em',
              fontSize: 'clamp(3.2rem, 15vw, 15rem)',
              perspective: '900px',
            }}
          >
            {NAME.split('').map((char, idx) => (
              <span
                key={idx}
                data-char={char}
                style={{ opacity: 0 }}
                className={`p-letter inline-block text-center will-change-transform ${
                  idx === NAME.length - 1 ? 'text-red-600' : ''
                }`}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </span>

          {/* Button label */}
          <span
            ref={enterRef}
            className="absolute inset-0 z-10 flex items-center justify-center gap-3 text-xl uppercase tracking-[0.3em] opacity-0"
            style={{ fontFamily: FONT_STACK, fontWeight: 400 }}
          >
            Enter
            <svg
              ref={arrowRef}
              className="w-4 h-4 fill-none stroke-current stroke-2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </button>

        {/* Loading bar + status text (turns into the click hint when ready) */}
        <div ref={hintRef} className="mt-8 flex flex-col items-center gap-3">
          <div ref={barWrapRef} className="w-44 h-px bg-white/15 overflow-hidden">
            <div ref={barRef} style={{ transform: 'scaleX(0)' }} className="h-full w-full bg-red-600 origin-left" />
          </div>
          <p
            ref={statusRef}
            className="text-[10px] font-mono uppercase tracking-[0.35em] text-white/50 min-h-[1em]"
          >
            Initialising  000%
          </p>
        </div>
      </div>
    </div>
  );
};

export default NetflixPreloader;
