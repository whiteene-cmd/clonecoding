(async () => {
  const params = new URL(location.href).searchParams;
  const reqTitle = params.get('title'); // 목록에서 넘어온 제목
  if (!reqTitle) {
    console.warn('URL에 ?title= 이 없습니다.');
  }

  // JSON 로드
  const res = await fetch('./exhibitionNews.json');
  if (!res.ok) throw new Error('JSON 로드 실패');
  const data = await res.json();

  // 네 JSON이 exhibition1~6 처럼 "키: 배열" 구조라면 모두 평탄화
  const items = Object.values(data).flat();

  // 한글/공백 차이 등을 흡수하는 비교 함수
  const norm = s => String(s ?? '')
    .normalize('NFC')         // 한글 정규화
    .replace(/\s+/g, ' ')     // 연속 공백을 1칸으로
    .trim();

  // 1) 제목 완전 일치 우선
  let item = items.find(it => norm(it.title) === norm(reqTitle));

  // 2) 없으면 유사 매칭(포함) 시도
  if (!item && reqTitle) {
    item = items.find(it => norm(it.title).includes(norm(reqTitle)));
  }

  // 매칭 실패 대응
  if (!item) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="detail">
        <h2>해당 전시를 찾을 수 없어요</h2>
        <p>전달된 제목: <code>${reqTitle ?? '(없음)'}</code></p>
      </div>
    `);
    return;
  }

  // ====== 여기서부터 렌더링 ======
  // HTML의 클래스명과 JSON 키가 1:1이면 그대로 매핑
  const fill = (sel, val, opt = {}) => {
    const el = document.querySelector(sel);
    if (!el || val == null) return;
    if (opt.html) el.innerHTML = val; else el.textContent = String(val);
  };

  // 이미지
  const imgEl = document.querySelector('img.imgURL');
  if (imgEl && item.imgURL) {
    imgEl.src = item.imgURL;
    imgEl.alt = item.title || '';
  }

  // 텍스트들
  fill('.title', item.title);
  fill('.category', item.category);
  fill('.exhibitionPeriod', item.exhibitionPeriod);
  fill('.aritst', item.aritst); // (오타 포함 그대로 맞춤)

  // desc는 줄바꿈 보존
  const descEl = document.querySelector('.desc');
  if (descEl && item.desc != null) {
    descEl.textContent = String(item.desc);
    descEl.style.whiteSpace = 'pre-line';
  }

  // 페이지 타이틀도 전시명으로
  if (item.title) document.title = `${item.title} - EXHIBITION`;
})();
