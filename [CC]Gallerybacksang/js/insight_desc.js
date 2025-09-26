
  // 1) 매핑테이블: HTML class -> JSON key (여러 후보를 배열로)
  const MAP = {
    '.newsCard': ['newsCard', 'card', 'type'],
    '.newsImage': ['newsImage', 'image', 'thumb'],
    '.reporter': ['reporter', 'writer', 'author'],
    '.newsTitle': ['title', 'newsTitle'],   // ← 요구사항 반영: title 우선
    '.date': ['date', 'publishedAt']        // 값 예: "(2024.10.11)" 또는 "2024.10.11"
  };

  // 2) JSON 로드
  const data = await fetch('./insight.json').then(r => r.json());

  // 3) news1~N 구조 평탄화
  const items = Object.values(data.news ?? data ?? {}).flat();

  // 4) 템플릿(첫 li.listup) 복제 렌더
  const ul = document.querySelector('#news .newsList');
  const tpl = ul.querySelector('li.listup');
  const frag = document.createDocumentFragment();

  // 보조: JSON에서 키 후보 순서대로 찾아 반환
  const pick = (obj, keys) => {
    for (const k of keys) {
      if (obj?.[k] != null && obj[k] !== '') return obj[k];
    }
    return '';
  };

  // 보조: 날짜 괄호 정리 "(2024.10.11)" -> "2024.10.11"
  const cleanDate = (s) => String(s || '').replace(/^\((.*)\)$/, '$1').trim();

  items.forEach(it => {
    const li = tpl.cloneNode(true);

    // 이미지
    const img = li.querySelector('.newsImage');
    if (img) {
      const src = pick(it, MAP['.newsImage']);
      img.src = src || '';
      img.alt = pick(it, MAP['.newsTitle']) || pick(it, MAP['.newsCard']) || 'INSIGHT';
    }

    // 텍스트들
    for (const sel of Object.keys(MAP)) {
      if (sel === '.newsImage') continue;
      const el = li.querySelector(sel);
      if (!el) continue;
      const val = pick(it, MAP[sel]);
      // .newsTitle 안에 <strong class="date">가 중첩인 구조를 고려
      if (sel === '.newsTitle') {
        if (el.firstChild && el.firstChild.nodeType === Node.ELEMENT_NODE) {
          // <p class="newsTitle"><strong class="date"></strong></p> 형태면 텍스트 노드 추가
          el.insertBefore(document.createTextNode(String(val)), el.firstChild);
        } else {
          el.textContent = String(val);
        }
      } else if (sel === '.date') {
        el.textContent = cleanDate(val);
      } else {
        el.textContent = String(val);
      }
    }

    // 상세로 이동: 목록의 제목+날짜를 합쳐 상세의 title 과 일치시킴
    const titleForList = pick(it, MAP['.newsTitle']);     // title 또는 newsTitle
    const dateForList = cleanDate(pick(it, MAP['.date'])); // (YYYY.MM.DD) → YYYY.MM.DD
    const titleForDetail = dateForList
      ? `${titleForList} (${dateForList})`
      : titleForList;

    const a = li.querySelector('a');
    if (a) a.href = `baxsang_insight_info.html?title=${encodeURIComponent(titleForDetail)}`;

    frag.appendChild(li);
  });

  ul.replaceChildren(frag);