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

## 구조: Agent → Playbook → Context

```
사용자 요청  →  Agent (주체)  →  Playbook (절차)
```

| 개념 | 역할 | 위치 |
|------|------|------|
| Agent | 누가 일하는가, 무엇을 아는가 | `agents/` |
| Playbook | 어떻게 일하는가 (재사용 가능) | `playbooks/` |
| Context | 무엇을 알아야 하는가 | `context/` |
| Rules | 무엞을 지켜야 하는가 | 이 파일 (AGENTS.md) |
| Evaluation | 제대로 만들었는가 | `evaluation/` |

---

## Agents

| Agent | 파일 | 역할 | Playbooks |
|-------|------|------|-----------|
| Planner | `agents/planner.md` | PM — 문제 구조화 | discover-context, create-figma-onepager, analyze-requirements, create-user-flow, create-screen-spec |
| Wireframe | `agents/wireframe.md` | UX Designer — 화면 구조 설계 | map-components, design-layout, build-wireframe-html, implement-responsive |

> Codex 환경에는 Figma MCP가 없으므로 **HTML 경로**를 사용한다.
> Claude Code의 기본 경로(Figma)와 달리 `build-wireframe-html` + `implement-responsive`가 와이어프레임을 담당하며,
> 이어지는 Prototype 단계에서 `build-prototype-html`은 생략한다 (HTML이 이미 존재하므로).
>
> 브라우저 실행 검증(`check-prototype-runs`)을 수행할 수 없으면
> 리포트에 "실행 검증 미수행"을 명시하고, `Pass` 판정에 단서를 붙인다.
>
> 각 Phase를 마칠 때 `playbooks/report-checkpoint.md`로 산출물 요약과 선택지를 보여준다.
> 요청에 `--confirm`이 있으면 각 체크포인트에서 멈추고, 없으면 보여주기만 하고 진행한다.
>
> 프로토타입은 상태 제어 쿼리(`?reset=1` `?seed=0` `?state=loading` `?state=error`)를
> 반드시 구현한다. 없으면 Empty/Loading/Error를 검증할 수 없다.
| Prototype | `agents/prototype.md` | Interaction Designer — 경험 연결 | create-mock-data, connect-navigation, implement-interactions, manage-state |
| Critic | `agents/critic.md` | Design Reviewer — 결과 검증 | check-requirements, check-ux-principles, check-design-system, write-critique-report |

---

## Pipeline

사용자가 프로토타입 생성을 요청하면 다음 파이프라인을 순서대로 실행한다.

```
Phase 1: Plan     (Planner Agent)     → context/ + specs/
  ↓ Discovery: 부족한 맥락은 질문으로 확보
  ↓ 사용자 확인 (체크포인트)
Phase 2: Wireframe (Wireframe Agent)  → HTML 와이어프레임
Phase 3: Prototype (Prototype Agent)  → prototype/ Interactive
Phase 4: Critique  (Critic Agent)     → evaluation/
  ↓ 사용자에게 결과 보여줌 (체크포인트)
Phase 5: Refine    (조건부, 최대 3회) → prototype/ 수정
Phase 6: Human Review                → 최종 안내
```

### Phase 1: Plan (Planner Agent)
1. `agents/planner.md`를 읽는다.
2. Context를 읽는다: `context/product-context.md`, `context/ux-principles.md`, `context/design-system.md`
3. Discovery 먼저 실행한다: `playbooks/discover-context.md`
4. Playbook을 순서대로 실행한다:
   - `playbooks/analyze-requirements.md`
   - `playbooks/create-user-flow.md`
   - `playbooks/create-screen-spec.md`
5. 체크포인트: 사용자 확인

### Phase 2: Wireframe (Wireframe Agent)
1. `agents/wireframe.md`를 읽는다.
2. Context를 읽는다: `context/design-system.md`, `context/ux-principles.md`, `specs/screens.md`
3. Playbook을 순서대로 실행한다:
   - `playbooks/map-components.md`
   - `playbooks/design-layout.md`
   - `playbooks/build-wireframe-html.md`
   - `playbooks/implement-responsive.md`

### Phase 3: Prototype (Prototype Agent)
1. `agents/prototype.md`를 읽는다.
2. Playbook을 순서대로 실행한다:
   - `playbooks/create-mock-data.md`
   - `playbooks/connect-navigation.md`
   - `playbooks/implement-interactions.md`
   - `playbooks/manage-state.md`

### Phase 4: Critique (Critic Agent)
1. `agents/critic.md`를 읽는다.
2. Playbook을 순서대로 실행한다:
   - `playbooks/check-requirements.md`
   - `playbooks/check-ux-principles.md`
   - `playbooks/check-design-system.md`
   - `playbooks/write-critique-report.md`
3. 체크포인트: 사용자에게 결과 보여줌

### Phase 5: Refine (조건부)
Critique 판정이 Revise이면 수정 후 재검증. 최대 3회 반복.

### Phase 6: Human Review
Pass 판정이거나 Refine 3회 완료 시 최종 안내.

---

## 종료 조건 (Exit Criteria)
다음을 모두 만족하면 Human Review로 전환한다:
1. 핵심 User Flow를 처음부터 끝까지 수행할 수 있다.
2. 주요 Interaction을 직접 확인할 수 있다.
3. Requirement 누락이 없다.
4. 주요 Empty / Error / Loading State가 표현되어 있다.
5. UX Principle을 심각하게 위반하지 않는다.
6. Design System 컴포넌트를 기준으로 주요 화면이 구성되어 있다.
