핵심 화면을 하이파이 디자인으로 올린다 (선택 단계).

## 전제 조건
- Phase 2 와이어프레임이 완성되어 있어야 한다. 없으면 먼저 `/wireframe`을 실행하라고 안내한다.
- `context/design-tokens.md`가 없으면 `playbooks/select-visual-language.md`를 먼저 실행한다.

## 실행 절차
1. `agents/wireframe.md`를 읽는다. 이 단계도 Wireframe Agent의 일이다.
2. Context를 읽는다:
   - `specs/screens.md` — ★ 표시된 핵심 화면 확인
   - `specs/figma-info.md` — 와이어프레임 nodeId
   - `context/design-tokens.md` — 색·타이포·간격 (없으면 먼저 생성)
   - `context/design-system.md` — 실제 컴포넌트로 교체할 대상
3. `playbooks/build-hifi-screen.md`를 실행한다.
   **대상은 1~2개로 제한한다.** 전체 화면을 하이파이로 만들지 않는다.
4. Auto Layout 함정 3종을 검사하고 스크린샷을 확인한다
   (`playbooks/build-wireframe-figma.md` 5절).
5. `playbooks/report-checkpoint.md`를 실행해 멈추고 방향을 확인받는다.
   이 단계의 목적이 시각 방향 합의이므로, 확인 없이 끝내지 않는다.

## Input
$ARGUMENTS

화면 이름을 주면 그 화면을, 없으면 `specs/screens.md`의 ★ 표시 화면을 대상으로 한다.
★ 표시가 없으면 사용자에게 어느 화면인지 묻는다.
