Wireframe Agent를 실행한다.

## 전제 조건
`specs/screens.md`가 존재해야 한다. 없으면 먼저 `/plan-wire`를 실행하라고 안내한다.

## 실행 절차
1. `agents/wireframe.md`를 읽고 Agent의 정체성, 판단 기준을 파악한다.
2. Agent가 참조해야 할 Context를 모두 읽는다:
   - `context/design-system.md`
   - `context/ux-principles.md`
   - `specs/screens.md`
3. `specs/figma-info.md`를 확인한다.
   - "Figma 미사용"이 기록되어 있으면 아래 HTML 경로로 바로 간다. 묻지 않는다.
   - 기록이 없으면 `playbooks/check-figma-access.md`로 확인하고, 안 되면 사용자에게 묻는다.
   - Figma 사용이면 `figma-use` 스킬을 로드한다 (MCP resource: `skill://figma/figma-use/SKILL.md`).
4. Agent의 Playbook을 순서대로 실행한다:
   - `playbooks/map-components.md` — 컴포넌트 매핑
   - `playbooks/design-layout.md` — 레이아웃 설계
   - `playbooks/build-wireframe-figma.md` — Figma 와이어프레임 프레임 생성
   - `playbooks/implement-responsive-figma.md` — Mobile(375px) + Desktop(1440px) 프레임 쌍
5. 생성된 프레임 nodeId를 `specs/figma-info.md`에 기록한다.
6. Agent의 완료 조건을 확인한다.
7. `playbooks/report-checkpoint.md`를 실행해 체크포인트를 보고한다.
   산출물 요약을 보여주고 **멈춰서** 다음 동작을 묻는다 (`--auto`가 있으면 묻지 않는다).

## Figma 미사용 경로
`specs/figma-info.md`에 "Figma 미사용"이 기록되어 있거나, `check-figma-access.md`에서
사용자가 폴백을 선택한 경우 아래 Playbook으로 대체한다:
   - `playbooks/build-wireframe-html.md` — HTML 와이어프레임 작성
   - `playbooks/implement-responsive.md` — 반응형 구현

이 경우 산출물은 `prototype/`에 저장되며, 이어지는 `/proto`는
`playbooks/build-prototype-html.md`를 **생략**한다 (HTML이 이미 존재하므로).

## Input
$ARGUMENTS

추가 지시가 없으면 `specs/screens.md`의 모든 화면을 대상으로 실행한다.
