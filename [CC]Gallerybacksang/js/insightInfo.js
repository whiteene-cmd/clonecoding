
  const MAP = {
    '.title': ['title'],
    '.update': ['update', 'updatedAt'],
    '.subtitle': ['subtitle', 'subTitle'],
    '.desc': ['desc', 'content', 'body'],
    '.descImg': ['descImg', 'image', 'cover']
  };

  const norm = (s) => String(s ?? '')
    .normalize('NFC')
    .replace(/\s+/g, ' ')
    .replace(/[“”]/g, '"')
    .trim();

  const params = new URL(location.href).searchParams;
  const reqTitle = norm(params.get('title') || '');

  const data = await fetch('./insightInfo.json').then(r => r.json());
  const items = Object.values(data.insightInfo ?? data ?? {}).flat();

  let item = items.find(it => norm(it.title) === reqTitle);
  if (!item && reqTitle) {
    item = items.find(it => {
      const a = norm(it.title);
      return a.includes(reqTitle) || reqTitle.includes(a);
    });
  }

  if (!item) {
    document.querySelector('.infomationArea .title').textContent = '해당 기사를 찾을 수 없습니다.';
    document.querySelector('.update').textContent = reqTitle ? `요청: ${reqTitle}` : '';
  } else {
    // 렌더
    for (const sel of Object.keys(MAP)) {
      const el = document.querySelector(sel);
      if (!el) continue;
      // 값 고르기
      let val = '';
      for (const k of MAP[sel]) {
        if (item?.[k] != null && item[k] !== '') { val = item[k]; break; }
      }
      if (sel === '.desc') {
        el.textContent = String(val || '');
        el.style.whiteSpace = 'pre-line'; // \n 보존
      } else if (sel === '.descImg') {
        if (val) {
          el.src = val;
          el.alt = item.title || 'INSIGHT';
        }
      } else {
        el.textContent = String(val || '');
      }
    }
    if (item.title) document.title = item.title + ' - INSIGHT';
  }