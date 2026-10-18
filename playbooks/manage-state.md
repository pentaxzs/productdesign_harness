# Skill: 상태 관리

## 목적
화면 간 이동 시 사용자의 선택과 입력이 유지되도록 상태를 관리한다.

## 사용하는 Agent
- Prototype Agent (주 사용)

## 절차

### 1. 상태 항목 도출
`specs/user-flow.md`를 읽고, **화면을 벗어났다 돌아왔을 때 사라지면 사용자가 다시 해야 하는 것**을 찾는다.
그게 유지해야 할 상태다.

| 유형 | 설명 | 흔한 예 |
|------|------|---------|
| 필터·검색 조건 | 사용자가 좁혀놓은 조건 | 선택한 카테고리, 범위, 정렬 |
| 선택 집합 | 여러 화면에 걸쳐 모으는 항목 | 비교 목록, 장바구니, 북마크 |
| 대화·입력 내역 | 누적되는 사용자 입력 | 채팅 기록, 작성 중인 폼 |
| 진행 상태 | 여러 단계에 걸친 작업의 현재 위치 | 온보딩 단계, 퀴즈 진도, 학습 스트릭 |
| 현재 화면 | 새로고침 시 복원할 라우트 | `currentRoute` |

**유지하지 않을 상태** — 매번 초기화되는 게 자연스러운 것:
- 제출 전 입력 중인 텍스트
- Dialog 열림/닫힘
- Accordion 펼침 여부
- 스크롤 위치 (단, 목록 복귀 시엔 유지가 나을 수 있다)

### 2. 전역 State 객체 구성
```javascript
// prototype/js/state.js

const AppState = {
  // 1단계에서 도출한 항목들
  filters: {},
  selection: [],
  history: [],
  currentRoute: '#/',

  // 상태 변경 + sessionStorage 동기화
  update(key, value) {
    this[key] = value;
    sessionStorage.setItem('appState', JSON.stringify(this));
  },

  // 복원
  restore() {
    const saved = sessionStorage.getItem('appState');
    if (saved) Object.assign(this, JSON.parse(saved));
  }
};
```

### 3. 변경 함수 작성
상태를 직접 쓰지 말고 **항상 `update()`를 거친다.** 그래야 저장이 누락되지 않는다.
변경 후에는 영향받는 화면을 다시 렌더한다.

```javascript
function applyFilter(filterType, value) {
  const filters = { ...AppState.filters, [filterType]: value };
  AppState.update('filters', filters);
  renderList();
}

function toggleSelection(itemId, max = 3) {
  const current = AppState.selection;
  if (current.includes(itemId)) {
    AppState.update('selection', current.filter(id => id !== itemId));
  } else if (current.length < max) {
    AppState.update('selection', [...current, itemId]);
  }
  renderSelectionBar();
}
```

### 4. 선택 집합의 지속 표시 (해당하는 경우)
여러 화면에 걸쳐 항목을 모으는 기능이 있으면, **현재 몇 개를 모았는지 항상 보이게** 한다.
보통 하단 고정 바를 쓴다.

```html
<div class="selection-bar" data-count="0">
  <span class="selection-bar__count">0개 선택</span>
  <button class="sds-button sds-button--primary">다음 단계</button>
</div>
```

- 0개일 때는 숨기거나 비활성 상태로 둔다. (Empty State)
- 최대 개수에 도달하면 더 선택할 수 없음을 알린다.

## 검증
- 목록 → 상세 → 뒤로 갔을 때 필터가 유지되는가?
- 선택한 항목이 다른 화면을 거쳐도 유지되는가?
- 누적 입력(대화·폼) 내역이 유지되는가?
- 새로고침해도 상태가 복원되는가? (sessionStorage)
- 상태를 초기화하는 수단이 있는가? (필터 리셋 등)

---

## 예시 (CardFit — 카드 추천 서비스)

> 전체 예시: `examples/cardfit/prototype/app.js`

| 상태 유형 | CardFit 적용 | 학습 앱이라면 |
|-----------|-------------|--------------|
| 필터 | 카드 종류, 혜택, 연회비 범위, 카드사 | 레벨, 품사, 주제 |
| 선택 집합 | 비교 카드 목록 (최대 3개) | 오늘의 복습 덱 |
| 입력 내역 | AI 대화 내역 | 퀴즈 답안 기록 |
| 진행 상태 | — | 학습 진도, 연속 학습일 |
