전체 파이프라인을 실행한다: Plan → Wireframe → Prototype → Critique → Refine → Human Review

## 실행 절차

### Phase 1: Plan (Planner Agent)
1. `agents/planner.md`를 읽는다.
2. Context를 읽는다: `context/product-context.md`, `context/ux-principles.md`, `context/design-system.md`
3. **Discovery 먼저 실행한다:**
   - `playbooks/discover-context.md` — `context/product-context.md`의 필수 항목(서비스 배경, 타겟 유저, 핵심 가치, 비즈니스 목표, 핵심 시나리오, 플랫폼, 톤&무드)을 점검한다.
   - 빠진 항목이 있으면 사용자에게 질문하고, 답변을 받아 `context/product-context.md`를 업데이트한다.
   - **Discovery가 완료되어야 다음 단계로 진행한다.**
4. **Figma 1-Pager를 생성한다:**
   - `playbooks/create-figma-onepager.md` — Figma 파일을 만들고, Discovery 결과를 1-pager 프레임으로 구성한다.
   - 파일 정보를 `specs/figma-info.md`에 기록한다.
   - 이후 Phase 2에서 Wireframe Agent가 같은 Figma 파일의 1-pager 우측에 와이어프레임을 배치한다.
5. Playbook을 순서대로 실행한다:
   - `playbooks/analyze-requirements.md`
   - `playbooks/create-user-flow.md`
   - `playbooks/create-screen-spec.md`
6. Output: `context/product-context.md` (업데이트), Figma 1-pager, `specs/figma-info.md`, `specs/user-flow.md`, `specs/screens.md`
7. **체크포인트**: Figma 1-pager 링크 + User Flow와 Screen 목록을 사용자에게 보여주고 확인을 받는다. 사용자가 수정을 요청하면 반영한다.

### Phase 2: Wireframe (Wireframe Agent)
1. `agents/wireframe.md`를 읽는다.
2. Context를 읽는다: `context/design-system.md`, `context/ux-principles.md`, `specs/screens.md`, `specs/figma-info.md`
3. Figma MCP `figma-use` 스킬을 로드한다 (MCP resource: `skill://figma/figma-use/SKILL.md`).
4. Playbook을 순서대로 실행한다:
   - `playbooks/map-components.md` — Screen 요소를 DS 컴포넌트에 매핑
   - `playbooks/design-layout.md` — 정보 계층과 레이아웃 설계
   - `playbooks/build-wireframe-figma.md` — Figma에 와이어프레임 프레임 생성 (`use_figma`)
   - `playbooks/implement-responsive-figma.md` — Mobile(375px) + Desktop(1440px) 프레임 쌍
5. Output: Figma 파일 내 화면별 와이어프레임 프레임, `specs/figma-info.md` 업데이트

### Phase 3: Prototype (Prototype Agent)
1. `agents/prototype.md`를 읽는다.
2. Context를 읽는다: `specs/user-flow.md`, `specs/screens.md`, `specs/figma-info.md`, `context/ux-principles.md`
3. Figma 와이어프레임을 참조한다: `get_design_context` 또는 `get_screenshot`으로 Figma 와이어프레임의 구조와 레이아웃을 확인한다.
3. Playbook을 순서대로 실행한다:
   - `playbooks/create-mock-data.md`
   - `playbooks/connect-navigation.md`
   - `playbooks/implement-interactions.md`
   - `playbooks/manage-state.md`
4. Output: Interactive Prototype (`prototype/index.html`)

### Phase 4: Critique (Critic Agent)
1. `agents/critic.md`를 읽는다.
2. 모든 Context + Specs + Prototype 파일을 읽는다.
3. Playbook을 순서대로 실행한다:
   - `playbooks/check-requirements.md`
   - `playbooks/check-ux-principles.md`
   - `playbooks/check-design-system.md`
   - `playbooks/write-critique-report.md`
4. Output: `evaluation/critique-report.md`
5. **체크포인트**: Critique 결과 요약을 사용자에게 보여준다.

### Phase 5: Refine (조건부)
Critique 판정이 **Revise**이면:
1. 수정 지시를 읽는다.
2. Wireframe Agent 수정 사항은 Wireframe Agent 역할로, Prototype Agent 수정 사항은 Prototype Agent 역할로 수정한다.
3. Phase 4 (Critique)를 다시 실행한다.
4. 최대 3회 반복한다.

### Phase 6: Human Review
Pass 판정이거나 Refine 3회 완료 시:
1. 최종 Prototype 위치를 안내한다: `prototype/index.html`
2. Critique Report 요약을 보여준다.
3. 브라우저에서 확인하도록 안내한다.

## Input
사용자의 요청: $ARGUMENTS

요청이 없으면 `context/product-context.md`의 Key Scenarios를 기반으로 전체 Prototype을 생성한다.
