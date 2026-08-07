import gsap from "gsap";

export function animateHero() {
  const targets = [
    ".hero-badge",
    ".hero-headline",
    ".hero-subhead",
    ".hero-ctas",
    ".hero-sla",
    ".hero-console",
    ".hero-pillar",
    ".hero-banner",
  ];

  gsap.set(targets, { opacity: 0, y: 24 });

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(".hero-badge", { opacity: 1, y: 0, duration: 0.5 })
    .to(".hero-headline", { opacity: 1, y: 0, duration: 0.7 }, "-=0.3")
    .to(".hero-subhead", { opacity: 1, y: 0, duration: 0.6 }, "-=0.5")
    .to(".hero-ctas", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
    .to(".hero-sla", { opacity: 1, y: 0, duration: 0.4 }, "-=0.3")
    .to(".hero-console", { opacity: 1, y: 0, duration: 0.8 }, "-=0.9")
    .to(".hero-pillar", { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, "-=0.4")
    .to(".hero-banner", { opacity: 1, y: 0, duration: 0.6 }, "-=0.2");
}
