# Wireframe Prototype Harness

이 프로젝트는 AI가 반복적으로 좋은 프로토타입을 만들 수 있는 환경(Harness)입니다.
Production 개발이 아니라, "이 경험으로 개발 논의를 시작할 수 있는가?"를 판단할 수 있는 Interactive Prototype을 만드는 것이 목표입니다.

## Context (항상 참조)
- `context/product-context.md` — 제품 배경, 타겟 유저, 핵심 시나리오
- `context/ux-principles.md` — 7가지 UX 원칙
- `context/design-system.md` — Figma Simple Design System 컴포넌트 목록과 사용 규칙

## Rules (반드시 준수)

### Design System 우선
- 새로운 UI 컴포넌트를 만들기 전에 `context/design-system.md`에서 적합한 컴포넌트를 먼저 찾는다.
- 기존 컴포넌트로 해결할 수 없을 때만 커스텀 UI를 만들되, 기존 토큰(색상, 간격, radius)을 사용한다.

### 화면 설계 원칙
- Primary CTA는 화면당 하나만 둔다. 명확한 우선순위를 가진다.
- 주요 Task는 최소 단계로 구성한다.
- Empty / Error / Loading State를 반드시 고려한다.
- 정보 계층을 명확하게 한다 — 핵심 정보가 먼저 보인다.

### 반응형
- Mobile First로 설계한다 (기준 너비: 375px).
- PC 확장 (기준 너비: 1440px).
- 터치 타겟 최소 44px.

### Prototype 범위
- HTML/CSS/JS로 Interactive Prototype을 만든다.
- 실제 API 호출 없이 목업 데이터로 동작한다.
- 화면 간 네비게이션, 상태 변화, 인터랙션이 동작해야 한다.

---

## 구조: Skill → Agent → Playbook

```
Skill (트리거 명령)  →  Agent (주체)  →  Playbook (절차)
```

| 개념 | 역할 | 위치 |
|------|------|------|
| Skill | 명령어로 Agent를 깨운다 | `.claude/commands/` |
| Agent | 누가 일하는가, 무엇을 아는가 | `agents/` |
| Playbook | 어떻게 일하는가 (재사용 가능) | `playbooks/` |
| Context | 무엇을 알아야 하는가 | `context/` |
| Rules | 무엇을 지켜야 하는가 | 이 파일 (CLAUDE.md) |
| Evaluation | 제대로 만들었는가 | `evaluation/` |

---

## Trigger Skills (트리거 명령)

| 명령 | Agent | 설명 |
|------|-------|------|
| `/plan-wire` | Planner | 요구사항 → User Flow + Screen Spec |
| `/wireframe` | Wireframe | Screen Spec → HTML 와이어프레임 |
| `/proto` | Prototype | 와이어프레임 → Interactive Prototype |
| `/critique` | Critic | Prototype 검증 → Feedback Report |
| `/wire` | 전체 파이프라인 | Plan → Wireframe → Prototype → Critique → Refine |

---

## Agents

| Agent | 파일 | 역할 | Playbooks |
|-------|------|------|-----------|
| Planner | `agents/planner.md` | PM — 문제 구조화 | discover-context, create-figma-onepager, analyze-requirements, create-user-flow, create-screen-spec |
| Wireframe | `agents/wireframe.md` | UX Designer — 화면 구조 설계 (Figma) | map-components, design-layout, build-wireframe-figma, implement-responsive-figma |
| Prototype | `agents/prototype.md` | Interaction Designer — 경험 연결 | create-mock-data, connect-navigation, implement-interactions, manage-state |
| Critic | `agents/critic.md` | Design Reviewer — 결과 검증 | check-requirements, check-ux-principles, check-design-system, write-critique-report |

---

## Pipeline (/wire)

```
Phase 1: Plan     (Planner Agent)     → context/ + specs/ + Figma 1-Pager
  ↓ Discovery: 부족한 맥락은 질문으로 확보
  ↓ Figma 1-Pager 생성 (와이어프레임 좌측 배치)
  ↓ 사용자 확인 (체크포인트)
Phase 2: Wireframe (Wireframe Agent)  → Figma 와이어프레임 (Mobile + Desktop)
Phase 3: Prototype (Prototype Agent)  → prototype/ Interactive
Phase 4: Critique  (Critic Agent)     → evaluation/
  ↓ 사용자에게 결과 보여줌 (체크포인트)
Phase 5: Refine    (조건부, 최대 3회) → prototype/ 수정
Phase 6: Human Review                → 최종 안내
```

---

## 종료 조건 (Exit Criteria)
다음을 모두 만족하면 Human Review로 전환한다:
1. 핵심 User Flow를 처음부터 끝까지 수행할 수 있다.
2. 주요 Interaction을 직접 확인할 수 있다.
3. Requirement 누락이 없다.
4. 주요 Empty / Error / Loading State가 표현되어 있다.
5. UX Principle을 심각하게 위반하지 않는다.
6. Design System 컴포넌트를 기준으로 주요 화면이 구성되어 있다.

## 디렉토리 구조
```
productdesign_harness/
├── CLAUDE.md                 ← 이 파일. 하네스 규칙
├── .claude/commands/         ← Trigger Skills (Claude Code 등록 명령)
│   ├── wire.md
│   ├── plan-wire.md
│   ├── wireframe.md
│   ├── proto.md
│   └── critique.md
├── agents/                   ← Agent 정의 (누구인가)
│   ├── planner.md
│   ├── wireframe.md
│   ├── prototype.md
│   └── critic.md
├── playbooks/                ← Playbook (어떻게 하는가)
│   ├── discover-context.md
│   ├── create-figma-onepager.md
│   ├── analyze-requirements.md
│   ├── create-user-flow.md
│   ├── create-screen-spec.md
│   ├── map-components.md
│   ├── design-layout.md
│   ├── build-wireframe-figma.md
│   ├── implement-responsive-figma.md
│   ├── build-wireframe-html.md       ← (레거시, 참고용)
│   ├── implement-responsive.md       ← (레거시, 참고용)
│   ├── create-mock-data.md
│   ├── connect-navigation.md
│   ├── implement-interactions.md
│   ├── manage-state.md
│   ├── check-requirements.md
│   ├── check-ux-principles.md
│   ├── check-design-system.md
│   └── write-critique-report.md
├── context/                  ← 공유 지식
│   ├── product-context.md
│   ├── ux-principles.md
│   └── design-system.md
├── specs/                    ← Planner 산출물
├── prototype/                ← Wireframe + Prototype 산출물
└── evaluation/               ← Critic 산출물
    └── checklist.md
```
