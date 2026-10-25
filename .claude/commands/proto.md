Prototype Agent를 실행한다.

## 전제 조건
`specs/screens.md`와 `specs/user-flow.md`가 존재해야 한다. 없으면 먼저 `/plan-wire`를 실행하라고 안내한다.

와이어프레임은 둘 중 하나의 형태로 존재한다:
- **Figma 프레임** (기본) — `specs/figma-info.md`에 nodeId가 기록되어 있다
- **HTML** (Figma 미사용 시) — `prototype/`에 HTML 파일이 이미 있다

둘 다 없으면 `/wireframe`을 먼저 실행하라고 안내한다.

## 실행 절차
1. `agents/prototype.md`를 읽고 Agent의 정체성, 판단 기준을 파악한다.
2. Agent가 참조해야 할 Context를 모두 읽는다:
   - `specs/user-flow.md`
   - `specs/screens.md`
   - `specs/figma-info.md`
   - `context/ux-principles.md`
   - `context/design-system.md`
3. Agent의 Playbook을 순서대로 실행한다:
   - `playbooks/select-visual-language.md` — 색·타이포·간격 토큰 출처 결정 (건너뛸 수 있음)
   - `playbooks/build-prototype-html.md` — **HTML 골격 생성** (Figma 와이어프레임 → HTML)
   - `playbooks/create-mock-data.md` — 목업 데이터 생성
   - `playbooks/connect-navigation.md` — 네비게이션 연결
   - `playbooks/implement-interactions.md` — 인터랙션 구현
   - `playbooks/manage-state.md` — 상태 관리 구현

   > 와이어프레임이 이미 HTML로 존재하면 `build-prototype-html.md`는 생략한다.
4. 로컬 서버로 띄우면 전체 Flow를 체험할 수 있는 상태로 만든다.
5. Agent의 완료 조건을 확인한다.
6. `playbooks/report-checkpoint.md`를 실행해 체크포인트를 보고한다.
   산출물 요약을 보여주고 **멈춰서** 다음 동작을 묻는다 (`--auto`가 있으면 묻지 않는다).

## Input
$ARGUMENTS

추가 지시가 없으면 `specs/user-flow.md`의 모든 Flow를 대상으로 실행한다.
