gsap.registerPlugin(ScrollTrigger);

/* 메인 타이틀 물차오르는거  */
window.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('.fill').forEach(el=>{
        el.addEventListener('animationend',()=>{
            el.style.webkitTextFillColor = '#211e1f';
            el.style.color = '#211e1f';
            el.style.backgroundImage = 'none';
        }, {once:true})
    }),
    /* onview 요소 올라오는거 */
    gsap.from("#onview .innerBox", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        delay: 0.95,
        ease: "expo.out"
    }),
    /* 이미지 좌->우로 열리는거 */
    gsap.utils.toArray("#upcoming .innerBox ul li img, #past .innerBox ul li img").forEach((img) => {
    gsap.fromTo(img,
    { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    {
      clipPath: "inset(0 0% 0 0)",
      duration: 0.8,
      delay:0.2,
      ease: "expo.in",
      scrollTrigger: {
        trigger: img,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
    })
  }),
  /* 이미지 밑에 텍스트 올라오는거 */
    gsap.utils.toArray("#upcoming .innerBox ul li .desc, #past .innerBox ul li .desc").forEach((el) =>{
    gsap.fromTo(el,
        {y: 80, opacity: 0},
        {
            y: 0, opacity: 1,
            duration: 0.8,
            ease: "expo.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        }
    )
})
});


