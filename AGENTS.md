# Wireframe Prototype Harness — Codex 진입점

이 파일은 **Codex용 진입점**입니다. 절차와 규칙을 여기에 적지 않습니다.
Claude Code는 `/wire` 슬래시 명령으로 바로 시작하지만, Codex에는 그 기능이 없어
이 파일이 대신 시작점 역할을 합니다.

> **왜 여기에 절차를 복제하지 않는가**
> 예전에는 이 파일이 파이프라인 전체를 복제하고 있었고, `.claude/commands/wire.md`만
> 갱신되면서 playbook 3개(`build-prototype-html`, `check-prototype-runs`, `create-checklist`)가
> 누락된 채로 뒤처졌다. 그 상태의 Codex는 브라우저 검증 없이 Pass 판정을 냈다.
> 같은 내용을 두 곳에 두면 반드시 어긋난다. **단일 출처만 둔다.**

---

## 실행 절차

사용자가 프로토타입 생성을 요청하면:

1. **`CLAUDE.md`를 읽는다** — 반드시 지켜야 할 규칙 (Design System 우선, 화면당 Primary CTA 1개,
   Mobile First 375px / PC 1440px, 터치 타겟 44px, 상태 제어 쿼리, 진행 보고, 종료 조건)
2. **`.claude/commands/wire.md`를 읽는다** — Phase 1~6 전체 절차. 어떤 Agent와 Playbook을
   어떤 순서로 실행할지가 모두 여기에 있다
3. 그 절차를 따른다. 단, 아래 **Codex 환경 차이**를 적용한다

특정 단계만 실행하려면 `.claude/commands/` 의 해당 파일을 읽는다:
`plan-wire.md`(기획) `wireframe.md`(와이어프레임) `proto.md`(프로토타입) `critique.md`(검증)

---

## Codex 환경 차이

`wire.md`의 절차를 그대로 따르되, 아래 세 가지만 다르게 처리한다.

### 1. Figma MCP가 등록되어 있지 않으면 → HTML 경로

Codex도 MCP를 지원한다 (`codex mcp list` / `add` / `login`).
Figma 서버를 등록해 두었다면 **Claude Code와 동일하게 Figma 경로로 진행한다.**
아래 폴백은 서버가 없거나 인증되지 않았을 때만 적용한다.

| wire.md의 지시 | Codex에서 |
|---|---|
| Phase 1 — `create-figma-onepager.md`로 Figma 1-pager 생성 | **`specs/product-1-pager.md`에 마크다운으로 작성** |
| Phase 2 — `build-wireframe-figma.md` + `implement-responsive-figma.md` | **`build-wireframe-html.md` + `implement-responsive.md`** |
| Phase 3 — `build-prototype-html.md`로 Figma → HTML 변환 | **생략** (HTML이 이미 존재하므로) |

`specs/figma-info.md`에는 "Figma 미사용"과 그 이유를 기록한다.
이것은 폴백이지 실패가 아니다. **파이프라인을 중단하지 않는다.**

`playbooks/check-figma-access.md`를 Claude Code와 동일하게 실행한다.
Figma를 쓸 수 없으면 **묻는다.** Codex도 대화형이므로 물을 수 있다.
연결 방법만 환경에 맞게 안내한다: `codex mcp add` 로 서버를 추가하고 `codex mcp login` 으로 인증한다.

비대화형(스크립트·CI 등)으로 실행 중이라 물을 수 없을 때만 바로 폴백하고 그 사실을 기록한다.

### 2. 브라우저 도구가 없을 수 있다 → 실행 검증

Phase 4의 `check-prototype-runs.md`(브라우저 실행 검증)를 수행할 수 없으면:

- 리포트에 **"실행 검증 미수행"과 그 이유**를 명시한다
- 판정은 코드 검토 기준으로만 내리되, `Pass`에 **"(실행 미검증)"** 단서를 붙인다
- 검증하지 않은 것을 검증한 것처럼 기록하지 않는다

브라우저 도구를 쓸 수 있는 환경이면 그대로 수행한다. 코드만 읽어서는 백지 화면,
레이아웃 깨짐, 반응 없는 버튼을 찾을 수 없다.

### 3. 슬래시 명령이 없다 → 진행 보고

`wire.md`의 체크포인트 규칙(`playbooks/report-checkpoint.md`)은 그대로 적용한다.
각 Phase를 마치면 산출물을 요약하고 **멈춰서 묻는다.**

`--auto` 플래그 대신, 사용자가 "끝까지 진행"을 요청하면 이후 묻지 않는다.
**Refine은 어느 경우에도 멈추지 않는다.**

---

## 파일 지도

| 알고 싶은 것 | 읽을 파일 |
|---|---|
| 지켜야 할 규칙 | `CLAUDE.md` |
| 전체 절차 (Phase 1~6) | `.claude/commands/wire.md` |
| 단계별 절차 | `.claude/commands/{plan-wire,wireframe,proto,critique}.md` |
| 각 Agent의 역할과 판단 기준 | `agents/{planner,wireframe,prototype,critic}.md` |
| 구체적 작업 방법 | `playbooks/*.md` (23개) |
| 제품 배경·UX 원칙·디자인 시스템 | `context/*.md` |
| 검증 체크리스트 | `evaluation/checklist.md` |
| 완성된 산출물 예시 | `examples/cardfit/` |

**이 파일에 절차나 규칙을 추가하지 않는다.** 추가해야 할 것이 있으면
`CLAUDE.md`(규칙) 또는 `.claude/commands/wire.md`(절차)에 넣는다.
