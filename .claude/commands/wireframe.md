Wireframe Agent를 실행한다.

## 전제 조건
`specs/screens.md`가 존재해야 한다. 없으면 먼저 `/plan-wire`를 실행하라고 안내한다.

## 실행 절차
1. `agents/wireframe.md`를 읽고 Agent의 정체성, 판단 기준을 파악한다.
2. Agent가 참조해야 할 Context를 모두 읽는다:
   - `context/design-system.md`
   - `context/ux-principles.md`
   - `specs/screens.md`
3. Agent의 Playbook을 순서대로 실행한다:
   - `playbooks/map-components.md` — 컴포넌트 매핑
   - `playbooks/design-layout.md` — 레이아웃 설계
   - `playbooks/build-wireframe-html.md` — HTML 와이어프레임 작성
   - `playbooks/implement-responsive.md` — 반응형 구현
4. 산출물을 `prototype/` 디렉토리에 저장한다.
5. Agent의 완료 조건을 확인한다.

## Input
$ARGUMENTS

추가 지시가 없으면 `specs/screens.md`의 모든 화면을 대상으로 실행한다.
