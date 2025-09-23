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

/* retouch */
window.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.imgSlider');
  const imgAfter = document.querySelector('.imgAfter');
  const imgContainer = document.querySelector('.img_container');
  if (!slider || !imgAfter || !imgContainer) return;

  let isDragging = false;
  const DEG = 120;                   // 원하는 기울기 (↗)
  const RAD = DEG * Math.PI / 180;
  const m = Math.tan(RAD);          // 직선의 기울기

  const onDown = (e) => { isDragging = true; update(getPoint(e)); };
  const onMove = (e) => { if (isDragging) update(getPoint(e)); };
  const onUp   = () => { isDragging = false; };

  // 마우스 + 터치
  slider.addEventListener('mousedown', onDown);
  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
  slider.addEventListener('touchstart', (e)=>{ isDragging = true; update(getPoint(e.touches[0])); }, {passive:true});
  document.addEventListener('touchmove',  (e)=>{ if(isDragging) update(getPoint(e.touches[0])); }, {passive:true});
  document.addEventListener('touchend',   onUp);

  // 초기 위치 (가운데)
  update({ x: imgContainer.getBoundingClientRect().width * 0.5 });

  function getPoint(e){
    const rect = imgContainer.getBoundingClientRect();
    return { x: Math.min(Math.max(e.clientX - rect.left, 0), rect.width) };
  }

  function update({ x }){
    const rect = imgContainer.getBoundingClientRect();
    const W = rect.width, H = rect.height;
    const y0 = H / 2;               // 선이 관통하는 기준 y (중앙)
    // 상단/하단과의 교점 (px)
    const xTop    = x - (y0 / m);
    const xBottom = x + (y0 / m);

    // 대각선의 '왼쪽' 영역을 보여주도록 after를 자름 (↗ 기준)
    // polygon: (좌상) -> (교점-상단) -> (교점-하단) -> (좌하)
    imgAfter.style.clipPath =
      `polygon(0px 0px, ${xTop}px 0px, ${xBottom}px ${H}px, 0px ${H}px)`;

    // 슬라이더 시각 위치(센터를 x, H/2에 맞춤)
    slider.style.left = `${(x / W) * 100}%`;
  }
});


