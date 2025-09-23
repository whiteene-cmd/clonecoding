// 항목별 hover 텍스트: li 또는 span의 data-hover를 우선 사용, 없으면 "baexang"
/* (function () {
  function wireHoverText(listSelector) {
    document.querySelectorAll(listSelector).forEach((li) => {
      const span = li.querySelector(':scope > a > span');
      if (!span) return;

      // 원문 저장(1회)
      if (!span.dataset.original) {
        span.dataset.original = (span.textContent || '').trim();
      }

      // li의 data-hover > span의 data-hover > 기본값
      const hoverText =
        li.dataset.hover ||
        span.dataset.hover ||
        'Baexang' 

      // 마우스/키보드 모두 대응
      const show = () => (span.textContent = hoverText);
      const hide = () => (span.textContent = span.dataset.original);

      li.addEventListener('mouseenter', show);
      li.addEventListener('mouseleave', hide);
      li.addEventListener('focusin', show);
      li.addEventListener('focusout', hide);
    });

 '



  // 1) 상단 GNB 메인
  wireHoverText('header nav .gnb .gnbmain');
  // 2) 드롭다운 서브
  wireHoverText('header nav .gnb .gnbInner .gnbsub > li');
})();  } */

/*  document.addEventListener('DOMContentLoaded', () => {
  // GNB 안의 모든 li 대상 (메인/서브 모두 커버)
  const items = document.querySelectorAll('header nav .gnb li');

  items.forEach(li => {
    // a > span 텍스트 노드 (없어도 동작)
    const span = li.querySelector('a span');

    // 서브메뉴 후보를 폭넓게 탐색 (구조가 달라도 최대한 잡기)
    let sub = li.querySelector('.gnbInner');
    if (!sub) {
      // 자식 요소 중 서브메뉴로 보이는 ul/컨테이너 추정
      sub = Array.from(li.children).find(el =>
        el.matches('.gnbsub, .submenu, ul, .dropdown')
      ) || null;
    }

    // 원래 폰트 크기 기억
    const originalSize =
      span ? (span.style.fontSize || getComputedStyle(span).fontSize) : '';

    const open = () => {
      if (sub) sub.style.display = 'block';   // 서브 열기
      if (span) span.style.fontSize = '24px'; // 텍스트 18px
    };

    const close = () => {
      if (sub) sub.style.display = 'none';           // 서브 닫기
      if (span && originalSize) span.style.fontSize = originalSize; // 복원
    };

    // 초기 상태: 서브메뉴 숨김
    if (sub) sub.style.display = 'none';

    // 마우스 + 키보드 접근성 대응
    li.addEventListener('mouseenter', open);
    li.addEventListener('mouseleave', close);
    li.addEventListener('focusin', open);
    li.addEventListener('focusout', close);
  });
});

 

 */
/* 헤더 메뉴열기 */
(() => {
  const menuArea = document.querySelector('.menuArea');
  const openBtn  = document.querySelector('.gnbmain.menuiIco a');
  const closeBtn = document.querySelector('.menuArea .closeBtn');

  if (!menuArea || !openBtn) return;

  const openMenu = (e) => {
    e && e.preventDefault();
    menuArea.classList.add('on');
    document.body.classList.add('no-scroll');
    menuArea.setAttribute('aria-hidden', 'false');
  };

  const closeMenu = (e) => {
    e && e.preventDefault();
    menuArea.classList.remove('on');
    document.body.classList.remove('no-scroll');
    menuArea.setAttribute('aria-hidden', 'true');
  };

  // 열기
  openBtn.addEventListener('click', openMenu);

  // 닫기(X 버튼)
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  // ESC로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
})();

/* 서브메뉴의 텍스트를 한글로 바꾸고 이미지와 서브메뉴를 열어줌. */
document.addEventListener('DOMContentLoaded', () => {
  const menuArea  = document.querySelector('.menuArea');
  const menuItems = document.querySelectorAll('.menulist .menu');
  const subWrap   = document.querySelector('.menuArea .menusub');
  const subPanels = subWrap ? subWrap.querySelectorAll(':scope > div') : [];

  function activate(li){
    // 1) li.on 토글 (menuPic 표시/숨김 포함)
    menuItems.forEach(m => m.classList.remove('on'));
    li.classList.add('on');

    // 2) 번호 읽어서 해당 서브만 show
    const num = li.querySelector('.num')?.textContent.trim() || '';
    if (subWrap) {
      subWrap.classList.add('on');
      subPanels.forEach(p => p.classList.remove('show'));
      const target = subWrap.querySelector(`.sub${num}`);
      if (target) target.classList.add('show');
    }
  }

  // 호버/포커스 시 li 기준으로 동작 (title 밖으로 마우스가 나가도 유지)
  menuItems.forEach(li => {
    li.addEventListener('mouseenter', () => activate(li));
    li.addEventListener('focusin',    () => activate(li)); // 키보드 접근성
  });

  // 메뉴 영역을 벗어나도 유지하려면 이 부분은 비활성화
  // menuArea?.addEventListener('mouseleave', () => {
  //   subWrap?.classList.remove('on');
  // });

  // 초깃값 동기화
  const initActive = document.querySelector('.menulist .menu.on');
  if (initActive) activate(initActive);
});
function activate(li){
  const menuItems = document.querySelectorAll('.menulist .menu');
  const subWrap   = document.querySelector('.menuArea .menusub');
  const subPanels = subWrap ? subWrap.querySelectorAll(':scope > div') : [];

  // li.on 토글
  menuItems.forEach(m => m.classList.remove('on'));
  li.classList.add('on');

  // 번호 매칭 (01 -> .sub01)
  const num = li.querySelector('.num')?.textContent.trim() || '';
  if (subWrap) {
    subWrap.classList.add('on');
    subPanels.forEach(p => p.classList.remove('show'));
    const target = subWrap.querySelector(`.sub${num}`);
    if (target) target.classList.add('show'); // ← 이 한 줄이 “01엔 01만”의 핵심
  }
}

/* footer accorion */
document.querySelector('.angle')
    ?.addEventListener('click', () =>
      document.querySelector('.shop')?.classList.toggle('on')
    );
