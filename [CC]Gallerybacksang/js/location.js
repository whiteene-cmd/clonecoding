window.addEventListener('load',()=>{
    document.querySelectorAll('.fill').forEach(el=>{
        el.addEventListener('animationend',()=>{
            el.style.webkitTextFillColor = '#211e1f';
            el.style.color = '#211e1f';
            el.style.backgroundImage = 'none';
        }, {once:true})
    })
})

window.addEventListener("DOMContentLoaded", () => {
    /* textbox */
  gsap.utils.toArray(".callbox").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          end: "top  40%",
          toggleActions: "restart reverse restart reverse",
        },
      }
    );
  });
  gsap.utils.toArray(".guideBox").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          end: "top  40%",
          toggleActions: "restart reverse restart reverse",
        },
      }
    );
  });
  
})

