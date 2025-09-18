gsap.registerPlugin(ScrollTrigger);

// 3) 활성화
gsap.registerPlugin(ScrollTrigger);

// 단일 요소도 되고, 여러 개도 한 번에 처리됨
gsap.utils.toArray(".fade-down").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,                 // 위(-)에서 원래 자리로
    duration: 0.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 85%",   // 요소 top이 뷰포트 85% 지점에 오면 시작
      toggleActions: "play none none reverse" // 위로 스크롤 시 부드럽게 원복
      // once: true,      // 한 번만 재생하고 유지하려면 이걸 사용
      // markers: true    // 디버깅용 가이드 표시
    }
  });
});

// 이미지가 늦게 로드되는 페이지면 레이아웃 변동 후 재계산
window.addEventListener("load", () => ScrollTrigger.refresh());
