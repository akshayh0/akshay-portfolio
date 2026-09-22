import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import pictureImg from '../assets/Portfolio/picture.png';
import CertificatesModal from './CertificatesModal';

const Hero = ({ animate = true }) => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const glareRef = useRef(null);
  const spotlightRef = useRef(null);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const contentRef = useRef(null);
  const nameRef = useRef(null);
  const hireMenuRef = useRef(null);

  const [hireMenuOpen, setHireMenuOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false);

  const NAME_LETTERS = "AKSHAY H".split("");

  const HIRE_OPTIONS = [
    {
      name: 'WhatsApp',
      sub: 'Chat instantly',
      href: `https://wa.me/917483197588?text=${encodeURIComponent("Hi Akshay H, I came across your portfolio and I'd like to connect!")}`,
      color: 'hover:border-green-500 hover:text-green-400 hover:bg-green-500/10',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12.004 2.003c-5.523 0-10 4.477-10 10 0 1.766.464 3.484 1.344 5.001L2 22l5.106-1.34a9.958 9.958 0 004.898 1.34h.004c5.523 0 10-4.477 10-10s-4.477-10-10-10zm0 18.19h-.003a8.19 8.19 0 01-4.174-1.143l-.299-.178-3.03.795.81-2.955-.195-.303a8.19 8.19 0 01-1.256-4.379c0-4.527 3.684-8.211 8.216-8.211 2.194 0 4.256.856 5.808 2.409a8.157 8.157 0 012.406 5.809c-.001 4.528-3.684 8.156-8.283 8.156z"/></svg>
      )
    },
    {
      name: 'Email',
      sub: 'akshayh2004ak08@gmail.com',
      href: `mailto:akshayh2004ak08@gmail.com?subject=${encodeURIComponent("Let's work together")}&body=${encodeURIComponent('Hi Akshay H,\n\n')}`,
      color: 'hover:border-red-500 hover:text-red-400 hover:bg-red-500/10',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v10.5c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 012.25 17.25V6.75z"/><path strokeLinecap="round" strokeLinejoin="round" d="M3 6.75l9 6.75 9-6.75"/></svg>
      )
    },
    {
      name: 'LinkedIn',
      sub: 'Message on LinkedIn',
      href: 'https://www.linkedin.com/in/akshay0',
      color: 'hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10',
      icon: (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.558V9h3.556v11.452z"/></svg>
      )
    }
  ];

  useEffect(() => {
    const onClickOutside = (e) => {
      if (hireMenuRef.current && !hireMenuRef.current.contains(e.target)) {
        setHireMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const developerRoles = [
    'FEATURE FILM // AI / ML ENGINEERING STUDENT',
    'ORIGINAL SERIES // COMPUTER VISION SPECIALIST',
    'BLOCKBUSTER // SOFTWARE DEVELOPER',
    'ACCLAIMED // LLM & GENAI BUILDER'
  ];

  useEffect(() => {
    if (!animate) return;
    const section = sectionRef.current;
    const card = cardRef.current;
    const content = contentRef.current;
    if (!section || !card || !content) return;

    // --- GSAP CINEMATIC ENTRANCE ANIMATION ---
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      section.querySelector('header'),
      { y: -60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
    .fromTo(
      nameRef.current ? nameRef.current.querySelectorAll('.letter') : [],
      { y: '110%', opacity: 0, rotateZ: 8 },
      { y: '0%', opacity: 1, rotateZ: 0, duration: 1, stagger: 0.07, ease: "back.out(1.6)" },
      "-=0.5"
    )
    .fromTo(
      content.querySelectorAll('.hero-anim-item'),
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.1, stagger: 0.12 },
      "-=0.7"
    )
    .fromTo(
      card,
      { scale: 0.75, opacity: 0, rotationY: 35, rotationX: -15 },
      { scale: 1, opacity: 1, rotationY: 0, rotationX: 0, duration: 1.4, ease: "back.out(1.2)" },
      "-=0.9"
    );

    // --- Continuous subtle flicker/glow on the name, like a marquee sign ---
    gsap.to(nameRef.current ? nameRef.current.querySelectorAll('.letter') : [], {
      textShadow: "0 0 25px rgba(229,9,20,0.9)",
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      stagger: { each: 0.15, from: "random" },
      ease: "sine.inOut"
    });

    // --- MOUSE PHYSICS & SPOTLIGHT TRACKING ---
    gsap.set([cursorDotRef.current, cursorRingRef.current], {
      scale: 0.5,
      opacity: 0,
      transformOrigin: "50% 50%"
    });

    const xToDot = gsap.quickTo(cursorDotRef.current, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(cursorDotRef.current, "y", { duration: 0.05, ease: "power2.out" });
    
    const xToRing = gsap.quickTo(cursorRingRef.current, "x", { duration: 0.15, ease: "power3.out" });
    const yToRing = gsap.quickTo(cursorRingRef.current, "y", { duration: 0.15, ease: "power3.out" });

    const xTilt = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3.out" });
    const yTilt = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3.out" });
    const glareX = gsap.quickTo(glareRef.current, "x", { duration: 0.3, ease: "power2.out" });
    const glareY = gsap.quickTo(glareRef.current, "y", { duration: 0.3, ease: "power2.out" });

    const handleMouseMove = (e) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const dotSize = 12;
      const ringSize = 48;

      // Update Spotlight position instantly via inline style
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      }

      // Update Custom Cursor coordinates
      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      // Card 3D Perspective Calculations
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2 - rect.left;
      const cardCenterY = cardRect.top + cardRect.height / 2 - rect.top;

      const rotateX = -((y - cardCenterY) / (cardRect.height / 2)) * 16;
      const rotateY = ((x - cardCenterX) / (cardRect.width / 2)) * 16;

      xTilt(rotateY);
      yTilt(rotateX);

      // Holographic Glare mapping
      glareX((x - cardRect.left) - cardRect.width / 2);
      glareY((y - cardRect.top) - cardRect.height / 2);
    };

    const handleMouseEnter = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([cursorDotRef.current, cursorRingRef.current], {
        opacity: 0,
        scale: 0.5,
        duration: 0.3,
        ease: "power2.inOut"
      });
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      xTilt(0);
      yTilt(0);
    };

    section.addEventListener("mousemove", handleMouseMove);
    section.addEventListener("mouseenter", handleMouseEnter);
    section.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section.removeEventListener("mousemove", handleMouseMove);
      section.removeEventListener("mouseenter", handleMouseEnter);
      section.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [animate]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col justify-between select-none cursor-none"
    >
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -4px;
          width: 100%;
          height: 1px;
          background: #E50914;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* 1. Cinematic Background Gradient & Marquee */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/90 to-[#050505] z-0">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[...developerRoles, ...developerRoles].map((role, idx) => (
              <span key={idx} className="text-[14vw] font-black text-red-600 mx-8 uppercase tracking-tighter">
                {role} &bull;
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Direct Mouse Tracking Spotlight Beam (Glows wherever you move) */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full pointer-events-none z-10 opacity-0 blur-[90px] transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.35) 0%, rgba(229,9,20,0.1) 40%, transparent 70%)'
        }}
      ></div>

      {/* 3. Main Content Layer */}
      <div ref={contentRef} className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 h-full flex flex-col justify-between pt-24 pb-12">
        
        {/* Top Cinematic Badge */}
        <div className="hero-anim-item flex items-center justify-between w-full">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded bg-black/80 backdrop-blur-2xl border border-red-600/40 text-xs font-mono uppercase tracking-widest text-white shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
            <span className="text-red-500 font-bold tracking-wider">DEVELOPER SERIES</span>
            <span className="text-white/40">|</span>
            <span className="text-white/80">SEASONS 2023 - 2026</span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-mono text-white/50 tracking-wider">
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">AI / ML 4K</span>
            <span className="px-2 py-0.5 border border-white/20 rounded bg-black/40">FULL-STACK CERTIFIED</span>
          </div>
        </div>

        {/* Main Center Cinematic Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8 my-auto">
          
          {/* Left Side: Developer Story & Description */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-5 text-left">
            
            <div className="hero-anim-item flex items-center gap-3">
              <span className="px-2.5 py-0.5 bg-red-600 text-white font-black text-xs rounded tracking-widest shadow-[0_0_20px_rgba(229,9,20,0.8)] animate-pulse">1ST PLACE</span>
              <span className="text-white/80 text-xs font-mono tracking-widest uppercase">AI / ML Engineering Student & Software Developer</span>
            </div>

            <h1 className="hero-anim-item text-5xl md:text-7xl font-black tracking-tighter text-white leading-[0.95] drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
              <span ref={nameRef} className="inline-block overflow-hidden align-bottom">
                {NAME_LETTERS.map((letter, idx) => (
                  <span key={idx} className="letter inline-block will-change-transform">
                    {letter === ' ' ? '\u00A0' : letter}
                  </span>
                ))}
              </span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-600 to-red-700 drop-shadow-[0_0_35px_rgba(220,38,38,0.5)]">
                AI.ENGINE
              </span>
            </h1>

            <div className="hero-anim-item flex items-center gap-3 text-xs font-mono text-red-400 font-bold">
              <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/30 rounded text-red-500">2x ML Intern</span>
              <span className="text-white/40">•</span>
              <span>Python • FastAPI • React</span>
              <span className="text-white/40">•</span>
              <span className="text-white/70">Computer Vision & LLMs</span>
            </div>

            <p className="hero-anim-item text-sm md:text-base text-white/80 font-light leading-relaxed max-w-md drop-shadow">
              Building AI-powered applications, machine learning systems, computer vision, and full-stack solutions — from award-winning hackathon prototypes to production-ready platforms.
            </p>

            {/* Action Button Set */}
            <div className="hero-anim-item flex items-center gap-4 pt-2">
              <a
                href="#projects"
                className="px-8 py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_10px_35px_rgba(255,255,255,0.3)] flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                View Projects
              </a>
              <a
                href="#contact"
                className="px-8 py-3.5 bg-neutral-900/80 text-white border border-white/20 font-bold text-xs uppercase tracking-widest rounded hover:bg-neutral-800 transition-all duration-300 shadow-xl backdrop-blur-md flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                Contact Me
              </a>
              <a
                href="/Akshay_H_Resume.pdf"
                download="Akshay_H_Resume.pdf"
                className="px-8 py-3.5 bg-transparent text-red-500 border border-red-600/50 font-bold text-xs uppercase tracking-widest rounded hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300 shadow-xl flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
                </svg>
                Download Resume
              </a>
            </div>
          </div>

          {/* Center: Interactive 3D Holographic Tilt Developer Poster Frame */}
          <div className="lg:col-span-4 flex justify-center perspective-[1200px]">
            <div 
              ref={cardRef}
              className="relative group transform-gpu transition-transform duration-100 ease-out will-change-transform"
            >
              {/* Cinematic Red Neon Back Glow */}
              <div className="absolute -inset-3 bg-gradient-to-r from-red-600/70 via-rose-600/40 to-purple-600/20 rounded-3xl blur-3xl opacity-90 group-hover:opacity-100 animate-pulse duration-1000"></div>
              
              {/* Poster Card with Glossy Sheen */}
              <div className="relative w-[280px] md:w-[320px] p-3.5 bg-[#141414]/90 backdrop-blur-2xl rounded-2xl border border-red-600/40 shadow-[0_40px_80px_rgba(0,0,0,0.95)] overflow-hidden">
                
                {/* Dynamic Specular Glare Layer */}
                <div 
                  ref={glareRef}
                  className="absolute inset-[-50%] w-[200%] h-[200%] bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none transform-gpu z-40"
                ></div>

                {/* Netflix Series Tag */}
                <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-red-600 text-white font-mono text-[10px] font-bold tracking-widest rounded shadow-xl">
                  FEATURED DEV
                </div>

                <img
                  src={pictureImg}
                  alt="Developer Portrait"
                  className="w-full h-[330px] md:h-[390px] object-cover rounded-xl filter contrast-125 brightness-105 group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side: Technical Specs & Stack */}
          <div className="hero-anim-item lg:col-span-3 flex flex-col items-start lg:items-end space-y-4 text-left lg:text-right">
            <div className="p-5 bg-black/80 backdrop-blur-2xl border border-white/15 rounded-xl shadow-2xl max-w-xs">
              <h3 className="text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-2">Core Stack & Awards</h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                1st Place — JAGRUTHI 2024 Safety Hackathon, Top 5 Finalist — Avinya Techknows, Google Cloud & Anthropic MCP Certified.
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Cinematic Ticker */}
        <div className="hero-anim-item flex items-center justify-between text-xs font-mono text-white/50 tracking-widest uppercase">
          <span>ENGINEERED FOR INTELLIGENCE</span>
          <a href="#about" className="flex flex-col items-center gap-1 text-white/40 hover:text-red-500 transition-colors group">
            <span className="hidden sm:inline text-[10px] tracking-[0.3em]">SCROLL</span>
            <svg className="w-4 h-4 animate-bounce group-hover:text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <span>[ PORTFOLIO RELEASE v2.6 ]</span>
        </div>
      </div>

      {/* 4. Ultra Pro Max Custom Precision Cursor Suite */}
      <div
        ref={cursorDotRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914]"
      ></div>

      <div
        ref={cursorRingRef}
        className="absolute top-0 left-0 z-50 pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px]"
      ></div>

      {/* --- NETFLIX-THEMED DEVELOPER NAVBAR --- */}
      <header className="absolute top-0 left-0 z-50 w-full max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center justify-between pointer-events-auto">
        <div className="text-2xl font-black text-red-600 tracking-tighter flex items-center gap-2 drop-shadow-[0_2px_15px_rgba(229,9,20,0.9)]">
          AKSHAY H<span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-white/80">
          <a href="#home" className="nav-link hover:text-red-500 transition-colors">Home</a>
          <a href="#about" className="nav-link hover:text-red-500 transition-colors">About</a>
          <a href="#expertise" className="nav-link hover:text-red-500 transition-colors">Expertise</a>
          <a href="#skills" className="nav-link hover:text-red-500 transition-colors">Skills</a>
          <a href="#projects" className="nav-link hover:text-red-500 transition-colors">Projects</a>
          <a href="#contact" className="nav-link hover:text-red-500 transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-2.5">
          {/* Glass-effect GitHub icon */}
          <a
            href="https://github.com/akshayh0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-red-600/60 hover:bg-red-600/10 transition-all duration-300 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.86 3.15 8.98 7.52 10.43.55.1.75-.24.75-.53 0-.26-.01-1.13-.02-2.04-3.06.67-3.71-1.3-3.71-1.3-.5-1.27-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.48-2.44-.28-5.01-1.22-5.01-5.44 0-1.2.43-2.19 1.13-2.96-.11-.28-.49-1.4.11-2.92 0 0 .92-.3 3.02 1.13.88-.24 1.82-.37 2.76-.37.94 0 1.88.13 2.76.37 2.1-1.42 3.02-1.13 3.02-1.13.6 1.52.22 2.64.11 2.92.7.77 1.13 1.75 1.13 2.96 0 4.23-2.58 5.16-5.03 5.43.39.34.74 1.01.74 2.03 0 1.47-.01 2.65-.01 3.01 0 .29.2.64.76.53 4.36-1.46 7.51-5.58 7.51-10.43C23.02 5.24 18.27.5 12 .5z"/>
            </svg>
          </a>

          {/* Glass-effect LinkedIn icon */}
          <a
            href="https://www.linkedin.com/in/akshay0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="w-9 h-9 rounded-full bg-white/5 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:border-blue-500/60 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.114 20.452H3.558V9h3.556v11.452z"/>
            </svg>
          </a>

          {/* Certifications trigger */}
          <button
            onClick={() => setCertOpen(true)}
            className="hidden sm:inline-flex px-4 py-2 rounded border border-white/25 hover:border-red-600 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-red-600/10 hover:scale-105 active:scale-95 items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Certs
          </button>

          <a
            href="/Akshay_H_Resume.pdf"
            download="Akshay_H_Resume.pdf"
            className="hidden sm:inline-flex px-4 py-2 rounded border border-white/25 hover:border-red-600 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:bg-red-600/10 hover:scale-105 active:scale-95 items-center gap-2"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
            </svg>
            Resume
          </a>

          {/* Hire Me — opens a contact-method dropdown */}
          <div ref={hireMenuRef} className="relative">
            <button
              onClick={() => setHireMenuOpen((v) => !v)}
              className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-[0_0_20px_rgba(229,9,20,0.6)] hover:scale-105 active:scale-95 flex items-center gap-1.5"
            >
              Hire Me
              <svg className={`w-3 h-3 fill-none stroke-current stroke-2 transition-transform duration-300 ${hireMenuOpen ? 'rotate-180' : ''}`} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {hireMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+10px)] w-72 rounded-2xl bg-black/80 backdrop-blur-2xl border border-white/15 shadow-[0_25px_60px_rgba(0,0,0,0.9)] p-2 z-50 animate-[fadeIn_0.2s_ease]">
                <p className="px-3 pt-2 pb-1 text-[10px] font-mono uppercase tracking-widest text-white/40">
                  Choose how to reach me
                </p>
                {HIRE_OPTIONS.map((opt) => (
                  <a
                    key={opt.name}
                    href={opt.href}
                    target={opt.name === 'Email' ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    onClick={() => setHireMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent text-white/80 transition-all duration-200 ${opt.color}`}
                  >
                    <span className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      {opt.icon}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-sm font-bold">{opt.name}</span>
                      <span className="text-[11px] text-white/40 truncate max-w-[170px]">{opt.sub}</span>
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <CertificatesModal isOpen={certOpen} onClose={() => setCertOpen(false)} />
    </section>
  );
};

export default Hero;