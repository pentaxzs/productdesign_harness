Prototype Agent를 실행한다.

## 전제 조건
`prototype/` 디렉토리에 Wireframe HTML 파일들이 존재해야 한다. 없으면 먼저 `/wireframe`을 실행하라고 안내한다.

## 실행 절차
1. `agents/prototype.md`를 읽고 Agent의 정체성, 판단 기준을 파악한다.
2. Agent가 참조해야 할 Context를 모두 읽는다:
   - `specs/user-flow.md`
   - `specs/screens.md`
   - `context/ux-principles.md`
   - `prototype/` 디렉토리의 기존 HTML 파일들 확인
3. Agent의 Playbook을 순서대로 실행한다:
   - `playbooks/create-mock-data.md` — 목업 데이터 생성
   - `playbooks/connect-navigation.md` — 네비게이션 연결
   - `playbooks/implement-interactions.md` — 인터랙션 구현
   - `playbooks/manage-state.md` — 상태 관리 구현
4. `prototype/index.html`을 브라우저에서 열면 전체 Flow를 체험할 수 있는 상태로 만든다.
5. Agent의 완료 조건을 확인한다.

## Input
$ARGUMENTS

추가 지시가 없으면 `specs/user-flow.md`의 모든 Flow를 대상으로 실행한다.
