gsap.registerPlugin(ScrollTrigger);

/* gsap.fromTo(".revealClip",
  { clipPath: "inset(0 100% 0 0)", opacity: 1 },
  { clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power2.out" }
); */

window.addEventListener("DOMContentLoaded",()=>{
  gsap.utils.toArray(".revealClip").forEach((el) => {
  gsap.fromTo(el,
    { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.8,
      delay:0.2,
      ease: "expo.in",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }),
  gsap.utils.toArray(".secTitle h3, .secTitle span").forEach((el) => {
  gsap.fromTo(el,
    { y: 65, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }),
  gsap.utils.toArray("#aboutArea .infoWrap").forEach((el) => {
  gsap.fromTo(el,
    { y: 65, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }),
  gsap.utils.toArray("#aboutArea .bdDeco1,#aboutArea .bdDeco2").forEach((el) => {
  gsap.fromTo(el,
    { x: -65, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1.2,
      ease: "expo.out",
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }),
    gsap.utils.toArray("#aboutArea > figure img").forEach((img) =>
    gsap.fromTo(
      img,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2.0,
        ease: "expo.out",
        scrollTrigger: {
          trigger: img,
          start: "top 85%",
          toggleActions: "restart reverse restart reverse",
        },
      }
    )
  );
});