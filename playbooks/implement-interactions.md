# Skill: 인터랙션 구현

## 목적
화면 내 상태 변화와 UI 인터랙션을 JavaScript로 구현한다.

## 사용하는 Agent
- Prototype Agent (주 사용)

## 인터랙션 목록

### 1. 검색/필터
```javascript
// 검색어 입력 → 결과 필터링
searchInput.addEventListener('input', (e) => {
  filterCards({ keyword: e.target.value });
});

// Tag Toggle 선택/해제 → 필터 적용
tagToggle.addEventListener('click', () => {
  tagToggle.classList.toggle('active');
  applyFilters();
});

// Select 변경 → 필터 적용
selectField.addEventListener('change', () => {
  applyFilters();
});
```

### 2. 카드 선택 (비교용)
```javascript
// 카드에 비교 체크박스/버튼 추가
// 최대 3개까지 선택 가능
// 선택 시 하단에 비교 바(floating bar) 표시
```

### 3. Dialog / Bottom Sheet
```javascript
// 열기
openDialogBtn.addEventListener('click', () => {
  dialog.classList.add('open');
});

// 닫기
closeDialogBtn.addEventListener('click', () => {
  dialog.classList.remove('open');
});

// 배경 클릭으로 닫기
dialog.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.classList.remove('open');
});
```

### 4. Accordion
```javascript
// 클릭 시 접기/펼치기
accordionHeader.addEventListener('click', () => {
  accordionItem.classList.toggle('expanded');
});
```

### 5. Tab 전환
```javascript
// 탭 클릭 시 활성 탭 변경 + 콘텐츠 전환
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    setActiveTab(tab.dataset.tab);
  });
});
```

### 6. AI 추천 시뮬레이션
```javascript
// 입력 후 제출 → Loading 상태 → 2초 후 결과 표시
submitBtn.addEventListener('click', () => {
  setState('loading');
  setTimeout(() => {
    setState('default');
    showRecommendations(mockAIResponse);
  }, 2000);
});
```

### 7. 상태 전환
```javascript
// data-state 속성으로 상태 전환
function setState(container, state) {
  container.dataset.state = state; // 'default' | 'empty' | 'loading' | 'error'
}
```

## 검증
- 모든 인터랙션이 클릭/입력에 즉시 반응하는가?
- Dialog가 열리고 닫히는가?
- Accordion이 접히고 펼쳐지는가?
- 필터 선택 시 결과가 변경되는가?
- AI 추천이 Loading → 결과 순서로 표시되는가?
