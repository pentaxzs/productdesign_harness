# Skill: HTML 와이어프레임 작성

## 목적
레이아웃 설계와 컴포넌트 매핑을 바탕으로 실제 HTML/CSS 파일을 작성한다.

## 사용하는 Agent
- Wireframe Agent (주 사용)

## 파일 구조
```
prototype/
├── index.html              ← 메인/홈 화면
├── search-results.html     ← 검색 결과
├── ai-recommend.html       ← AI 추천
├── compare.html            ← 카드 비교
├── detail.html             ← 카드 상세
├── styles/
│   ├── tokens.css          ← DS 토큰 (색상, 간격, radius, 타이포)
│   ├── components.css      ← DS 컴포넌트 스타일
│   ├── layout.css          ← 레이아웃/그리드
│   └── states.css          ← 상태별 스타일 (empty, loading, error)
└── js/
    ├── data.js             ← 목업 데이터
    ├── state.js            ← 상태 관리
    └── app.js              ← 인터랙션
```

## HTML 작성 규칙

### 시맨틱 구조
```html
<body>
  <header class="sds-header">...</header>
  <main>
    <section class="hero">...</section>
    <section class="content">...</section>
  </main>
  <footer class="sds-footer">...</footer>
</body>
```

### 컴포넌트 네이밍
DS 컴포넌트에 대응하는 클래스명:
- `.sds-header` — Header
- `.sds-button`, `.sds-button--primary`, `.sds-button--danger`
- `.sds-card`, `.sds-card-grid`
- `.sds-search`
- `.sds-tag`, `.sds-tag--toggle`
- `.sds-input`, `.sds-select`
- `.sds-dialog`, `.sds-dialog__body`
- `.sds-accordion`
- `.sds-tab`, `.sds-tabs`
- `.sds-credit-card`
- `.sds-footer`

### 상태 클래스
```html
<div class="search-results" data-state="default">
  <div class="state-default">...</div>
  <div class="state-empty">...</div>
  <div class="state-loading">...</div>
  <div class="state-error">...</div>
</div>
```

### 이미지 placeholder
실제 이미지 대신:
```html
<div class="placeholder-image" style="aspect-ratio: 16/9; background: var(--color-gray-100);">
  <span>카드 이미지</span>
</div>
```

## CSS 작성 규칙

### tokens.css 기본 구조
```css
:root {
  /* Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-bg: #ffffff;
  --color-surface: #f9fafb;
  --color-border: #e5e7eb;
  --color-text: #111827;
  --color-text-secondary: #6b7280;

  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-full: 9999px;

  /* Typography */
  --font-family: system-ui, -apple-system, sans-serif;
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
}
```

## 검증
- 모든 Screen Spec에 대응하는 HTML 파일이 있는가?
- 각 HTML이 브라우저에서 독립적으로 열리는가?
- DS 컴포넌트 클래스명이 일관되게 사용되었는가?
- 상태 클래스(data-state)가 적용되어 있는가?
