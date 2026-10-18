# Skill: Prototype HTML 골격 생성

## 목적
Figma 와이어프레임을 **동작하는 HTML 골격**으로 옮긴다.
Prototype Agent가 인터랙션을 붙이기 전에 반드시 실행하는 첫 단계다.

> 이 Playbook이 없으면 Phase 2(Figma)와 Phase 3(인터랙션) 사이가 끊긴다.
> 데이터·네비게이션·상태 Playbook은 모두 **이미 존재하는 HTML**을 전제로 한다.

## 사용하는 Agent
- Prototype Agent (주 사용, 첫 번째로 실행)

## 전제
- `specs/screens.md`에 화면 목록과 Spec이 있다.
- `specs/figma-info.md`에 Figma fileKey와 프레임 nodeId가 기록되어 있다.

---

## 파일 구조 (고정)

```
prototype/
├── index.html      ← 모든 화면을 <section>으로 포함
├── styles.css      ← DS 토큰 + 컴포넌트 + 레이아웃 + 상태 스타일
└── app.js          ← 목업 데이터 + 상태 + 네비게이션 + 인터랙션
```

**단일 페이지 + Hash 라우팅**으로 만든다. 화면마다 별도 `.html` 파일을 만들지 않는다.
화면 간 상태 유지(`playbooks/manage-state.md`)가 페이지를 새로 로드하면 깨지기 때문이다.

파일을 3개로 고정하는 이유는 프로토타입의 수명이 짧고, 브라우저에서 바로 열려야 하기 때문이다.
화면이 8개를 넘어 `app.js`가 과도하게 길어지면 그때 분리한다.

---

## 절차

### 1. Figma 와이어프레임 읽기
`specs/figma-info.md`의 nodeId로 각 화면 프레임의 구조를 확인한다.

- `get_design_context` — 레이어 구조, Auto Layout, 컴포넌트, 텍스트 내용
- `get_screenshot` — 시각적 배치 확인 (구조가 모호할 때)

화면당 Mobile(375px)과 Desktop(1440px) 프레임이 한 쌍으로 있다. **둘 다 확인한다.**

> **Figma를 사용할 수 없는 경우** (MCP 미연결, Codex 환경 등)
> 이 단계를 건너뛰고 `specs/screens.md`의 Screen Spec만으로 구성한다.
> 레이아웃 판단이 필요하면 `playbooks/design-layout.md`를 참조한다.
> 와이어프레임 단계부터 HTML로 진행했다면 `playbooks/build-wireframe-html.md`의 결과물이 이미 있으므로 이 Playbook은 생략한다.

### 2. 화면을 section으로 배치
`specs/screens.md`의 화면 1개 = `<section>` 1개.

```html
<body>
  <!-- 모든 화면 공통 -->
  <header class="sds-header"><!-- 로고 + 네비게이션 --></header>

  <main>
    <section id="index"   class="screen" data-screen="index"><!-- 홈 --></section>
    <section id="<screen-id>" class="screen" data-screen="<screen-id>"></section>
    <!-- specs/screens.md 의 화면 수만큼 -->
  </main>

  <footer class="sds-footer"></footer>
  <script src="app.js"></script>
</body>
```

- `id`는 `connect-navigation.md`의 라우트(`#/<screen-id>`)와 일치시킨다.
- 기본적으로 모두 숨기고, 활성 화면만 노출한다. (`.screen { display: none } .screen.is-active { display: block }`)

### 3. 각 화면의 상태 마크업 포함
UX 원칙 6에 따라 화면마다 필요한 상태를 **미리 마크업해두고 토글**한다.
나중에 추가하면 빠뜨린다.

```html
<section id="search" class="screen" data-screen="search">
  <div class="state state--default"  data-state="default"></div>
  <div class="state state--empty"    data-state="empty"   hidden></div>
  <div class="state state--loading"  data-state="loading" hidden></div>
  <div class="state state--error"    data-state="error"   hidden></div>
</section>
```

Empty와 Error에는 **다음 행동을 안내하는 CTA**를 반드시 넣는다.
`specs/screens.md`에서 해당 화면에 N/A인 상태는 생략하되, 왜 N/A인지 주석으로 남긴다.

### 4. DS 토큰으로 styles.css 작성
`context/design-system.md`의 Design Tokens를 CSS Variables로 선언하고, **하드코딩된 값을 쓰지 않는다.**

```css
:root {
  --color-background: #FFFFFF;
  --color-foreground: #1A1A1A;
  --color-border: #E5E5E5;
  --space-1: 4px;  --space-2: 8px;  --space-4: 16px;  --space-6: 24px;
  --radius-md: 8px;
  --text-sm: 14px; --text-base: 16px; --text-lg: 20px;
}
```

Figma 프레임에서 읽은 색상·간격을 토큰에 대응시킨다. 대응되는 토큰이 없으면 토큰을 추가하고, 임의의 값을 인라인으로 쓰지 않는다.

### 5. 반응형 적용
Mobile First. 기본 스타일이 375px 기준이고, `min-width` 미디어 쿼리로 확장한다.

```css
/* 기본 = Mobile 375px */
.container { padding: var(--space-4); }

@media (min-width: 768px)  { /* Tablet */ }
@media (min-width: 1200px) { /* Desktop 1440px 기준 */ }
```

- Figma의 Mobile/Desktop 프레임 **쌍**을 보고 무엇이 달라지는지 파악한다. (컬럼 수, 네비게이션 형태, CTA 위치)
- 터치 타겟 최소 44px을 지킨다.
- 가로 스크롤이 발생하지 않게 한다.

### 6. 화면당 Primary CTA 1개 확인
`CLAUDE.md`의 규칙이다. Mobile/Desktop용 CTA를 각각 만들어 **둘 다 렌더링되는 실수**가 흔하다.
한쪽을 만들면 반대쪽은 반드시 CSS로 숨긴다.

---

## Output
- `prototype/index.html` — 모든 화면의 section과 상태 마크업
- `prototype/styles.css` — DS 토큰 + 반응형

> `app.js`는 이 Playbook에서 만들지 않는다.
> 이어지는 `create-mock-data` → `connect-navigation` → `implement-interactions` → `manage-state`가 채운다.

## 검증
- `specs/screens.md`의 모든 화면이 `<section>`으로 존재하는가?
- 각 section의 `id`가 라우트와 일치하는가?
- 화면마다 필요한 상태(Empty/Error/Loading)가 마크업되어 있는가?
- Empty/Error에 다음 행동을 안내하는 CTA가 있는가?
- CSS에 하드코딩된 색상·간격 값이 없는가?
- 375px에서 가로 스크롤이 없는가?
- 화면당 Primary CTA가 하나만 렌더링되는가? (Mobile/Desktop 중복 주의)
