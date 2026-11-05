Planner Agent를 실행한다.

## 실행 절차
1. `agents/planner.md`를 읽고 Agent의 정체성, 판단 기준, 참조할 Context를 파악한다.
2. Agent가 참조해야 할 Context를 모두 읽는다:
   - `context/product-context.md`
   - `context/ux-principles.md`
   - `context/design-system.md`
3. **Discovery를 먼저 실행한다:**
   - `playbooks/discover-context.md` — `context/product-context.md`의 필수 항목을 점검한다.
   - 빠진 항목이 있으면 사용자에게 질문하고, 답변을 받아 `context/product-context.md`를 업데이트한다.
   - **Discovery가 완료되어야 다음 단계로 진행한다.**
4. Agent의 Playbook을 순서대로 실행한다:
   - `playbooks/check-figma-access.md` — Figma 사용 가능 여부 확인 (안 되면 멈추고 질문)
   - `playbooks/create-figma-onepager.md` — 1-Pager 생성 (Figma 또는 마크다운 폴백)
   - `playbooks/analyze-requirements.md` — 요구사항 분석
   - `playbooks/create-user-flow.md` — User Flow 작성
   - `playbooks/create-screen-spec.md` — Screen Spec 작성
   - `playbooks/create-checklist.md` — 검증 체크리스트 Part A 생성
5. 산출물을 저장한다:
   - `context/product-context.md` (Discovery 업데이트)
   - `specs/user-flow.md`
   - `specs/screens.md`
   - `evaluation/checklist.md` (Part A)
6. Agent의 완료 조건을 확인한다.
7. User Flow와 Screen 목록을 사용자에게 보여주고 확인을 받는다.
8. `playbooks/report-checkpoint.md`를 실행해 체크포인트를 보고한다.
   산출물 요약을 보여주고 **멈춰서** 다음 동작을 묻는다 (`--auto`가 있으면 묻지 않는다).

### 체크포인트 선택지 (`/plan-wire` 전용)

`/plan-wire`는 Plan만 실행하는 스킬이므로, 체크포인트 선택지를 다음으로 바꾼다:

| # | 라벨 | 설명 | 선택 시 |
|---|------|------|---------|
| 1 | **이어서 파이프라인 진행** (권장) | Phase 2 (Wireframe)부터 이어서 실행. 다음 체크포인트에서 다시 묻는다 | Phase 2 → 체크포인트 → Phase 3 → … |
| 2 | **끝까지 진행** | Phase 2부터 Phase 6까지 묻지 않고 완주한다. 각 단계 요약은 계속 보여준다 | Phase 2 ~ 6 연속 실행 |
| 3 | **〈기획에서 바꿀 만한 것〉** | 화면 범위 조정, 시나리오 추가·삭제 등 | Plan 재실행 → 다시 체크포인트 |
| 4 | **여기서 멈춤** | 기획 산출물만 남기고 종료 | 산출물 위치 안내 후 종료 |

사용자가 1번 또는 2번을 고르면, 이어서 Phase 2 ~ 6을 실행한다.
실행 절차는 `.claude/commands/wire.md`의 Phase 2 이후와 동일하다.

## Input
사용자의 요청: $ARGUMENTS

요청이 없으면 `context/product-context.md`의 Key Scenarios를 기반으로 실행한다.
