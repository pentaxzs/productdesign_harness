# Skill: 네비게이션 연결

## 목적
User Flow에 따라 화면 간 이동을 연결한다.

## 사용하는 Agent
- Prototype Agent (주 사용)

## 방식
Hash Routing 기반 SPA로 구현한다.

### 라우팅 구조
`specs/screens.md`의 화면 목록으로 라우트를 정의한다. 화면 1개 = 라우트 1개.

```javascript
const routes = {
  '#/': 'index',           // 홈 — 모든 제품의 진입점
  '#/<screen-id>': '<screen-id>',
  // ... specs/screens.md의 화면 수만큼
};
```

> 예시 (카드 추천 서비스):
> `'#/search'`, `'#/ai'`, `'#/compare'`, `'#/detail'`

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
<a href="#/search">검색하기</a>
<button onclick="navigateTo('#/ai')">추천 받기</button>

<!-- 뒤로가기 -->
<button onclick="history.back()">← 뒤로</button>
```

### 헤더 네비게이션
모든 화면에 공통 헤더를 두고, 주요 페이지로 이동할 수 있게 한다:
- 로고 → 홈
- Key Scenario마다 진입점 1개
- 조건부 진입점은 조건이 충족됐을 때만 노출한다 (예: 비교 → 선택된 항목이 있을 때)

**막다른 화면(Dead End)을 만들지 않는다.** 모든 화면에서 홈 또는 이전 화면으로 돌아갈 수 있어야 한다.

## 검증
- 모든 CTA 버튼이 올바른 화면으로 이동하는가?
- 뒤로가기가 이전 화면으로 정확히 돌아가는가?
- 헤더 네비게이션이 모든 화면에서 동작하는가?
- 브라우저 주소창의 hash가 현재 화면과 일치하는가?
