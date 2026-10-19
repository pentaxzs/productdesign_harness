# productdesign_harness

AI 프로토타이핑을 위한 Harness Engineering 템플릿.

"와이어프레임 그려줘"가 아니라 **"질문 먼저, 기획 나중"** — AI가 맥락을 확보하고, 기획하고, 와이어프레임을 그리고, 검증까지 하는 파이프라인입니다.

## 사용 환경

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — 슬래시 명령어(`/wire`)로 파이프라인 실행
- [Codex](https://github.com/openai/codex) — `AGENTS.md` 기반으로 파이프라인 실행
- Figma MCP 연동 시 Figma에 직접 와이어프레임 생성 가능 (Claude Code만 해당)

## 이 하네스를 쓰는 방식

**`/wire`는 따로 설치하는 스킬이 아닙니다.** 레포 전체가 하나의 스킬입니다.

```
제품 하나 = 이 레포 클론 하나
```

`/wire` 명령은 `.claude/commands/wire.md` 한 파일이지만, 그 안에서 `agents/`, `playbooks/`,
`context/` 의 파일 30여 개를 **상대 경로로** 불러옵니다. 명령 파일만 떼어내면 동작하지 않습니다.
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

### 1. 제품 이름으로 클론

**하네스 1개 = 제품 1개**입니다. 레포 이름을 만들 제품 이름으로 바꿔서 클론하세요.

```bash
git clone https://github.com/pentaxzs/productdesign_harness.git my-product
cd my-product
```

제품이 늘어나면 디렉토리를 하나 더 클론합니다. `context/`, `specs/`, `prototype/`, `evaluation/`이 제품별로 분리됩니다.

### 2. 하네스 루트에서 실행

> ⚠️ **반드시 `cd` 한 다음 실행하세요.** 상위 디렉토리에서 실행하면 `/wire`가 등록되지 않습니다. ([왜?](#슬래시-명령어가-안-뜰-때))

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

Codex는 `AGENTS.md`를 자동으로 읽고, 같은 파이프라인(Plan → Wireframe → Prototype → Critique)을 실행합니다. 단, Figma MCP 연동은 지원되지 않으므로 와이어프레임은 HTML로 생성됩니다.

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

### 전역 등록(`~/.claude/commands/`)을 권장하지 않는 이유

명령어 파일만 전역에 두면 **하네스가 동작하지 않습니다.**

1. **본체가 안 따라옵니다** — `.claude/commands/*.md`는 `agents/`, `playbooks/`, `context/` 안의 파일 31개를 **상대 경로로** 참조하는 진입점일 뿐입니다. 다른 디렉토리에서 호출하면 전부 읽지 못합니다.
2. **규칙이 로드되지 않습니다** — `CLAUDE.md`의 품질 기준(DS 우선, 화면당 Primary CTA 1개, 375/1440px, 터치 타겟 44px, Empty/Error/Loading 필수)은 실행 위치가 하네스 안일 때만 컨텍스트에 올라갑니다. 전역 호출은 **절차는 돌지만 기준이 빠진 채** 실행됩니다.
3. **산출물이 엉뚱한 곳에 쌓입니다** — 파이프라인은 `specs/`, `prototype/`, `evaluation/`에 파일을 쓰고 `context/product-context.md`를 갱신합니다.

전역 등록은 `/commit`처럼 실행 위치에 독립적인 명령어에 적합합니다. 이 하네스는 디렉토리 전체가 런타임입니다.

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
├── CLAUDE.md                    ← 하네스 규칙 (Claude Code)
├── AGENTS.md                    ← 하네스 규칙 (Codex)
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
│   └── ...                      ←   총 23개
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

## 커스터마이징

이 하네스는 **제품 중립적인 템플릿**입니다. 바로 쓸 수 있지만, 아래를 수정하면 결과가 좋아집니다.

| 파일 | 언제 수정하나 | 수정하지 않으면 |
|------|-------------|----------------|
| `context/design-system.md` | 자체 DS를 쓸 때 | Figma Simple Design System 기준으로 설계됩니다 |
| `context/ux-principles.md` | 팀의 원칙이 따로 있을 때 | 범용 7원칙이 적용됩니다 |
| `context/product-context.md` | 미리 채워두고 싶을 때 | Discovery 단계에서 AI가 질문해서 채웁니다 |
| `evaluation/checklist.md` | Part B(공통 기준)를 바꾸고 싶을 때 | Part A(제품별)는 Planner가 자동 생성합니다 |
| `playbooks/` | 절차를 추가·변경할 때 | 기본 23개 Playbook이 실행됩니다 |

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
