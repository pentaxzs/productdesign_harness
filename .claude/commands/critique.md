Critic Agent를 실행한다.

## 전제 조건
`prototype/` 디렉토리에 Interactive Prototype이 존재해야 한다. 없으면 먼저 `/proto`를 실행하라고 안내한다.

## 실행 절차
1. `agents/critic.md`를 읽고 Agent의 정체성, 판단 기준을 파악한다.
2. Agent가 참조해야 할 Context를 모두 읽는다:
   - `context/product-context.md`
   - `context/ux-principles.md`
   - `context/design-system.md`
   - `specs/user-flow.md`
   - `specs/screens.md`
   - `evaluation/checklist.md`
   - `prototype/` 디렉토리의 HTML/CSS/JS 파일들
3. Agent의 Playbook을 순서대로 실행한다:
   - `playbooks/check-prototype-runs.md` — **브라우저 실행 검증** (가장 먼저)
   - `playbooks/check-requirements.md` — 요구사항 충족 점검
   - `playbooks/check-ux-principles.md` — UX 원칙 위반 점검
   - `playbooks/check-design-system.md` — DS 준수 점검
   - `playbooks/write-critique-report.md` — 리포트 작성
4. 산출물을 `evaluation/critique-report.md`에 저장한다.
5. 판정 결과(Pass/Revise)를 사용자에게 보여준다.

## Input
$ARGUMENTS

추가 지시가 없으면 전체 Prototype을 대상으로 검증한다.
