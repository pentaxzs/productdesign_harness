# productdesign_harness

AI 프로토타이핑을 위한 Harness Engineering 템플릿.

"와이어프레임 그려줘"가 아니라 **"질문 먼저, 기획 나중"** — AI가 맥락을 확보하고, 기획하고, 와이어프레임을 그리고, 검증까지 하는 파이프라인입니다.

## 사용 환경

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — 슬래시 명령어(`/wire`)로 파이프라인 실행
- [Codex](https://github.com/openai/codex) — `AGENTS.md` 기반으로 파이프라인 실행
- Figma MCP 연동 시 Figma에 직접 1-Pager와 와이어프레임 생성 가능 (Claude Code / Codex 모두)

## 이 하네스를 쓰는 방식

**`/wire`는 따로 설치하는 스킬이 아닙니다.** 레포 전체가 하나의 스킬입니다.

```
제품 하나 = 이 레포 클론 하나
```

`/wire` 명령은 `.claude/commands/wire.md` 한 파일이지만, 그 안에서 `agents/`, `playbooks/`,
`context/` 의 파일 30개를 **상대 경로로** 불러옵니다. 명령 파일만 떼어내면 동작하지 않습니다.
그래서 "스킬을 설치"하는 게 아니라 **폴더를 통째로 복제**하는 것이 곧 설치입니다.

```bash
# 제품 A
git clone https://github.com/pentaxzs/productdesign_harness.git cardfit
cd cardfit && claude        # → /wire

# 제품 B — 새로 클론
git clone https://github.com/pentaxzs/productdesign_harness.git japanese-app
cd japanese-app && claude   # → /wire
```

각 폴더는 완전히 독립적입니다. `context/`(제품 배경·UX 원칙·디자인 시스템)와
`specs/` · `prototype/` · `evaluation/`(산출물)이 제품별로 분리되어 서로 영향을 주지 않습니다.

> **제품마다 달라지는 게 정상입니다.** 일본어 학습 앱과 카드 추천 서비스가 같은 UX 원칙,
> 같은 디자인 시스템을 쓸 이유가 없습니다. 클론을 분리하면 각자 다르게 가져갈 수 있습니다.

하네스가 개선되면 [업스트림에서 받아옵니다](#하네스-업데이트-받기).

---

## 빠른 시작

### 1. 만들 제품의 이름으로 클론

**하네스 1개 = 제품 1개**입니다.
아래 `my-product` 자리에 **실제로 만들 제품 이름을 직접 적으세요.** 그 이름으로 폴더가 생깁니다.

```bash
# my-product 를 실제 제품 이름으로 바꾸세요
git clone https://github.com/pentaxzs/productdesign_harness.git <제품명>
cd <제품명>
```

예를 들어 일본어 학습 앱을 만든다면:

```bash
git clone https://github.com/pentaxzs/productdesign_harness.git japanese-app
cd japanese-app
```

이렇게 하면 `japanese-app/` 폴더가 생기고, **그 안에 그 제품만의 하네스 한 벌**이 들어갑니다.

```
japanese-app/
├── .claude/commands/   ← /wire 가 여기 있습니다. 이 폴더 안에서만 동작합니다
├── agents/ playbooks/  ← 파이프라인 본체
├── context/            ← 이 제품의 배경·UX 원칙·디자인 시스템
├── specs/              ← 이 제품의 기획 산출물
├── prototype/          ← 이 제품의 프로토타입
└── evaluation/         ← 이 제품의 검증 리포트
```

제품이 늘어나면 **다른 이름으로 한 번 더 클론합니다.**

```bash
git clone https://github.com/pentaxzs/productdesign_harness.git cardfit
git clone https://github.com/pentaxzs/productdesign_harness.git shopping-app
```

각 폴더는 서로를 모릅니다. `japanese-app` 에서 `/wire` 를 돌리면 `japanese-app/specs/` 에만 쓰고,
`cardfit/` 은 건드리지 않습니다.

### 2. 그 폴더 안에서 실행

> ⚠️ **`claude` 를 반드시 제품 폴더 안에서 실행하세요.**
> `/wire` 는 **클론한 폴더 안에서만** 동작합니다. 상위 폴더에서 실행하면 등록되지 않습니다.
> 이미 실행 중인 세션에서 `cd` 로 옮겨가는 것으로는 **안 됩니다** — 재시작해야 합니다.
> ([왜?](#슬래시-명령어가-안-뜰-때))

```bash
cd japanese-app   # 제품 폴더로 이동
claude            # 여기서 실행해야 /wire 가 등록됩니다
```

#### Claude Code

```bash
claude
/wire 만들고 싶은 서비스를 한 줄로 설명
```

`/wire`를 실행하면 AI가 먼저 질문합니다. 답변하면 기획 → 와이어프레임 → 프로토타입 → 검증까지 자동으로 진행됩니다.

#### Codex

```bash
codex
> OO 프로토타입을 만들어줘. AGENTS.md의 파이프라인을 따라 실행해줘.
```

Codex는 `AGENTS.md`를 자동으로 읽고, 같은 파이프라인(Plan → Wireframe → Prototype → Critique)을 실행합니다.

### Figma 연동

Figma MCP가 연결되어 있으면 Phase 1에서 **1-Pager**를, Phase 2에서 **와이어프레임(Mobile + Desktop)** 을 Figma 파일에 직접 생성합니다.

**Claude Code와 Codex 모두 가능합니다.** 둘 다 MCP를 지원하므로, Figma 서버를 등록·인증해 두면 어느 쪽에서든 Figma 경로로 진행합니다.

| 환경 | 확인 | 등록·인증 |
|------|------|----------|
| Claude Code | `/mcp` | figma MCP 인증 도구 호출 |
| Codex | `codex mcp list` | `codex mcp add` → `codex mcp login <name>` |

연결되어 있지 않으면 파이프라인이 Phase 1에서 **멈추고 물어봅니다.**

```
Figma MCP에 연결할 수 없습니다. 어떻게 할까요?
  1. Figma 연결하고 진행    — 인증 후 Figma에 생성합니다
  2. Figma 없이 진행        — 1-pager는 마크다운, 와이어프레임은 HTML.
                             나중에 Figma로 바꾸려면 Phase 1부터 다시 실행해야 합니다
  3. 중단
```

조용히 폴백하지 않습니다. 연결은 1~2분이면 되는데, 묻지 않으면 끝까지 다 돌고 나서야 Figma 산출물이 없다는 걸 알게 되기 때문입니다.

선택은 `specs/figma-info.md` 에 기록되고, 이후 단계에서는 다시 묻지 않습니다.
비대화형(스크립트·CI)으로 실행 중이라 물을 수 없을 때만 바로 폴백합니다.

---

## 슬래시 명령어가 안 뜰 때

`/wire`를 입력해도 자동완성에 나오지 않는다면 대부분 아래 둘 중 하나입니다.

### 실행 위치가 하네스 루트가 아님

Claude Code는 슬래시 명령어를 **실행한 디렉토리의 `.claude/commands/`** 와 `~/.claude/commands/` 에서만 읽습니다. 하위 폴더는 스캔하지 않습니다.

```
workspace/
├── .claude/              ← claude를 여기서 실행하면
└── my-product/
    └── .claude/commands/ ← 여기 있는 /wire 를 못 찾음
```

→ `cd my-product` 후 `claude`를 실행하세요.

### 세션 도중에 클론함

명령어 목록은 Claude Code **시작 시점에 한 번** 읽습니다. 실행 중에 클론했다면 이번 세션에는 반영되지 않습니다.

→ Claude Code를 재시작하세요.

### 세션 중에 `cd` 로 옮겨감

이게 가장 흔한 경우입니다. 명령어 목록은 **`claude` 를 실행한 그 디렉토리** 기준으로 시작할 때 한 번 정해집니다.
세션 안에서 `cd` 로 폴더를 옮겨 다녀도 목록은 바뀌지 않습니다.

```bash
claude                 # MakersBook 에서 시작 → 여기 기준으로 목록 확정
# ... 세션 안에서 cd my-product 해봐야 /wire 는 여전히 없음
```

→ 세션을 종료하고 제품 폴더 안에서 다시 `claude` 를 실행하세요.
`/` 만 입력했을 때 목록에 `wire` 가 보이면 성공입니다.

### 전역 등록(`~/.claude/commands/`)을 권장하지 않는 이유

명령어 파일만 전역에 두면 **하네스가 동작하지 않습니다.**

1. **본체가 안 따라옵니다** — `.claude/commands/*.md`는 `agents/`, `playbooks/`, `context/` 안의 파일 30개를 **상대 경로로** 참조하는 진입점일 뿐입니다. 다른 디렉토리에서 호출하면 전부 읽지 못합니다.
2. **규칙이 로드되지 않습니다** — `CLAUDE.md`의 품질 기준(DS 우선, 화면당 Primary CTA 1개, 375/1440px, 터치 타겟 44px, Empty/Error/Loading 필수)은 실행 위치가 하네스 안일 때만 컨텍스트에 올라갑니다. 전역 호출은 **절차는 돌지만 기준이 빠진 채** 실행됩니다.
3. **산출물이 엉뚱한 곳에 쌓입니다** — 파이프라인은 `specs/`, `prototype/`, `evaluation/`에 파일을 쓰고 `context/product-context.md`를 갱신합니다.

전역 등록은 `/commit`처럼 실행 위치에 독립적인 명령어에 적합합니다. 이 하네스는 디렉토리 전체가 런타임입니다.

### 제품마다 따로 두면 좋은 점

전역 하나로 쓰는 것보다 제품마다 폴더를 두는 쪽이 나은 이유입니다.

| | 제품별 클론 | 전역 하나 |
|---|---|---|
| **제품 맥락** | `context/product-context.md` 가 제품마다 하나. 섞이지 않음 | 제품을 바꿀 때마다 덮어써야 함 |
| **UX 원칙·디자인 시스템** | 제품 성격에 맞게 각자 수정 | 모든 제품이 같은 기준을 강요받음 |
| **산출물** | `specs/` `prototype/` `evaluation/` 이 제품 폴더 안에 | 어디에 쌓일지 불분명 |
| **버전 관리** | 제품별 git 이력. 기획이 어떻게 바뀌었는지 추적 가능 | 하나의 이력에 여러 제품이 뒤섞임 |
| **되돌리기** | 망치면 그 폴더만 지우면 됨 | 다른 제품까지 영향 |
| **공유** | 폴더째 전달하면 그대로 재현됨 | 받는 쪽에서 맥락을 다시 맞춰야 함 |

특히 **UX 원칙과 디자인 시스템이 제품마다 달라지는 게 정상**입니다.
일본어 학습 앱에는 "진도와 성취를 눈에 보이게" 같은 원칙이 필요하고,
금융 서비스에는 "정보 출처와 기준일 표기"가 필요합니다. 한 벌로 공유할 수 없습니다.

하네스 자체가 개선되면 각 폴더에서 [업스트림으로 받아옵니다](#하네스-업데이트-받기).
제품 내용은 그대로 두고 `agents/` · `playbooks/` 만 갱신됩니다.

## 명령어 (Claude Code)

보통은 `/wire` 하나만 씁니다. 나머지는 특정 단계만 다시 돌릴 때 쓰는 것입니다.

```bash
/wire 좋아하는 애니 대사로 일본어 배우는 앱
```

입력은 **만들고 싶은 서비스를 한 줄로** 적으면 됩니다. 정교할 필요 없습니다 —
부족한 맥락은 AI가 Discovery 단계에서 질문으로 채웁니다.
아무것도 안 적으면 `context/product-context.md`의 Key Scenarios를 기준으로 진행하고,
그 파일도 비어 있으면 질문부터 시작합니다.

| 명령 | 하는 일 | 선행 조건 | 산출물 |
|------|---------|----------|--------|
| `/wire` | 전체 파이프라인 (Plan → Wireframe → Prototype → Critique → Refine) | 없음 | 아래 전부 |
| `/plan-wire` | 질문으로 맥락 확보 → User Flow + Screen Spec + 검증 체크리스트 | 없음 | `context/product-context.md`, `specs/user-flow.md`, `specs/screens.md`, `evaluation/checklist.md` |
| `/wireframe` | Screen Spec → 화면별 와이어프레임 (Mobile + Desktop) | `specs/screens.md` | Figma 프레임 또는 `prototype/` HTML, `specs/layouts.md` |
| `/proto` | 와이어프레임 → 동작하는 Interactive Prototype | `specs/screens.md` + 와이어프레임 | `prototype/index.html`, `styles.css`, `app.js` |
| `/critique` | 브라우저로 띄워 검증 → 피드백 리포트 | `prototype/index.html` | `evaluation/critique-report.md` |

선행 조건이 없으면 무엇을 먼저 실행해야 하는지 안내합니다.
모든 명령에 `--auto` 를 붙일 수 있습니다 ([진행 방식](#진행-방식--단계마다-멈춥니다)).

### 특정 단계만 다시 돌리기

```bash
/plan-wire 화면을 5개로 줄이고 비교 기능 빼줘   # 기획부터 다시
/proto                                          # 프로토타입만 다시
/critique                                       # 검증만 다시
```

이전 단계 산출물은 그대로 두고 해당 단계만 다시 실행합니다.
`/wire` 로 한 바퀴 돈 뒤 특정 부분만 손볼 때 씁니다.

### 진행 방식 — 단계마다 멈춥니다

각 단계가 끝나면 산출물을 요약해 보여주고 **멈춰서 묻습니다.**

```
### ✅ Phase 1 — Planner 완료

| 산출물 | 내용 |
|--------|------|
| specs/user-flow.md | Flow 5개, 화면 7개, 막다른 화면 0 |
| specs/screens.md   | 화면별 Spec (핵심 정보·CTA·상태·DS 컴포넌트) |
| evaluation/checklist.md | Part A 생성 — Key Scenarios 5개 |

**다음**: Phase 2 — Figma 와이어프레임 생성

? Phase 1 결과로 진행할까요?
  1. 다음 단계 진행       — 다음 단계가 끝나면 다시 묻습니다
  2. 끝까지 진행          — 이후 묻지 않고 완주 (요약은 계속 표시)
  3. 화면 범위 조정       — 화면 수를 줄이거나 시나리오를 바꿉니다
  4. 여기서 멈춤
```

**2번을 고르면 그 뒤로는 묻지 않습니다.** 결과를 한 번 보고 판단한 뒤 맡길 수 있습니다.
처음부터 묻지 않게 하려면 `--auto` 를 붙입니다.

```bash
/wire 일본어 학습 앱           # 단계마다 멈추고 물음 (기본)
/wire 일본어 학습 앱 --auto    # 처음부터 끝까지 묻지 않음
```

Critic이 Revise 판정을 내렸을 때의 수정(Refine)은 **어느 경우에도 멈추지 않습니다.**
고칠 것이 이미 명확하기 때문입니다. 최종 판정이 날 때 한 번만 보고합니다.

## 파이프라인

```
Phase 1: Plan        — 질문으로 맥락 확보 → 1-Pager → 요구사항 → User Flow → Screen Spec → 검증 체크리스트
Phase 2: Wireframe   — Figma에 Mobile(375px) + Desktop(1440px) 와이어프레임 생성
Phase 3: Prototype   — Figma → HTML 골격 변환 → 데이터·네비게이션·인터랙션·상태
Phase 4: Critique    — 브라우저 실행 검증 → 요구사항·UX원칙·디자인시스템 검증
Phase 5: Refine      — Critique에서 Revise 판정 시 수정 (최대 3회)
Phase 6: Human Review — 최종 확인
```

각 Phase가 끝날 때마다 멈춰서 산출물 요약과 선택지를 보여줍니다 ([진행 방식](#진행-방식--단계마다-멈춥니다)).

**Figma MCP가 없어도 동작합니다.** Phase 1의 1-Pager는 마크다운으로, Phase 2의 와이어프레임은 HTML 경로로 자동 전환되며, 파이프라인은 중단되지 않습니다. Codex 환경이 이 경로를 사용합니다.

### 프로토타입 실행

```bash
cd prototype && python3 -m http.server 8000
# → http://localhost:8000
```

`file://`로 열면 `sessionStorage` 기반 상태 유지가 동작하지 않습니다.

프로토타입은 URL 쿼리로 상태를 바꿔 볼 수 있습니다:

| 쿼리 | 보이는 것 |
|------|----------|
| `?reset=1` | 저장된 상태를 비우고 기본 데모 상태로 복원 |
| `?seed=0` | 데이터가 전혀 없는 신규 사용자 (Empty State) |
| `?state=loading` | 로딩 상태 |
| `?state=error` | 오류 상태 |

목업에는 실제 네트워크 실패가 없어서, 이 쿼리가 없으면 Empty/Loading/Error를 볼 방법이 없습니다.

## 구조

```
productdesign_harness/
├── CLAUDE.md                    ← 하네스 규칙 (단일 출처)
├── AGENTS.md                    ← Codex 진입점 (절차는 wire.md 참조)
├── scripts/check-consistency.sh ← 문서 일관성 검사
├── .claude/commands/            ← Skill (트리거, Claude Code 전용)
│   ├── wire.md                  ←   전체 파이프라인
│   ├── plan-wire.md             ←   Plan만
│   ├── wireframe.md             ←   Wireframe만
│   ├── proto.md                 ←   Prototype만
│   └── critique.md              ←   Critique만
├── agents/                      ← Agent (역할 정의)
│   ├── planner.md               ←   PM — 문제 구조화
│   ├── wireframe.md             ←   UX Designer — 화면 설계
│   ├── prototype.md             ←   Interaction Designer
│   └── critic.md                ←   Design Reviewer — 검증
├── playbooks/                   ← Playbook (실행 절차)
│   ├── discover-context.md      ←   Discovery (질문)
│   ├── create-figma-onepager.md ←   Figma 1-Pager 생성
│   └── ...                      ←   총 24개
├── context/                     ← Context (배경 지식)
│   ├── product-context.md       ←   제품 배경 (빈 템플릿 — Discovery가 채움)
│   ├── ux-principles.md         ←   UX 원칙 (수정해서 사용)
│   └── design-system.md         ←   디자인 시스템 (교체해서 사용)
├── specs/                       ← 기획 산출물 (자동 생성)
├── prototype/                   ← 프로토타입 산출물 (자동 생성)
├── evaluation/                  ← 검증 산출물 (자동 생성)
│   └── checklist.md             ←   검증 체크리스트 템플릿
└── examples/cardfit/            ← 완성된 산출물 예시 (참고용)
```

## 핵심 개념

| 개념 | 역할 | 비유 |
|------|------|------|
| **Skill** | 명령어로 Agent를 깨운다 | 시동 버튼 |
| **Agent** | 누가 일하는가, 무엇을 아는가 | 담당자 |
| **Playbook** | 어떻게 일하는가 (재사용 가능) | 매뉴얼 |
| **Context** | 무엇을 알아야 하는가 | 배경 지식 |
| **Rules** | 무엇을 지켜야 하는가 | 원칙 |
| **Evaluation** | 제대로 만들었는가 | 체크리스트 |

## 하네스를 수정했다면

문서 일관성 검사를 돌립니다. 같은 내용이 여러 파일에 흩어져 있어
한쪽만 고치면 어긋나는 것을 잡아줍니다.

```bash
./scripts/check-consistency.sh
```

- playbook 참조가 실제 파일과 일치하는지
- `CLAUDE.md` Agent 표가 `agents/*.md` 와 일치하는지
- README의 playbook 개수 표기가 맞는지
- `AGENTS.md` 가 절차를 복제하고 있지 않은지

## 커스터마이징

이 하네스는 **제품 중립적인 템플릿**입니다. 바로 쓸 수 있지만, 아래를 수정하면 결과가 좋아집니다.

| 파일 | 언제 수정하나 | 수정하지 않으면 |
|------|-------------|----------------|
| `context/design-system.md` | 자체 DS를 쓸 때 | Figma Simple Design System 기준으로 설계됩니다 |
| `context/ux-principles.md` | 팀의 원칙이 따로 있을 때 | 범용 7원칙이 적용됩니다 |
| `context/product-context.md` | 미리 채워두고 싶을 때 | Discovery 단계에서 AI가 질문해서 채웁니다 |
| `evaluation/checklist.md` | Part B(공통 기준)를 바꾸고 싶을 때 | Part A(제품별)는 Planner가 자동 생성합니다 |
| `playbooks/` | 절차를 추가·변경할 때 | 기본 24개 Playbook이 실행됩니다 |

**Playbook 추가**: `playbooks/`에 새 .md 파일을 만들고 Agent(`agents/*.md`)나 Skill(`.claude/commands/*.md`)의 실행 순서에 추가합니다.

## 하네스 업데이트 받기

제품 폴더는 클론 시점의 하네스를 그대로 들고 갑니다. 이후 하네스가 개선되면 `upstream` 리모트로 가져옵니다.

```bash
cd my-product
git remote add upstream https://github.com/pentaxzs/productdesign_harness.git
git pull upstream main
```

`agents/`와 `playbooks/`를 수정하지 않았다면 그대로 머지됩니다.
`context/`, `specs/`, `prototype/`, `evaluation/`은 제품별 내용이므로 충돌이 날 수 있습니다. 이때는 자기 것을 유지하세요:

```bash
git checkout --ours context/ specs/ prototype/ evaluation/
git add . && git commit
```

> 이미 완성된 프로토타입은 굳이 갱신하지 않아도 됩니다.
> 새 제품은 클론하는 시점에 이미 최신 하네스입니다.

## 포함된 예시

`examples/cardfit/`에 카드 추천 서비스(CardFit)의 **완성된 산출물 한 세트**가 들어 있습니다. 각 단계의 결과물이 어떤 형식이어야 하는지 참고할 수 있습니다.

| 파일 | 단계 |
|------|------|
| `context/product-context.md` | Discovery 완료 결과 |
| `specs/user-flow.md`, `specs/screens.md` | Phase 1 (Plan) |
| `prototype/index.html`, `app.js`, `styles.css` | Phase 3 (Prototype) |
| `evaluation/critique-report.md` | Phase 4 (Critique) |

실제 서비스가 아닌 가상 데이터입니다. 하네스 본체에는 제품 고유 내용이 포함되어 있지 않습니다.

## 관련 글

이 하네스의 설계 과정과 배경은 MakersNote 38호에서 자세히 다루고 있습니다.
👉 https://maily.so/makersnote/

## License

MIT
