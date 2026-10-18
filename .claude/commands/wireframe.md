Wireframe Agent를 실행한다.

## 전제 조건
`specs/screens.md`가 존재해야 한다. 없으면 먼저 `/plan-wire`를 실행하라고 안내한다.

## 실행 절차
1. `agents/wireframe.md`를 읽고 Agent의 정체성, 판단 기준을 파악한다.
2. Agent가 참조해야 할 Context를 모두 읽는다:
   - `context/design-system.md`
   - `context/ux-principles.md`
   - `specs/screens.md`
3. Figma MCP `figma-use` 스킬을 로드한다 (MCP resource: `skill://figma/figma-use/SKILL.md`).
4. Agent의 Playbook을 순서대로 실행한다:
   - `playbooks/map-components.md` — 컴포넌트 매핑
   - `playbooks/design-layout.md` — 레이아웃 설계
   - `playbooks/build-wireframe-figma.md` — Figma 와이어프레임 프레임 생성
   - `playbooks/implement-responsive-figma.md` — Mobile(375px) + Desktop(1440px) 프레임 쌍
5. 생성된 프레임 nodeId를 `specs/figma-info.md`에 기록한다.
6. Agent의 완료 조건을 확인한다.

## Figma를 사용할 수 없는 경우
MCP가 연결되지 않았거나 사용자가 Figma를 원하지 않으면 **HTML 경로로 전환한다.**
사용자에게 전환 사실을 알리고 아래 Playbook으로 대체한다:
   - `playbooks/build-wireframe-html.md` — HTML 와이어프레임 작성
   - `playbooks/implement-responsive.md` — 반응형 구현

이 경우 산출물은 `prototype/`에 저장되며, 이어지는 `/proto`는
`playbooks/build-prototype-html.md`를 **생략**한다 (HTML이 이미 존재하므로).

## Input
$ARGUMENTS

추가 지시가 없으면 `specs/screens.md`의 모든 화면을 대상으로 실행한다.
