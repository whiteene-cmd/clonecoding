gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const acc = document.querySelector('.mailAccodian');
  if (!acc) return;

  const trigger = acc.querySelector('ul > li:first-child');       // "직접입력 …"
  const options = acc.querySelectorAll('ul > li.panel');          // naver.com, daum.net …

  // 열기/닫기
  trigger.addEventListener('click', () => acc.classList.toggle('open'));

  // 선택 시: 라벨 교체 + (두번째 인풋에 도메인도 채움)
  options.forEach(li => {
    li.addEventListener('click', () => {
      const chosen = li.textContent.trim();
      const arrow = trigger.querySelector('img');
      const tn = Array.from(trigger.childNodes).find(n => n.nodeType === 3);
      if (tn) tn.nodeValue = chosen + ' ';
      else trigger.insertBefore(document.createTextNode(chosen + ' '), arrow || null);

      // @ 오른쪽 도메인 입력칸 채우기 (선택 사항)
      const domainInput = acc.closest('.choiceMail')?.querySelector('input:nth-of-type(2)');
      if (domainInput) domainInput.value = chosen;

      acc.classList.remove('open');
    });
  });

  // 바깥 클릭 시 닫기
  document.addEventListener('click', (e) => {
    if (!acc.contains(e.target)) acc.classList.remove('open');
  })

  const agree = document.querySelector('.privacyAgree input[type="checkbox"]');
  const more  = document.querySelector('.more');

  if (!agree || !more) return; // 요소가 없으면 아무 것도 안 함

  more.addEventListener('click', (e) => {
    e.preventDefault(); // 링크라면 기본 이동 막기

    if (!agree.checked) {
      alert('개인정보 수집 및 이용에 동의해주세요.');
      agree.focus();
      return;
    }

    alert('전송되었습니다.');
    // 알림창 닫힌 뒤 이동
    window.location.href = 'index.html'; 
  });

  //GSAP
  gsap.fromTo(".imageArea", 
    { backgroundSize: "120%", opacity: 0 },           // from
    { backgroundSize: "100%", opacity: 1,             // to
    duration: 2.0, ease: "expo.out"}
  ),
  gsap.fromTo(".visual",
    { y: 80, opacity: 0 },
    {
        y: 0, opacity: 1,
        duration: 2.0,
        delay: 0.2,
        ease: "expo.out"
    }
  ),
  gsap.utils.toArray(".qna").forEach((el) => {
    gsap.fromTo(el,
        {y: 80, opacity: 0},
    {
        y: 0, opacity: 1,
        duration: 2.0,
        ease: "expo.out"
    }
    )
  })
});

