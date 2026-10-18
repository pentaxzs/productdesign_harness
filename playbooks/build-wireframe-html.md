# Skill: HTML 와이어프레임 작성

## 목적
레이아웃 설계와 컴포넌트 매핑을 바탕으로 실제 HTML/CSS 파일을 작성한다.

## 사용하는 Agent
- Wireframe Agent (주 사용)

> **이 Playbook은 Figma를 사용할 수 없을 때의 경로다.**
> 기본 경로는 `build-wireframe-figma.md`(Phase 2) → `build-prototype-html.md`(Phase 3)이다.
> Codex 환경처럼 Figma MCP가 없으면 이 Playbook이 와이어프레임 단계를 대신한다.

## 파일 구조
**단일 페이지 + Hash 라우팅.** 화면마다 별도 `.html` 파일을 만들지 않는다.
화면 간 상태 유지가 페이지를 새로 로드하면 깨지기 때문이다.

```
prototype/
├── index.html      ← 모든 화면을 <section>으로 포함
├── styles.css      ← DS 토큰 + 컴포넌트 + 레이아웃 + 상태 스타일
└── app.js          ← 목업 데이터 + 상태 + 네비게이션 + 인터랙션
```

이 Playbook은 `index.html`과 `styles.css`까지만 만든다.
`app.js`는 Phase 3의 Playbook들이 채운다.

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
