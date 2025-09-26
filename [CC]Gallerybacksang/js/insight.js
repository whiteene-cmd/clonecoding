gsap.registerPlugin(ScrollTrigger);

/* 타이틀이랑 타이틀 설명 위로 올라오는 모션 */
window.addEventListener("DOMContentLoaded", () => {
  gsap.utils.toArray(".artbg h2").forEach((el) => {
    gsap.fromTo(
      el,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "restart reverse restart reverse",
        },
      }
    );
  }),
    gsap.utils.toArray(".artbg small").forEach((el) => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "restart reverse restart reverse",
          },
        }
      );
    });
});

/* 흐르는 이미지 */
let roller = document.querySelector(".roller .rolling-list");
roller.id = "roller1";
let clone = roller.cloneNode(true);
clone.id = "roller2";
document.querySelector(".roller").appendChild(clone);
roller.classList.add("original");
clone.classList.add("clone");

/* 페이지 전체를 json으로 */
document.addEventListener("DOMContentLoaded", async () => {
  const list =
    document.querySelector("#news .newsList") ||
    document.querySelector("#news ul");
  const template = list?.querySelector(".listup") || list?.querySelector("li");
  if (!list || !template) return;

  list.innerHTML = ""; // 기존 템플릿 비우기

  // JSON 로드
  const res = await fetch("insight.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const raw = await res.json();

  // { news: { news1:[{...}], news2:[{...}], ... } } -> [{...}, {...}, ...]
  const data = raw?.news ? Object.values(raw.news).flat() : [];
  // 방어
  if (!Array.isArray(data)) return;


  data.forEach((item) => {
    const li = template.cloneNode(true);

    // 1) 기본 텍스트
  const setText = (cls, v) => {
    const el = li.querySelector('.' + cls);
    if (el && v != null) el.textContent = v;
  };
  setText('newsCard',  item.newsCard);
  setText('reporter',  item.reporter);

  // 2) 날짜는 p.newsTitle 안의 .date에 먼저 채움
  const titleP = li.querySelector('.newsTitle');
  const dateEl = titleP?.querySelector('.date');
  if (dateEl && item.date) dateEl.textContent = item.date;

  // 3) 제목은 덮어쓰지 말고, date 뒤에 텍스트 노드로 이어 붙임
  if (titleP && item.newsTitle) {
    // 기존 children 보존, 단순히 텍스트만 추가
    titleP.append(document.createTextNode(' ' + item.newsTitle));
  }

  // 4) 이미지
  const img = li.querySelector('.newsImage');
  if (img && item.newsImage) {
    img.src = item.newsImage;
    if (!img.alt) img.alt = item.newsTitle || '';
  } else {
    img?.closest('figure')?.remove();
  }

    list.appendChild(li);

  //상세페이지로 넘어갈때 클래스 매핑해서 제이슨파일 불러오기
  const cleanDate = (s) => String(s || '').replace(/^\((.*)\)$/, '$1').trim();
  const dateForList = cleanDate(item.date);
  const titleForList = String(item.newsTitle || '').trim();
  const titleForDetail = dateForList ? `${titleForList} (${dateForList})` : titleForList;

  const a = li.querySelector('a');
  if (a) {
    a.href = `baxsang_insight_info.html?title=${encodeURIComponent(titleForDetail)}`;
    a.setAttribute('aria-label', titleForDetail);
  }
  });
});
