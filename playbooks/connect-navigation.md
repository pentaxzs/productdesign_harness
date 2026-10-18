# Skill: 네비게이션 연결

## 목적
User Flow에 따라 화면 간 이동을 연결한다.

## 사용하는 Agent
- Prototype Agent (주 사용)

## 방식
Hash Routing 기반 SPA로 구현한다.

### 라우팅 구조
```javascript
// 화면별 hash
const routes = {
  '#/': 'index',           // 홈
  '#/search': 'search',    // 검색 결과
  '#/ai': 'ai-recommend',  // AI 추천
  '#/compare': 'compare',  // 카드 비교
  '#/detail': 'detail',    // 카드 상세
};
```

### 페이지 전환
```javascript
// 각 화면을 <section>으로 구현, hash 변경 시 활성 화면 전환
window.addEventListener('hashchange', () => {
  const route = window.location.hash || '#/';
  showPage(route);
});
```

### 링크/버튼 연결
```html
<!-- 페이지 이동 -->
<a href="#/search">카드 검색하기</a>
<button onclick="navigateTo('#/ai')">AI 추천 받기</button>

<!-- 뒤로가기 -->
<button onclick="history.back()">← 뒤로</button>
```

### 헤더 네비게이션
모든 화면에 공통 헤더를 두고, 주요 페이지로 이동할 수 있게 한다:
- 로고 → 홈
- 카드 검색 → 검색
- AI 추천 → AI 추천
- 카드 비교 → 비교 (선택된 카드가 있을 때)

## 검증
- 모든 CTA 버튼이 올바른 화면으로 이동하는가?
- 뒤로가기가 이전 화면으로 정확히 돌아가는가?
- 헤더 네비게이션이 모든 화면에서 동작하는가?
- 브라우저 주소창의 hash가 현재 화면과 일치하는가?
