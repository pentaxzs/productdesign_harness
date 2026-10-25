전체 파이프라인을 실행한다: Plan → Wireframe → Prototype → Critique → Refine → Human Review

## 진행 방식

**각 Phase가 끝나면 멈추고 사용자에게 묻는다.** 이것이 기본이다.

`playbooks/report-checkpoint.md`가 출력 형식과 선택지를 정의한다.
**각 Phase를 마칠 때마다 이 Playbook을 실행한다.**

체크포인트 선택지:
1. **다음 단계 진행** — 다음 Phase로 가고 그 단계가 끝나면 다시 묻는다
2. **끝까지 진행** — 이후 묻지 않고 끝까지 간다 (요약은 계속 출력)
3. **〈이 Phase에서 바꿀 것〉** — 해당 Phase 재실행
4. **여기서 멈춤**

사용자가 2번을 고른 뒤에는 남은 체크포인트에서 멈추지 않는다.
`$ARGUMENTS`에 `--auto`가 있으면 처음부터 멈추지 않는다.

**Phase 5 (Refine)는 어느 경우에도 멈추지 않는다.** 고칠 것이 이미 명확하기 때문이다.

## 실행 절차

### Phase 1: Plan (Planner Agent)
1. `agents/planner.md`를 읽는다.
2. Context를 읽는다: `context/product-context.md`, `context/ux-principles.md`, `context/design-system.md`
3. **Discovery 먼저 실행한다:**
   - `playbooks/discover-context.md` — `context/product-context.md`의 필수 항목(서비스 배경, 타겟 유저, 핵심 가치, 비즈니스 목표, 핵심 시나리오, 플랫폼, 톤&무드)을 점검한다.
   - 빠진 항목이 있으면 사용자에게 질문하고, 답변을 받아 `context/product-context.md`를 업데이트한다.
   - **Discovery가 완료되어야 다음 단계로 진행한다.**
4. **Figma 사용 가능 여부를 먼저 확인한다:**
   - `playbooks/check-figma-access.md` — 연결 상태를 확인하고, **안 되면 멈춰서 사용자에게 묻는다.**
   - 조용히 폴백하지 않는다. 연결은 1~2분이면 되는데, 묻지 않으면 Phase 6까지 다 돈 뒤에야
     Figma 산출물이 없다는 것을 알게 되고 전체를 다시 돌려야 한다.
   - 사용자의 선택을 `specs/figma-info.md`에 기록한다. **이후 Phase는 다시 묻지 않는다.**
5. **1-Pager를 생성한다:**
   - Figma 사용 → `playbooks/create-figma-onepager.md`. 파일 정보를 `specs/figma-info.md`에 기록한다.
     Phase 2에서 Wireframe Agent가 같은 파일의 1-pager 우측에 와이어프레임을 배치한다.
   - Figma 미사용 → `specs/product-1-pager.md`에 같은 구조의 마크다운으로 작성한다.
6. Playbook을 순서대로 실행한다:
   - `playbooks/analyze-requirements.md`
   - `playbooks/create-user-flow.md`
   - `playbooks/create-screen-spec.md`
   - `playbooks/create-checklist.md` — **Critic이 채점할 기준을 미리 확정한다**
7. Output: `context/product-context.md` (업데이트), 1-pager(Figma 또는 `specs/product-1-pager.md`), `specs/figma-info.md`, `specs/user-flow.md`, `specs/screens.md`, `evaluation/checklist.md` (Part A)
8. **체크포인트**: `playbooks/report-checkpoint.md`를 실행한다.
   산출물 표에 Key Scenarios 개수, 화면 개수, 막다른 화면 0 여부, checklist Part A 생성 여부, Figma 사용/폴백을 넣는다.

### Phase 2: Wireframe (Wireframe Agent)
1. `agents/wireframe.md`를 읽는다.
2. Context를 읽는다: `context/design-system.md`, `context/ux-principles.md`, `specs/screens.md`, `specs/figma-info.md`
3. `specs/figma-info.md`를 보고 Phase 1에서 결정된 경로를 따른다. **여기서 다시 묻지 않는다.**
   Figma 사용이면 `figma-use` 스킬을 로드한다 (MCP resource: `skill://figma/figma-use/SKILL.md`).
4. Playbook을 순서대로 실행한다:
   - `playbooks/map-components.md` — Screen 요소를 DS 컴포넌트에 매핑
   - `playbooks/design-layout.md` — 정보 계층과 레이아웃 설계
   - `playbooks/build-wireframe-figma.md` — Figma에 와이어프레임 프레임 생성 (`use_figma`)
   - `playbooks/implement-responsive-figma.md` — Mobile(375px) + Desktop(1440px) 프레임 쌍
5. **구조 검증 + 시각 검증을 수행한다** (`build-wireframe-figma.md` 5절).
   `use_figma`는 에러 없이 성공해도 레이아웃이 깨질 수 있다. 스크린샷을 실제로 본다.
6. Output: Figma 파일 내 화면별 와이어프레임 프레임, `specs/figma-info.md` 업데이트
7. **체크포인트**: `playbooks/report-checkpoint.md` — 와이어프레임 화면 수, Mobile/Desktop 쌍 여부,
   Figma 사용/폴백, **구조 검증 결과와 시각 검증으로 고친 결함 수**

**Figma 미사용으로 결정된 경우** (Phase 1의 `check-figma-access.md` 결과)
HTML 경로로 진행한다:
   - `playbooks/build-wireframe-html.md` — HTML 와이어프레임 작성
   - `playbooks/implement-responsive.md` — 반응형 구현

이 경우 Phase 3의 `build-prototype-html.md`는 **생략한다** (HTML이 이미 존재하므로).

### Phase 3: Prototype (Prototype Agent)
1. `agents/prototype.md`를 읽는다.
2. Context를 읽는다: `specs/user-flow.md`, `specs/screens.md`, `specs/figma-info.md`, `context/ux-principles.md`, `context/design-system.md`
3. Playbook을 순서대로 실행한다:
   - `playbooks/build-prototype-html.md` — **Figma 와이어프레임 → HTML 골격** (반드시 첫 번째)
     (`get_design_context` / `get_screenshot`으로 프레임 구조를 확인한 뒤 HTML로 옮긴다)
   - `playbooks/create-mock-data.md`
   - `playbooks/connect-navigation.md`
   - `playbooks/implement-interactions.md`
   - `playbooks/manage-state.md`
4. Output: Interactive Prototype (`prototype/index.html`, `styles.css`, `app.js`)
5. **체크포인트**: `playbooks/report-checkpoint.md` — 생성 파일, 구현 화면 수, 상태 제어 쿼리 구현 여부

> Phase 2의 산출물은 **Figma 프레임이지 HTML이 아니다.**
> `build-prototype-html.md`를 건너뛰면 이후 Playbook들이 존재하지 않는 HTML을 전제하게 된다.

### Phase 4: Critique (Critic Agent)
1. `agents/critic.md`를 읽는다.
2. 모든 Context + Specs + Prototype 파일을 읽는다.
3. Playbook을 순서대로 실행한다:
   - `playbooks/check-prototype-runs.md` — **브라우저 실행 검증** (반드시 첫 번째)
   - `playbooks/check-requirements.md`
   - `playbooks/check-ux-principles.md`
   - `playbooks/check-design-system.md`
   - `playbooks/write-critique-report.md`
4. Output: `evaluation/critique-report.md`
5. **체크포인트**: `playbooks/report-checkpoint.md` — **판정(Pass/Revise)**, 실행 검증 수행 여부,
   콘솔 에러 수, Critical/Major/Minor 건수.
   판정이 Revise면 선택지를 "수정 진행 / 확인만 하고 멈춤 / 특정 이슈 무시하고 Pass"로 바꾼다.

> 코드를 읽기 전에 **먼저 띄워본다.** 백지 화면, 레이아웃 깨짐, 반응 없는 버튼은
> 소스만 읽어서는 보이지 않는다.

### Phase 5: Refine (조건부)
Critique 판정이 **Revise**이면:
1. 수정 지시를 읽는다.
2. Wireframe Agent 수정 사항은 Wireframe Agent 역할로, Prototype Agent 수정 사항은 Prototype Agent 역할로 수정한다.
3. 수정한 내용을 `evaluation/critique-report.md`에 **회차별로 덧붙인다** (무엇을 고쳤고 재검증 결과가 무엇인지).
4. Phase 4 (Critique)를 다시 실행한다. 실행 검증부터 다시 한다.
5. 최대 3회 반복한다.

Refine 각 회차에서는 멈추지도, 보고하지도 않는다. **최종 판정이 날 때 한 번만** 보고한다.
같은 ID의 이슈가 2회 연속 남으면 그 사실을 보고에 명시한다 — 수정 방향이 틀렸다는 신호다.

### Phase 6: Human Review
Pass 판정이거나 Refine 3회 완료 시:
1. 최종 Prototype 실행 방법을 안내한다:
   ```bash
   cd prototype && python3 -m http.server 8000
   # → http://localhost:8000
   ```
   (`file://`로 열면 `sessionStorage` 기반 상태 유지가 동작하지 않는다)
2. Critique Report 요약을 보여준다.
3. 상태 제어 쿼리로 각 상태를 직접 볼 수 있음을 안내한다:
   `?reset=1`(초기화) `?seed=0`(신규 사용자) `?state=loading` `?state=error`
4. Figma 와이어프레임을 생성했다면 Figma 파일 링크도 함께 안내한다.

## Input
사용자의 요청: $ARGUMENTS

요청이 없으면 `context/product-context.md`의 Key Scenarios를 기반으로 전체 Prototype을 생성한다.
