# Skill: 상태 관리

## 목적
화면 간 이동 시 사용자의 선택과 입력이 유지되도록 상태를 관리한다.

## 사용하는 Agent
- Prototype Agent (주 사용)

## 상태 항목

### 유지해야 할 상태
1. **검색 필터**: 선택된 카드 종류, 혜택, 연회비 범위, 카드사
2. **비교 카드 목록**: 사용자가 비교하기로 선택한 카드 ID 목록 (최대 3개)
3. **AI 대화 내역**: 사용자 입력과 AI 응답
4. **현재 화면**: 마지막으로 본 화면 (새로고침 시 복원)

### 유지하지 않을 상태
- 검색 입력 중인 텍스트 (제출 전)
- Dialog 열림/닫힘 상태
- Accordion 펼침 상태

## 구현 방식

### 전역 State 객체
```javascript
// prototype/js/state.js

const AppState = {
  filters: {
    type: null,           // 'credit' | 'debit' | null
    benefits: [],         // ['카페', '교통']
    feeRange: [0, 100000],
    issuer: null,
  },
  compareCards: [],        // [1, 5, 8]
  aiChat: [],             // [{ role: 'user', text: '...' }, { role: 'ai', text: '...' }]
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

### 사용 패턴
```javascript
// 비교 카드 추가
function addToCompare(cardId) {
  if (AppState.compareCards.length >= 3) return;
  if (!AppState.compareCards.includes(cardId)) {
    AppState.update('compareCards', [...AppState.compareCards, cardId]);
    updateCompareBar();
  }
}

// 필터 적용
function applyFilter(filterType, value) {
  const filters = { ...AppState.filters, [filterType]: value };
  AppState.update('filters', filters);
  renderCardList();
}
```

## 비교 바 (Floating Compare Bar)
비교할 카드가 1개 이상 선택되면 화면 하단에 고정 바를 표시:
```html
<div class="compare-bar" data-count="0">
  <span class="compare-bar__count">0개 선택</span>
  <button class="sds-button sds-button--primary">비교하기</button>
</div>
```

## 검증
- 검색 결과에서 카드 상세로 갔다가 뒤로 오면 필터가 유지되는가?
- 비교 카드를 선택하고 다른 화면 갔다가 돌아오면 선택이 유지되는가?
- AI 추천 화면에서 대화 내역이 유지되는가?
- 새로고침해도 상태가 복원되는가? (sessionStorage)
