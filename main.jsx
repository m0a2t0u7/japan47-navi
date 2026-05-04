// Reactの機能をグローバルから取得（import文の代わり）
const { useState, useMemo, useEffect, useCallback } = React;

const C = {
  bg: '#f4ede0',
  paper: '#fbf6ec',
  deep: '#ebe0cc',
  ink: '#1c1814',
  soft: '#5b4f3f',
  mute: '#8a7d6a',
  red: '#b94e3d',
  gold: '#a98648',
  blue: '#3b4a6b',
  green: '#6b7a3a',
  border: '#d6c9b0',
  lite: '#e8dcc4',
};

// ============================================================
// 【手順】ここに、ご提示いただいた元のコードから
// 以下の3つの変数をそのままコピーして貼り付けてください。
// 1. const prefectures = [ ... ];
// 2. const regions = ['すべて', ...];
// 3. const descriptions = { ... };
// ※「const allTags」は今回使用していないため不要です。
// ============================================================



// ============================================================
// 以下はそのままコピーしてください
// ============================================================

function ListView({ onSelect, favorites, onToggleFav, search, setSearch, region, setRegion }) {
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return prefectures.filter(p => {
      const regionOk = region === 'すべて' || p.region === region;
      if (!regionOk) return false;
      if (!q) return true;
      return [
        p.name, p.reading, p.capital, p.region,
        ...p.food, ...p.specialties, ...p.nature,
        ...p.old_kuni, ...p.tags,
      ].join(' ').toLowerCase().includes(q);
    });
  }, [search, region]);

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <div style={{ backgroundColor: C.paper, borderBottom: `1px solid ${C.border}`, padding: '16px' }}>
        <div style={{ fontFamily: "'Shippori Mincho', serif", fontSize: '22px', fontWeight: 800, color: C.ink, marginBottom: '4px' }}>
          日本<span style={{ color: C.red }}>四十七</span>都道府県
        </div>
        <div style={{ fontSize: '11px', color: C.mute, letterSpacing: '0.1em' }}>
          タップで詳細・解説を表示
        </div>
      </div>

      <div style={{ padding: '12px 16px 8px', backgroundColor: C.paper, borderBottom: `1px solid ${C.lite}` }}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="県名・食・特産・旧国名で検索"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '10px 12px', fontSize: '14px',
            border: `1px solid ${C.border}`, borderRadius: '6px',
            backgroundColor: C.bg, color: C.ink, outline: 'none',
          }}
        />
      </div>

      <div style={{ overflowX: 'auto', whiteSpace: 'nowrap', padding: '8px 16px', backgroundColor: C.paper, borderBottom: `1px solid ${C.border}` }}>
        {regions.map(r => (
          <span
            key={r}
            onClick={() => setRegion(r)}
            style={{
              display: 'inline-block', marginRight: '6px',
              padding: '5px 12px', fontSize: '12px', borderRadius: '20px',
              cursor: 'pointer', userSelect: 'none',
              backgroundColor: region === r ? C.ink : C.bg,
              color: region === r ? C.paper : C.soft,
              border: `1px solid ${region === r ? C.ink : C.border}`,
            }}
          >
            {r}
          </span>
        ))}
      </div>

      <div style={{ padding: '8px 16px', fontSize: '12px', color: C.mute }}>
        {filtered.length}件表示
      </div>

      <div style={{ padding: '0 12px 24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '10px' }}>
        {filtered.map(p => (
          <div
            key={p.id}
            onClick={() => onSelect(p)}
            style={{
              backgroundColor: C.paper, borderRadius: '8px',
              border: `1px solid ${C.border}`, padding: '14px 12px',
              cursor: 'pointer', userSelect: 'none',
              borderLeft: `3px solid ${C.red}`,
              WebkitTapHighlightColor: 'rgba(185,78,61,0.15)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontFamily: "'Shippori Mincho', serif", fontSize: '18px', fontWeight: 700, color: C.ink }}>{p.name}</div>
                <div style={{ fontSize: '10px', color: C.mute, marginTop: '2px' }}>{p.reading}</div>
              </div>
              <div
                onClick={e => { e.stopPropagation(); onToggleFav(p.id); }}
                style={{ padding: '4px', cursor: 'pointer', fontSize: '16px', lineHeight: 1 }}
              >
                {favorites.has(p.id) ? '★' : '☆'}
              </div>
            </div>
            <div style={{ marginTop: '8px', fontSize: '11px', color: C.soft }}>
              <span style={{ color: C.red, fontSize: '10px' }}>{p.region}</span>
              {' · '}{p.capital}
            </div>
            <div style={{ marginTop: '6px', fontSize: '11px', color: C.soft, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
              {p.food[0]}・{p.food[1] || p.specialties[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DescBox({ item, prefName, onClose }) {
  const text = descriptions[item] || null;
  return (
    <div style={{
      margin: '8px 0', padding: '14px',
      backgroundColor: C.deep, borderRadius: '8px',
      border: `2px solid ${C.gold}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <div style={{ fontSize: '15px', fontWeight: 700, color: C.ink, fontFamily: "'Shippori Mincho', serif" }}>{item}</div>
        <div
          onClick={onClose}
          style={{ padding: '2px 8px', fontSize: '18px', cursor: 'pointer', color: C.mute, lineHeight: 1 }}
        >×</div>
      </div>
      {text ? (
        <>
          <div style={{ fontSize: '10px', color: C.green, marginBottom: '6px' }}>● 解説データあり</div>
          <div style={{ fontSize: '13px', color: C.ink, lineHeight: 1.7 }}>{text}</div>
        </>
      ) : (
        <div style={{ fontSize: '13px', color: C.soft, lineHeight: 1.7 }}>
          この項目の解説データはまだ準備中です。
        </div>
      )}
    </div>
  );
}

function Section({ label, items, selectedItem, onSelect }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ fontSize: '10px', color: C.mute, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '6px', paddingTop: '12px' }}>
        {label}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => onSelect(item)}
            style={{
              padding: '6px 10px', fontSize: '13px',
              backgroundColor: selectedItem === item ? C.gold : C.paper,
              color: selectedItem === item ? '#fff' : C.ink,
              border: `1px solid ${selectedItem === item ? C.gold : C.border}`,
              borderRadius: '4px', cursor: 'pointer',
              userSelect: 'none',
              WebkitTapHighlightColor: 'rgba(169,134,72,0.2)',
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailView({ pref, onBack, isFavorite, onToggleFav }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(prev => prev === item ? null : item);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <div
        onClick={onBack}
        style={{
          backgroundColor: C.ink, color: C.paper,
          padding: '14px 16px', fontSize: '15px',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
          userSelect: 'none', WebkitTapHighlightColor: 'rgba(255,255,255,0.2)',
        }}
      >
        <span style={{ fontSize: '20px' }}>←</span>
        <span>一覧に戻る</span>
      </div>

      <div style={{ backgroundColor: C.paper, padding: '16px', borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontFamily: "'Shippori Mincho', serif", fontSize: '28px', fontWeight: 800, color: C.red }}>{pref.id}</span>
              <span style={{ fontFamily: "'Shippori Mincho', serif", fontSize: '26px', fontWeight: 700, color: C.ink }}>{pref.name}</span>
            </div>
            <div style={{ fontSize: '12px', color: C.mute, marginTop: '2px' }}>{pref.reading} · {pref.region} · {pref.capital}</div>
          </div>
          <div
            onClick={() => onToggleFav(pref.id)}
            style={{ padding: '8px', fontSize: '24px', cursor: 'pointer', lineHeight: 1 }}
          >
            {isFavorite ? '★' : '☆'}
          </div>
        </div>
        <div style={{ marginTop: '10px', padding: '10px', backgroundColor: C.deep, borderRadius: '6px', fontSize: '13px', color: C.ink, lineHeight: 1.6 }}>
          💡 {pref.trivia}
        </div>
        <div style={{ marginTop: '8px', fontSize: '11px', color: C.green }}>
          ▼ 各項目をタップすると解説が表示されます
        </div>
      </div>

      {selected && (
        <div style={{ padding: '8px 16px' }}>
          <DescBox item={selected} prefName={pref.name} onClose={() => setSelected(null)} />
        </div>
      )}

      <div style={{ padding: '8px 16px 32px' }}>
        <div style={{ backgroundColor: C.paper, borderRadius: '8px', padding: '12px', marginBottom: '8px', border: `1px solid ${C.border}` }}>
          {[
            ['面積', `${pref.area.toLocaleString()} km²`],
            ['人口', `約${pref.population}万人`],
            ['最高峰', pref.highest_peak],
            ['主要河川', pref.main_river],
            ['旧国名', pref.old_kuni.join('・')],
            ['県の花', pref.flower],
            ['県の木', pref.tree],
            ['県の鳥', pref.bird],
          ].map(([k, v]) => (
            <div key={k} style={{ display: 'flex', gap: '12px', padding: '5px 0', borderBottom: `1px solid ${C.lite}`, fontSize: '13px' }}>
              <span style={{ color: C.mute, minWidth: '70px', flexShrink: 0 }}>{k}</span>
              <span style={{ color: C.ink }}>{v}</span>
            </div>
          ))}
          {pref.dialect && (
            <div style={{ padding: '8px 0 2px', fontSize: '13px', color: C.ink }}>
              <span style={{ color: C.mute }}>方言　</span>
              <span style={{ fontWeight: 700, color: C.blue }}>「{pref.dialect.word}」</span>
              <span> = {pref.dialect.meaning}</span>
            </div>
          )}
        </div>

        <div style={{ backgroundColor: C.paper, borderRadius: '8px', padding: '12px 12px 16px', border: `1px solid ${C.border}` }}>
          <Section label="名所・史跡" items={pref.shrines} selectedItem={selected} onSelect={handleSelect} />
          <Section label="自然・景勝地" items={pref.nature} selectedItem={selected} onSelect={handleSelect} />
          <Section label="食・郷土料理" items={pref.food} selectedItem={selected} onSelect={handleSelect} />
          <Section label="特産品・工芸" items={pref.specialties} selectedItem={selected} onSelect={handleSelect} />
          <Section label="祭り・行事" items={pref.festivals} selectedItem={selected} onSelect={handleSelect} />
          <Section label="主要産業" items={pref.industries} selectedItem={selected} onSelect={handleSelect} />
          <Section label="日本一" items={pref.nihon_ichi} selectedItem={selected} onSelect={handleSelect} />
          <Section label="ゆかりの人物" items={pref.people} selectedItem={selected} onSelect={handleSelect} />
          <Section label="作品・聖地" items={pref.media} selectedItem={selected} onSelect={handleSelect} />
        </div>

        {pref.meibutsu_origin && (
          <div style={{ marginTop: '8px', backgroundColor: C.paper, borderRadius: '8px', padding: '12px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '10px', color: C.gold, letterSpacing: '0.15em', marginBottom: '6px' }}>◆ 由来エピソード</div>
            <div style={{ fontSize: '13px', color: C.ink, lineHeight: 1.7 }}>{pref.meibutsu_origin}</div>
          </div>
        )}

        {pref.neighbors && pref.neighbors.length > 0 && (
          <div style={{ marginTop: '8px', backgroundColor: C.paper, borderRadius: '8px', padding: '12px', border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: '10px', color: C.mute, letterSpacing: '0.15em', marginBottom: '8px' }}>隣接する県</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {pref.neighbors.map(id => {
                const n = prefectures.find(x => x.id === id);
                return n ? (
                  <div key={id} style={{ padding: '5px 10px', fontSize: '12px', backgroundColor: C.bg, border: `1px solid ${C.border}`, borderRadius: '4px', color: C.ink, cursor: 'pointer' }}>
                    {n.name}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}

        <div style={{ marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {pref.tags.map((t, i) => (
            <span key={i} style={{ padding: '3px 8px', fontSize: '11px', backgroundColor: 'rgba(59,74,107,0.08)', color: C.blue, border: `1px solid rgba(59,74,107,0.25)`, borderRadius: '4px' }}>
              #{t}
            </span>
          ))}
        </div>

        <div
          onClick={onBack}
          style={{
            marginTop: '24px', backgroundColor: C.ink, color: C.paper,
            padding: '14px', borderRadius: '8px', textAlign: 'center',
            fontSize: '15px', cursor: 'pointer', userSelect: 'none',
            WebkitTapHighlightColor: 'rgba(255,255,255,0.2)',
          }}
        >
          ← 一覧に戻る
        </div>
      </div>
    </div>
  );
}

function JapanPrefecturesApp() {
  const [selectedPref, setSelectedPref] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('すべて');

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@700;800&display=swap';
    document.head.appendChild(link);
  }, []);

  const toggleFav = useCallback((id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleSelect = (pref) => {
    setSelectedPref(pref);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedPref(null);
    window.scrollTo(0, 0);
  };

  if (selectedPref) {
    return (
      <DetailView
        pref={selectedPref}
        onBack={handleBack}
        isFavorite={favorites.has(selectedPref.id)}
        onToggleFav={toggleFav}
      />
    );
  }

  return (
    <ListView
      onSelect={handleSelect}
      favorites={favorites}
      onToggleFav={toggleFav}
      search={search}
      setSearch={setSearch}
      region={region}
      setRegion={setRegion}
    />
  );
}

// ReactをHTMLにマウント（描画）する処理
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<JapanPrefecturesApp />);
