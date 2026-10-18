# Skill: 요구사항 충족 점검

## 목적
Prototype이 Product Context의 Key Scenarios와 Screen Spec을 빠짐없이 반영했는지 점검한다.

## 사용하는 Agent
- Critic Agent (주 사용)

## 전제
`playbooks/check-prototype-runs.md`(실행 검증)가 먼저 수행되어 있어야 한다.
"끝까지 수행할 수 있는가"는 **코드가 아니라 실제 클릭 결과**로 판단한다.

## 절차

### 1. Key Scenarios 체크
`context/product-context.md`의 Key Scenarios를 하나씩 점검한다:
- 해당 시나리오의 시작점이 Prototype에 존재하는가?
- 시나리오를 끝까지 수행할 수 있는가? — **실행 검증의 Happy Path 결과를 근거로 판단한다**
- 중간에 막히는 지점이 없는가?

### 2. Screen Spec 체크
`specs/screens.md`의 각 Screen에 대해:
- 화면이 Prototype에 존재하는가?
- 핵심 정보가 모두 화면에 표시되는가?
- 사용자 액션이 모두 동작하는가?
- Primary CTA가 존재하고 올바른 곳으로 이동하는가?

### 3. 기능별 체크
`evaluation/checklist.md`의 **Part A(제품별 체크리스트)** 항목을 순서대로 점검한다.
Part A는 Phase 1에서 `playbooks/create-checklist.md`가 생성한다.

Part A가 비어 있거나 플레이스홀더만 있으면 **그 사실을 리포트에 명시한다.**
제품 고유 요구사항이 검증되지 않은 상태이므로 `Pass`를 단정하지 않는다.

## Output 형식
```markdown
## 요구사항 충족 점검

### Key Scenarios: M/N 충족
| 시나리오 | 충족 | 문제 |
|---------|------|------|
| [시나리오 1] | O/X | [문제 설명 또는 '-'] |

### Screen Spec: M/N 충족
| Screen | 존재 | 핵심정보 | 액션 | CTA | 문제 |
|--------|------|---------|------|-----|------|
| [Screen 1] | O/X | O/X | O/X | O/X | [문제] |

### 누락 항목
1. [누락된 요구사항] — [심각도: Critical/Major/Minor]
```
