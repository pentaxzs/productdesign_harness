# Evaluation Checklist

Critic Agent가 Prototype을 검증할 때 사용하는 체크리스트입니다.

이 파일은 **2부로 구성**됩니다:
- **Part A. 제품별 체크리스트** — Planner가 `specs/screens.md`와 `context/product-context.md`의 Key Scenarios에서 생성한다. 제품마다 달라진다.
- **Part B. 공통 체크리스트** — 모든 제품에 적용되는 하네스 기본 기준. 수정하지 않는다.

> 작성 예시: `examples/cardfit/evaluation/critique-report.md`

---

# Part A. 제품별 체크리스트 (자동 생성)

## Key Scenarios
<!--
context/product-context.md 의 Key Scenarios를 그대로 체크 항목으로 옮긴다.
각 시나리오를 프로토타입에서 처음부터 끝까지 수행할 수 있는지 확인한다.
-->
- [ ] (시나리오 1)
- [ ] (시나리오 2)
- [ ] (시나리오 3)

## 기능별 상세
<!--
specs/screens.md 의 화면별 요구사항을 기능 단위로 묶어 체크 항목화한다.
기능 그룹마다 소제목을 만든다.
-->
### (기능 그룹 1)
- [ ]

### (기능 그룹 2)
- [ ]

---

# Part B. 공통 체크리스트 (고정)

## 실행 검증 (코드 검토보다 먼저)

`playbooks/check-prototype-runs.md` 기준. **브라우저에서 실제로 띄워 확인한다.**

- [ ] 로컬 서버(`http://`)로 띄웠는가? (`file://` 아님)
- [ ] 콘솔 에러가 0건인가? (JS 에러·리소스 404는 Critical)
- [ ] 모든 화면이 375px / 1440px에서 비어 있지 않게 렌더링되는가?
- [ ] 375px에서 가로 스크롤이 발생하지 않는가?
- [ ] 화면당 Primary CTA가 **하나만** 보이는가? (Mobile/Desktop 중복 렌더링 주의)
- [ ] Happy Path를 클릭으로 끝까지 수행할 수 있는가?
- [ ] 뒤로 갔을 때 이전 선택·필터가 유지되는가?
- [ ] Empty / Loading / Error 상태가 **실제로 전환되는가?** (마크업만 존재하는 것과 구분)

> 실행 검증을 수행하지 못한 환경이면 그 사실을 리포트에 명시하고,
> `Pass` 판정에 "실행 미검증" 단서를 붙인다.

## UX 원칙 점검

`context/ux-principles.md` 기준. 원칙을 수정했다면 이 표도 함께 수정한다.

| 원칙 | 점검 항목 | Pass/Fail |
|------|----------|-----------|
| 1. 정보 계층 | 의사결정에 가장 중요한 정보가 먼저 보이는가? | |
| 2. 최소 단계 | 핵심 Task에 불필요한 단계가 없는가? | |
| 3. 신뢰감 | 정보가 정확·일관되게 표현되고, 자동 생성 결과에 근거가 있는가? | |
| 4. 일관된 패턴 | 같은 유형의 정보가 모든 화면에서 동일 구조인가? | |
| 5. 사용자 주도권 | 자동화·추천 결과를 사용자가 수정하거나 되돌릴 수 있는가? | |
| 6. 상태 처리 | Empty / Error / Loading이 모두 존재하는가? | |
| 7. 반응형 | Mobile(375px) / PC(1440px) 모두 정상 동작하는가? | |

## 화면 설계 원칙

`CLAUDE.md`의 Rules 기준.

- [ ] 화면당 Primary CTA가 하나인가?
- [ ] 막다른 화면(Dead End)이 없는가? 모든 화면에서 되돌아갈 수 있는가?
- [ ] 터치 타겟이 최소 44px인가?
- [ ] 핵심 정보가 스크롤 없이 보이는가?

## Design System 준수

`context/design-system.md` 기준.

- [ ] 주요 화면이 DS 컴포넌트로 구성되어 있는가?
- [ ] 커스텀 UI를 만든 경우, DS로 해결 불가능한 이유가 있는가?
- [ ] 커스텀 UI가 DS 토큰(색상, 간격, radius, 타이포)을 따르는가?
- [ ] 네비게이션 / 입력 / 액션 / 컨테이너 각 영역에 DS 컴포넌트를 사용했는가?
- [ ] 동일 역할에 서로 다른 컴포넌트를 혼용하지 않았는가?

## 상태 처리 점검

`specs/screens.md`의 화면 목록으로 행을 채운다.
해당 없는 칸은 `N/A`로 표기하되, 왜 N/A인지 근거가 있어야 한다.

| 화면 | Default | Empty | Loading | Error |
|------|---------|-------|---------|-------|
| (화면 1) | | | | |
| (화면 2) | | | | |

## 종료 조건 (Exit Criteria)

`CLAUDE.md`의 Exit Criteria. 모두 만족해야 Human Review로 전환한다.

- [ ] 핵심 User Flow를 처음부터 끝까지 수행할 수 있다.
- [ ] 주요 Interaction을 직접 확인할 수 있다.
- [ ] Requirement 누락이 없다.
- [ ] 주요 Empty / Error / Loading State가 표현되어 있다.
- [ ] UX Principle을 심각하게 위반하지 않는다.
- [ ] Design System 컴포넌트를 기준으로 주요 화면이 구성되어 있다.
