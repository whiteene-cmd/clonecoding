document.addEventListener("DOMContentLoaded", async () => {
  const ul = document.querySelector(".artbox ul");
  if (!ul) return;

  const template = ul.querySelector("li");
  if (!template) return;

  // 1) JSON 로드 & 평탄화
  let list = [];
  try {
    const res = await fetch("collection.json");
    const raw = await res.json();
    list = Object.values(raw?.collection ?? {}).flat(); // art1~art20 안의 배열을 평탄화
  } catch (e) {
    console.error("collection.json 로드 실패:", e);
    return;
  }

  const MAX = 20;
  const counter = document.querySelector(".artfilter > p span");

  // 2) 렌더 함수
  function render(items) {
    ul.innerHTML = "";
    items.slice(0, MAX).forEach(item => {
      const li = template.cloneNode(true);

      const img = li.querySelector("figure img");
      if (img) {
        img.src = item.image || "";
        img.alt = item.artName || item.artistName || "artwork";
        img.loading = "lazy";
      }

      const map = {
        ".artistName": item.artistName,
        ".artName": item.artName,
        ".yearNum": item.yearNum,
        ".sizeNum": item.sizeNum,
        ".metName": item.metName
      };
      for (const sel in map) {
        const el = li.querySelector(sel);
        if (el) el.textContent = map[sel] ?? "-";
      }

      ul.appendChild(li);
    });
    if (counter) counter.textContent = String(items.length);
  }

//이름찾기
  const tabs = [...document.querySelectorAll(".nameTab span")];

  // 작가 목록
  const uniqueArtists = [...new Set(list.map(x => x.artistName))];

  tabs.forEach((tab, idx) => {
    if (!tab.dataset.artist) {
      const txt = tab.textContent.trim();
      if (txt && txt.toLowerCase() !== "all" && txt !== "전체") {
        tab.dataset.artist = txt; // 탭 텍스트를 이름으로 사용
      } else if (/artist\d+/.test([...tab.classList].join(" "))) {
        // artist1~4인데 이름 정보가 전혀 없으면 자동 할당
        tab.dataset.artist = uniqueArtists[idx] || "";
      }
    }
  });

  // 4) 필터 동작
  function setActive(tab) {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      // "전체" 탭 지원: 클래스가 all 이거나 텍스트가 ALL/전체이면 전체 보기
      const isAll =
        tab.classList.contains("all") ||
        ["전체", "ALL"].includes(tab.textContent.trim());
      if (isAll) {
        setActive(tab);
        render(list);
        return;
      }

      const name = tab.dataset.artist?.trim();
      if (!name) return;

      const filtered = list.filter(x => x.artistName === name);
      setActive(tab);
      render(filtered);
    });
  });

  // 5) 초기 렌더(전체)
  render(list);
});
