// ===== MOCK DATA =====
const cards = [
  { id:1, name:"토스 캐시백 카드", type:"credit", issuer:"하나카드", annualFee:15000, benefits:["캐시백","온라인쇼핑"], highlights:[{category:"온라인 쇼핑",description:"국내 온라인 가맹점 5% 캐시백\n해외 온라인 3% 캐시백",rate:"5%"},{category:"교통",description:"대중교통 10% 할인\n주유 리터당 60원 할인",rate:"10%"},{category:"카페/편의점",description:"스타벅스 20% 할인\n편의점 10% 할인",rate:"20%"}], minSpend:"30만원", tags:["인기","캐시백"] },
  { id:2, name:"현대 마일리지 플러스", type:"credit", issuer:"현대카드", annualFee:30000, benefits:["마일리지","여행"], highlights:[{category:"항공 마일리지",description:"국내외 가맹점 1.5 마일 적립\n항공권 구매 시 3배 적립",rate:"1.5"},{category:"여행",description:"해외 가맹점 2% 추가\n공항 라운지 무료",rate:"2%"},{category:"호텔",description:"제휴 호텔 15% 할인",rate:"15%"}], minSpend:"50만원", tags:["마일리지"] },
  { id:3, name:"KB 쇼핑 할인 카드", type:"credit", issuer:"KB국민카드", annualFee:20000, benefits:["할인","쇼핑"], highlights:[{category:"쇼핑",description:"백화점 15% 할인\n온라인몰 10% 할인",rate:"15%"},{category:"카페",description:"스타벅스, 투썸 10% 할인",rate:"10%"},{category:"외식",description:"패밀리 레스토랑 5% 할인",rate:"5%"}], minSpend:"40만원", tags:["추천","할인"] },
  { id:4, name:"신한 딥드림 체크", type:"debit", issuer:"신한카드", annualFee:0, benefits:["캐시백","교통"], highlights:[{category:"교통",description:"대중교통 10% 캐시백\n택시 5% 캐시백",rate:"10%"},{category:"편의점",description:"CU, GS25 5% 캐시백",rate:"5%"},{category:"카페",description:"이디야, 메가 5% 캐시백",rate:"5%"}], minSpend:"없음", tags:["무실적"] },
  { id:5, name:"삼성 taptap O", type:"credit", issuer:"삼성카드", annualFee:15000, benefits:["캐시백","카페"], highlights:[{category:"카페",description:"스타벅스 30% 할인\n모든 카페 10% 할인",rate:"30%"},{category:"편의점",description:"CU, GS25 10% 할인",rate:"10%"},{category:"배달",description:"배민, 쿠팡이츠 5%",rate:"5%"}], minSpend:"30만원", tags:["인기","카페"] },
  { id:6, name:"NH 올원 체크", type:"debit", issuer:"NH농협카드", annualFee:0, benefits:["캐시백","마트"], highlights:[{category:"마트",description:"이마트, 홈플러스 5%\n온라인 마트 3%",rate:"5%"},{category:"교통",description:"대중교통 5% 캐시백",rate:"5%"},{category:"통신",description:"통신료 2% 캐시백",rate:"2%"}], minSpend:"없음", tags:["신규"] },
  { id:7, name:"롯데 L.POINT 카드", type:"credit", issuer:"롯데카드", annualFee:10000, benefits:["할인","쇼핑"], highlights:[{category:"롯데 계열",description:"롯데백화점 10%\n롯데마트 5%\n롯데시네마 무료",rate:"10%"},{category:"온라인",description:"롯데ON 5% 추가 할인",rate:"5%"},{category:"주유",description:"리터당 80원 할인",rate:"80원"}], minSpend:"30만원", tags:["할인"] },
  { id:8, name:"우리 카드의 정석", type:"credit", issuer:"우리카드", annualFee:15000, benefits:["캐시백","교통"], highlights:[{category:"교통",description:"대중교통 15% 캐시백\n주유 리터당 100원",rate:"15%"},{category:"통신",description:"통신료 3% 캐시백",rate:"3%"},{category:"공과금",description:"공과금 1% 캐시백",rate:"1%"}], minSpend:"30만원", tags:["교통"] },
  { id:9, name:"하나 체크 1Q", type:"debit", issuer:"하나카드", annualFee:0, benefits:["캐시백","생활"], highlights:[{category:"생활",description:"편의점, 카페 5%\n온라인쇼핑 3%",rate:"5%"},{category:"교통",description:"대중교통 5%",rate:"5%"},{category:"의료",description:"병원, 약국 3%",rate:"3%"}], minSpend:"없음", tags:["무실적","생활"] },
  { id:10, name:"현대 M포인트 체크", type:"debit", issuer:"현대카드", annualFee:0, benefits:["마일리지","쇼핑"], highlights:[{category:"M포인트",description:"전 가맹점 0.5% 적립\n온라인 1% 적립",rate:"1%"},{category:"쇼핑",description:"백화점 추가 2% 적립",rate:"2%"}], minSpend:"없음", tags:[] },
  { id:11, name:"KB 톡톡 My", type:"credit", issuer:"KB국민카드", annualFee:50000, benefits:["캐시백","마일리지","쇼핑"], highlights:[{category:"캐시백",description:"전 가맹점 1.5% 캐시백\n온라인 3%",rate:"3%"},{category:"마일리지",description:"항공 마일리지 전환 가능",rate:""},{category:"VIP",description:"공항 라운지, 발렛파킹",rate:"무료"}], minSpend:"70만원", tags:["프리미엄"] },
  { id:12, name:"신한 Deep Oil", type:"credit", issuer:"신한카드", annualFee:10000, benefits:["주유","교통"], highlights:[{category:"주유",description:"리터당 최대 120원 할인\nSK, GS, S-Oil 전체",rate:"120원"},{category:"교통",description:"하이패스 5%",rate:"5%"},{category:"정비",description:"차량 정비 10% 할인",rate:"10%"}], minSpend:"40만원", tags:["주유"] },
  { id:13, name:"카카오뱅크 프렌즈 체크", type:"debit", issuer:"카카오뱅크", annualFee:0, benefits:["캐시백","생활"], highlights:[{category:"캐시백",description:"전 가맹점 0.2% 캐시백\n온라인 결제 0.4%",rate:"0.4%"},{category:"교통",description:"대중교통 5% 캐시백",rate:"5%"},{category:"생활",description:"편의점, 카페 5%",rate:"5%"}], minSpend:"없음", tags:["인기","무실적"] },
  { id:14, name:"토스뱅크 체크카드", type:"debit", issuer:"토스뱅크", annualFee:0, benefits:["캐시백","생활"], highlights:[{category:"캐시백",description:"전 가맹점 0.3% 캐시백\n토스페이 결제 시 0.5%",rate:"0.5%"},{category:"교통",description:"대중교통 5%",rate:"5%"},{category:"쇼핑",description:"온라인 쇼핑 1%",rate:"1%"}], minSpend:"없음", tags:["신규","무실적"] },
  { id:15, name:"IBK 참 좋은 카드", type:"credit", issuer:"IBK기업은행", annualFee:12000, benefits:["캐시백","할인"], highlights:[{category:"할인",description:"주유 리터당 60원\n통신비 2%",rate:"60원"},{category:"캐시백",description:"전 가맹점 0.7%",rate:"0.7%"},{category:"생활",description:"공과금 1%",rate:"1%"}], minSpend:"30만원", tags:["생활"] },
  { id:16, name:"케이뱅크 MY체크카드", type:"debit", issuer:"케이뱅크", annualFee:0, benefits:["캐시백","교통"], highlights:[{category:"캐시백",description:"온라인 쇼핑 1%\n오프라인 0.3%",rate:"1%"},{category:"교통",description:"대중교통 5% 캐시백",rate:"5%"},{category:"편의점",description:"CU, GS25 5%",rate:"5%"}], minSpend:"없음", tags:["무실적"] },
];

const benefitCategories = ["캐시백","마일리지","할인","교통","쇼핑","카페","주유","생활","여행","마트","외식/배달","통신","의료","영화/문화"];
const issuers = ["신한카드","삼성카드","현대카드","KB국민카드","하나카드","우리카드","롯데카드","NH농협카드","IBK기업은행","카카오뱅크","토스뱅크","케이뱅크"];

const aiResponses = {
  default: {
    summary: "소비 패턴을 분석한 맞춤 추천입니다",
    reason: "입력하신 내용을 바탕으로 혜택이 가장 큰 카드를 선별했습니다.",
    cards: [cards[0], cards[4], cards[2]],
    reasons: ["온라인 쇼핑 5% 캐시백으로 월 10만원 절약","카페 할인 30%로 커피값 절감","백화점/쇼핑몰 할인으로 생활비 절약"]
  }
};

// ===== STATE =====
const AppState = {
  filters: { type: null, benefits: [], issuer: null, maxFee: 100000, maxSpend: null },
  compareCards: [],
  aiInput: "",
  aiResult: null,
  currentRoute: "#/",
  detailCardId: null,
  searchExecuted: false,

  update(key, value) {
    this[key] = value;
    try { sessionStorage.setItem("appState", JSON.stringify(this)); } catch(e) {}
  },
  restore() {
    try {
      const s = sessionStorage.getItem("appState");
      if (s) { const p = JSON.parse(s); Object.assign(this, p); }
    } catch(e) {}
  }
};

// ===== ROUTING =====
function navigateTo(hash) { window.location.hash = hash; }

function showPage(hash) {
  const route = hash.split("?")[0] || "#/";
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".header__link").forEach(l => l.classList.remove("active"));

  let pageId, navKey;
  if (route === "#/" || route === "") { pageId = "page-home"; navKey = "home"; }
  else if (route === "#/search") { pageId = "page-search"; navKey = "search"; }
  else if (route === "#/ai") { pageId = "page-ai"; navKey = "ai"; }
  else if (route === "#/compare") { pageId = "page-compare"; navKey = "compare"; }
  else if (route.startsWith("#/detail")) { pageId = "page-detail"; navKey = ""; }
  else { pageId = "page-home"; navKey = "home"; }

  const page = document.getElementById(pageId);
  if (page) page.classList.add("active");
  const nav = document.querySelector(`[data-nav="${navKey}"]`);
  if (nav) nav.classList.add("active");

  // close mobile nav
  document.querySelector(".header__nav").classList.remove("open");

  // page-specific render
  if (pageId === "page-home") renderHome();
  else if (pageId === "page-search") renderSearch();
  else if (pageId === "page-ai") renderAI();
  else if (pageId === "page-compare") renderCompare();
  else if (pageId === "page-detail") renderDetail();

  updateCompareBar();
  AppState.update("currentRoute", hash);
  window.scrollTo(0, 0);
}

window.addEventListener("hashchange", () => showPage(window.location.hash));

// ===== CARD RENDERING =====
function cardHTML(card, mode = "list", rank = null) {
  const isCompared = AppState.compareCards.includes(card.id);
  const benefitText = card.highlights.map(h => `${h.category} ${h.rate}`).join(" · ");
  const feeText = card.annualFee === 0 ? "연회비 무료" : `연회비 ${(card.annualFee/10000).toFixed(0)}만원`;
  const tagsHTML = card.tags.map(t => `<span class="card__tag">${t}</span>`).join("");

  if (mode === "list") {
    return `<div class="card card--list" onclick="goDetail(${card.id})">
      <div class="card__img"></div>
      <div class="card__info">
        <div class="card__name">${card.name}</div>
        <div class="card__meta">${benefitText} · ${feeText}</div>
        <div class="card__tags">${tagsHTML}</div>
      </div>
      <div class="card__check ${isCompared ? "checked" : ""}" onclick="event.stopPropagation(); toggleCompare(${card.id})">
        ${isCompared ? "✓" : ""}
      </div>
    </div>`;
  }

  const rankHTML = rank !== null ? `<span class="card__rank">${rank}순위</span>` : "";
  const reasonHTML = rank !== null && AppState.aiResult ?
    `<div class="card__reason">💡 ${AppState.aiResult.reasons[rank-1] || ""}</div>` : "";

  return `<div class="card card--grid ${rank ? "card--ai" : ""}" onclick="goDetail(${card.id})">
    ${rankHTML}
    <div class="card__img"></div>
    <div class="card__info">
      <div class="card__name">${card.name}</div>
      <div class="card__meta">${feeText} · ${card.issuer}</div>
      <div class="card__tags">${tagsHTML}</div>
    </div>
    ${reasonHTML}
    <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
      <div class="card__check ${isCompared ? "checked" : ""}" onclick="event.stopPropagation(); toggleCompare(${card.id})">
        ${isCompared ? "✓" : ""}
      </div>
      <span style="font-size:12px;color:var(--color-text-secondary)">비교에 추가</span>
    </div>
  </div>`;
}

// ===== FILTER LOGIC =====
function filterCards() {
  let result = [...cards];
  const f = AppState.filters;
  if (f.type) result = result.filter(c => c.type === f.type);
  if (f.benefits.length) result = result.filter(c => f.benefits.some(b => c.benefits.includes(b)));
  if (f.issuer) result = result.filter(c => c.issuer === f.issuer);
  if (f.maxFee < 100000) result = result.filter(c => c.annualFee <= f.maxFee);
  if (f.maxSpend !== null) {
    if (f.maxSpend === 0) result = result.filter(c => c.minSpend === "없음");
    else result = result.filter(c => c.minSpend === "없음" || parseInt(c.minSpend) <= f.maxSpend / 10000);
  }

  const sort = document.getElementById("sort-select")?.value || "popular";
  if (sort === "fee-low") result.sort((a,b) => a.annualFee - b.annualFee);
  else if (sort === "fee-high") result.sort((a,b) => b.annualFee - a.annualFee);

  return result;
}

function setCardType(type) {
  const current = AppState.filters.type;
  AppState.update("filters", { ...AppState.filters, type: current === type ? null : type });
  renderHome();
}

function toggleBenefit(benefit) {
  const benefits = [...AppState.filters.benefits];
  const idx = benefits.indexOf(benefit);
  if (idx >= 0) benefits.splice(idx, 1); else benefits.push(benefit);
  AppState.update("filters", { ...AppState.filters, benefits });
  if (document.getElementById("page-search").classList.contains("active")) renderSearch();
  else renderHome();
}

function removeFilter(key, value) {
  if (key === "type") AppState.update("filters", { ...AppState.filters, type: null });
  else if (key === "benefit") {
    const b = AppState.filters.benefits.filter(x => x !== value);
    AppState.update("filters", { ...AppState.filters, benefits: b });
  }
  else if (key === "issuer") AppState.update("filters", { ...AppState.filters, issuer: null });
  else if (key === "fee") AppState.update("filters", { ...AppState.filters, maxFee: 100000 });
  renderSearch();
}

function setIssuer(value) {
  AppState.update("filters", { ...AppState.filters, issuer: value || null });
  if (document.getElementById("page-search").classList.contains("active")) renderSearch();
}

function setMinSpend(value) {
  AppState.update("filters", { ...AppState.filters, maxSpend: value === "" ? null : parseInt(value) });
  if (document.getElementById("page-search").classList.contains("active")) renderSearch();
}

function setFeeRange(value) {
  const v = parseInt(value);
  AppState.update("filters", { ...AppState.filters, maxFee: v });
  const label = document.getElementById("fee-range-value");
  if (label) label.textContent = v >= 100000 ? "제한 없음" : `${(v/10000).toFixed(0)}만원 이하`;
  if (document.getElementById("page-search").classList.contains("active")) renderSearch();
}

function resetFilters() {
  AppState.update("filters", { type: null, benefits: [], issuer: null, maxFee: 100000, maxSpend: null });
  const feeRange = document.getElementById("fee-range");
  if (feeRange) { feeRange.value = 100000; }
  const feeLabel = document.getElementById("fee-range-value");
  if (feeLabel) feeLabel.textContent = "제한 없음";
  const issuerSelect = document.getElementById("issuer-select");
  if (issuerSelect) issuerSelect.value = "";
  renderSearch();
}

// ===== COMPARE =====
function toggleCompare(cardId) {
  const list = [...AppState.compareCards];
  const idx = list.indexOf(cardId);
  if (idx >= 0) list.splice(idx, 1);
  else { if (list.length >= 3) { alert("최대 3개까지 비교할 수 있어요"); return; } list.push(cardId); }
  AppState.update("compareCards", list);
  updateCompareBar();
  // re-render current page
  showPage(window.location.hash);
}

function updateCompareBar() {
  const bar = document.getElementById("compare-bar");
  const count = AppState.compareCards.length;
  const onDetail = window.location.hash.startsWith("#/detail");
  const onCompare = window.location.hash === "#/compare";
  if (count > 0 && !onDetail && !onCompare) {
    bar.classList.add("visible");
    document.getElementById("compare-bar-count").textContent = `${count}개 선택됨`;
  } else {
    bar.classList.remove("visible");
  }
}

// ===== NAVIGATION =====
function goDetail(cardId) {
  AppState.update("detailCardId", cardId);
  navigateTo("#/detail?id=" + cardId);
}

// ===== PAGE RENDERERS =====
function renderHome() {
  // Tabs
  document.querySelectorAll("#home-tabs .tab").forEach(t => {
    t.classList.toggle("active", t.dataset.type === AppState.filters.type);
  });
  if (!AppState.filters.type) document.querySelector('#home-tabs .tab[data-type="credit"]').classList.add("active");

  // Filter tags
  const filtersEl = document.getElementById("home-filters");
  filtersEl.innerHTML = benefitCategories.map(b =>
    `<span class="tag ${AppState.filters.benefits.includes(b) ? "active" : ""}" onclick="toggleBenefit('${b}')">${b}</span>`
  ).join("");

  // Issuer select
  const issuerSelect = document.getElementById("issuer-select");
  if (issuerSelect && issuerSelect.options.length <= 1) {
    issuers.forEach(iss => {
      const opt = document.createElement("option");
      opt.value = iss; opt.textContent = iss;
      issuerSelect.appendChild(opt);
    });
  }
  if (issuerSelect && AppState.filters.issuer) issuerSelect.value = AppState.filters.issuer;

  // Fee range
  const feeRange = document.getElementById("fee-range");
  if (feeRange) feeRange.value = AppState.filters.maxFee;
  const feeLabel = document.getElementById("fee-range-value");
  if (feeLabel) feeLabel.textContent = AppState.filters.maxFee >= 100000 ? "제한 없음" : `${(AppState.filters.maxFee/10000).toFixed(0)}만원 이하`;

  // Popular cards (grid on desktop)
  const popularEl = document.getElementById("popular-cards");
  const popular = cards.filter(c => c.tags.includes("인기")).slice(0, 4);
  const popCards = popular.length ? popular : cards.slice(0, 3);
  popularEl.className = "card-grid";
  popularEl.innerHTML = popCards.map(c => cardHTML(c, "grid")).join("");
}

function renderSearch() {
  // Sync filter UI on search page
  syncSearchFilterUI();

  const resultsSection = document.getElementById("search-results-section");
  const filterSection = document.querySelector(".search-filter-section");

  if (!AppState.searchExecuted) {
    // 검색 전: 필터 UI만 보이고 결과는 숨김
    resultsSection.style.display = "none";
    filterSection.style.display = "";
    return;
  }

  // 검색 후: 필터 UI 숨기고 결과 보여줌
  filterSection.style.display = "none";
  resultsSection.style.display = "";

  const results = filterCards();
  const countEl = document.getElementById("search-count");
  const gridEl = document.getElementById("search-grid");
  const container = document.getElementById("search-results");
  const filtersEl = document.getElementById("search-filters");

  // Active filters
  let filterHTML = "";
  if (AppState.filters.type) filterHTML += `<span class="tag tag--active" onclick="removeFilter('type')">${AppState.filters.type === "credit" ? "신용카드" : "체크카드"} <span class="tag__remove">✕</span></span>`;
  AppState.filters.benefits.forEach(b => {
    filterHTML += `<span class="tag tag--active" onclick="removeFilter('benefit','${b}')">${b} <span class="tag__remove">✕</span></span>`;
  });
  if (AppState.filters.issuer) filterHTML += `<span class="tag tag--active" onclick="removeFilter('issuer')">${AppState.filters.issuer} <span class="tag__remove">✕</span></span>`;
  if (AppState.filters.maxFee < 100000) filterHTML += `<span class="tag tag--active" onclick="removeFilter('fee')">연회비 ${(AppState.filters.maxFee/10000).toFixed(0)}만원 이하 <span class="tag__remove">✕</span></span>`;
  filtersEl.innerHTML = filterHTML;
  filtersEl.style.display = filterHTML ? "" : "none";

  if (results.length === 0) {
    container.dataset.state = "empty";
    countEl.textContent = "";
  } else {
    container.dataset.state = "default";
    countEl.textContent = `${results.length}개의 카드를 찾았어요`;
    gridEl.innerHTML = results.map(c => cardHTML(c, "grid")).join("");
  }
}

function syncSearchFilterUI() {
  // Tabs
  document.querySelectorAll("#search-tabs .tab").forEach(t => {
    t.classList.toggle("active", t.dataset.type === AppState.filters.type);
  });
  if (!AppState.filters.type) {
    const defTab = document.querySelector('#search-tabs .tab[data-type="credit"]');
    if (defTab) defTab.classList.add("active");
  }

  // Benefit tags
  const tagsEl = document.getElementById("search-benefit-tags");
  if (tagsEl) {
    tagsEl.innerHTML = benefitCategories.map(b =>
      `<span class="tag ${AppState.filters.benefits.includes(b) ? "active" : ""}" onclick="toggleBenefit('${b}')">${b}</span>`
    ).join("");
  }

  // Issuer select
  const issuerSelect = document.getElementById("search-issuer-select");
  if (issuerSelect && issuerSelect.options.length <= 1) {
    issuers.forEach(iss => {
      const opt = document.createElement("option");
      opt.value = iss; opt.textContent = iss;
      issuerSelect.appendChild(opt);
    });
  }
  if (issuerSelect && AppState.filters.issuer) issuerSelect.value = AppState.filters.issuer;

  // Spend select
  const spendSelect = document.getElementById("search-spend-select");
  if (spendSelect) spendSelect.value = AppState.filters.maxSpend !== null ? AppState.filters.maxSpend : "";

  // Fee range
  const feeRange = document.getElementById("search-fee-range");
  if (feeRange) feeRange.value = AppState.filters.maxFee;
  const feeLabel = document.getElementById("search-fee-range-value");
  if (feeLabel) feeLabel.textContent = AppState.filters.maxFee >= 100000 ? "제한 없음" : `${(AppState.filters.maxFee/10000).toFixed(0)}만원 이하`;
}

function executeSearch() {
  AppState.update("searchExecuted", true);
  renderSearch();
}

function executeSearchFromHome() {
  AppState.update("searchExecuted", true);
  navigateTo("#/search");
}

function resetSearchAndHideResults() {
  AppState.update("filters", { type: null, benefits: [], issuer: null, maxFee: 100000, maxSpend: null });
  AppState.update("searchExecuted", false);
  renderSearch();
}

function submitAI(input) {
  if (!input.trim()) return;
  AppState.update("aiInput", input);
  AppState.update("aiResult", null);
  navigateTo("#/ai");
}

function retryAI(input) {
  if (!input.trim()) return;
  AppState.update("aiInput", input);
  AppState.update("aiResult", null);
  const container = document.getElementById("ai-container");
  container.dataset.state = "loading";
  window.scrollTo(0, 0);
  setTimeout(() => {
    AppState.update("aiResult", aiResponses.default);
    container.dataset.state = "default";
    fillAIContent();
  }, 2000);
}

function renderAI() {
  const container = document.getElementById("ai-container");

  if (!AppState.aiInput) {
    container.dataset.state = "input";
    return;
  }

  if (!AppState.aiResult) {
    container.dataset.state = "loading";
    setTimeout(() => {
      AppState.update("aiResult", aiResponses.default);
      container.dataset.state = "default";
      fillAIContent();
    }, 2000);
  } else {
    container.dataset.state = "default";
    fillAIContent();
  }
}

function fillAIContent() {
  const r = AppState.aiResult;
  if (!r) return;
  document.getElementById("ai-user-input").textContent = `"${AppState.aiInput}"`;
  document.getElementById("ai-result-text").textContent = `소비 패턴에 맞는 카드 ${r.cards.length}장을 골랐어요`;
  document.getElementById("ai-grid").innerHTML = r.cards.map((c, i) => cardHTML(c, "grid", i + 1)).join("");
  const retryInput = document.getElementById("ai-retry-input");
  if (retryInput) retryInput.placeholder = AppState.aiInput;
}

function renderCompare() {
  const container = document.getElementById("compare-container");
  const ids = AppState.compareCards;

  if (ids.length < 2) {
    container.dataset.state = "empty";
    const emptyText = container.querySelector(".empty-state__text");
    const emptySub = container.querySelector(".empty-state__sub");
    if (ids.length === 1) {
      if (emptyText) emptyText.textContent = "카드를 1개 더 추가해주세요";
      if (emptySub) emptySub.textContent = "비교하려면 최소 2개의 카드가 필요해요";
    } else {
      if (emptyText) emptyText.textContent = "비교할 카드를 선택해주세요";
      if (emptySub) emptySub.textContent = "검색 또는 AI 추천에서 카드를 선택할 수 있어요";
    }
    return;
  }

  container.dataset.state = "default";
  const cCards = ids.map(id => cards.find(c => c.id === id)).filter(Boolean);
  const cols = cCards.length;
  const table = document.getElementById("compare-table");
  table.className = `compare-table compare-table--${cols}`;

  const rows = ["연회비","캐시백","주요 혜택","전월 실적","카드사"];
  const getVal = (card, row) => {
    if (row === "연회비") return card.annualFee === 0 ? "무료" : `${(card.annualFee/10000).toFixed(0)}만원`;
    if (row === "캐시백") return card.highlights[0]?.rate || "-";
    if (row === "주요 혜택") return card.highlights.map(h => h.category).join(", ");
    if (row === "전월 실적") return card.minSpend;
    if (row === "카드사") return card.issuer;
    return "-";
  };

  let html = "";
  // Header row
  html += `<div class="compare-label" style="border-radius:var(--radius-md) 0 0 0">항목</div>`;
  cCards.forEach(c => {
    html += `<div class="compare-col-header">
      <button class="compare-col-header__remove" onclick="toggleCompare(${c.id})">✕</button>
      <div class="card__img"></div>
      <strong>${c.name}</strong>
    </div>`;
  });

  // Data rows
  rows.forEach((row, i) => {
    html += `<div class="compare-label" style="background:${i%2===0?"#fff":"var(--color-surface)"}">${row}</div>`;
    cCards.forEach(c => {
      html += `<div class="compare-cell" style="background:${i%2===0?"#fff":"var(--color-surface)"}">${getVal(c, row)}</div>`;
    });
  });

  // CTA row
  html += `<div class="compare-label"></div>`;
  cCards.forEach(c => {
    html += `<div class="compare-cta"><button class="btn btn--primary btn--full" onclick="goDetail(${c.id})">발급 신청</button></div>`;
  });

  table.innerHTML = html;
}

function renderDetail() {
  const params = new URLSearchParams(window.location.hash.split("?")[1]);
  const id = parseInt(params.get("id")) || AppState.detailCardId;
  const card = cards.find(c => c.id === id);
  if (!card) { navigateTo("#/"); return; }
  AppState.update("detailCardId", id);

  const isCompared = AppState.compareCards.includes(card.id);
  const feeText = card.annualFee === 0 ? "무료" : `${(card.annualFee/10000).toFixed(0)}만원`;
  const tagsHTML = card.tags.map(t => `<span class="card__tag">${t}</span>`).join("");

  const accordionsHTML = card.highlights.map(h => `
    <div class="accordion" onclick="this.classList.toggle('open')">
      <div class="accordion__header">
        <span>${h.category}</span>
        <span class="accordion__icon">▼</span>
      </div>
      <div class="accordion__body">${h.description}</div>
    </div>
  `).join("");

  document.getElementById("detail-content").innerHTML = `
    <div class="detail__hero">
      <div class="detail__img"></div>
      <h1 class="detail__name">${card.name}</h1>
      <p class="detail__issuer">${card.issuer}</p>
      <div class="detail__stats">
        <div class="stat-box">
          <div class="stat-box__label">연회비</div>
          <div class="stat-box__value">${feeText}</div>
        </div>
        <div class="stat-box">
          <div class="stat-box__label">전월 실적</div>
          <div class="stat-box__value">${card.minSpend}</div>
        </div>
      </div>
      <div class="detail__cta-bar" id="detail-cta-desktop">
        <button class="btn btn--primary">발급 신청</button>
        <button class="btn btn--secondary" onclick="toggleCompare(${card.id})">
          ${isCompared ? "비교에서 제거" : "비교에 추가"}
        </button>
      </div>
    </div>
    <div class="detail__body">
      <div class="detail__benefits">
        <h3>핵심 혜택</h3>
        <div class="card__tags" style="margin-bottom:var(--space-4)">${card.highlights.map(h => `<span class="card__tag">${h.category} ${h.rate}</span>`).join("")}</div>
      </div>
      <div class="detail__benefits">
        <h3>상세 혜택</h3>
        ${accordionsHTML}
      </div>
      <div class="notice">
        <h4>유의사항</h4>
        <p>• 전월 실적 미달 시 혜택 미제공<br>• 연회비는 카드 발급일 기준 부과<br>• 자세한 내용은 카드사 홈페이지 참조</p>
      </div>
    </div>
    <div class="detail__cta-bar" id="detail-cta-mobile">
      <button class="btn btn--secondary" onclick="toggleCompare(${card.id})">
        ${isCompared ? "비교에서 제거" : "비교에 추가"}
      </button>
      <button class="btn btn--primary">발급 신청</button>
    </div>
  `;
}

// ===== INIT =====
AppState.restore();
showPage(window.location.hash || "#/");
