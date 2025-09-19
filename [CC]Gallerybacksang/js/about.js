gsap.registerPlugin(ScrollTrigger);

// 페이지 로드하고 한번만 실행
window.addEventListener("DOMContentLoaded", () => {
  gsap.from(".fadeInY", {
    y: -35, // 위에서 아래로 24px 내려오며
    opacity: 0, // 투명 -> 불투명
    duration: 2.0, // 각 요소 재생 시간
    ease: "expo.out",
    stagger: 0.12, // 위에 있는 것부터 순차 재생 (Top->Bottom)
  }),
    gsap.from(".title h3 span", {
      x: 60, // 왼쪽에서 시작
      opacity: 0, // 페이드인
      scale: 0.8, // 작게 시작 → 1.0
      duration: 2.0, // 각 글자 재생 시간
      ease: "expo.out",
      stagger: {
        each: 0.1, // 순차 간격
        from: "start", // 왼쪽(첫 글자)부터
      },
    }),
    gsap.to("article", {
      backgroundSize: "100%", // 80% → 100%
      duration: 2.0,
      ease: "expo.out",
    }),
    gsap.to(".scroll-down", {
      y: -50,
      opacity: 1,
      duration: 2.5,
      delay: 0.3,
      ease: "expo.out",
    });

  /* 스크롤로 뷰포트에 진입했을 때 */
  /* TEXT-ser */
  gsap.utils.toArray(".itemText").forEach((el) => {
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
  /* TEXT-dif */
  gsap.utils.toArray(".difText").forEach((el) => {
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

  /* IMG */
  /* ser */
  gsap.utils.toArray(".serItem ul li figure img").forEach((img) =>
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

  /* dif */
  gsap.utils.toArray(".innerBox img").forEach((img) =>
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
