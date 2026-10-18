# productdesign_harness

AI 프로토타이핑을 위한 Harness Engineering 템플릿.

"와이어프레임 그려줘"가 아니라 **"질문 먼저, 기획 나중"** — AI가 맥락을 확보하고, 기획하고, 와이어프레임을 그리고, 검증까지 하는 파이프라인입니다.

## 사용 환경

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — 슬래시 명령어(`/wire`)로 파이프라인 실행
- [Codex](https://github.com/openai/codex) — `AGENTS.md` 기반으로 파이프라인 실행
- Figma MCP 연동 시 Figma에 직접 와이어프레임 생성 가능 (Claude Code만 해당)

## 빠른 시작

```bash
# 1. 클론
git clone https://github.com/pentaxzs/productdesign_harness.git
cd productdesign_harness
```

### Claude Code

```bash
claude
/wire 카드 추천 서비스 만들어줘
```

`/wire`를 실행하면 AI가 먼저 질문합니다. 답변하면 기획 → 와이어프레임 → 프로토타입 → 검증까지 자동으로 진행됩니다.

### Codex

```bash
codex
> 카드 추천 서비스 프로토타입을 만들어줘. AGENTS.md의 파이프라인을 따라 실행해줘.
```

Codex는 `AGENTS.md`를 자동으로 읽고, 같은 파이프라인(Plan → Wireframe → Prototype → Critique)을 실행합니다. 단, Figma MCP 연동은 지원되지 않으므로 와이어프레임은 HTML로 생성됩니다.

## 명령어 (Claude Code)

| 명령 | 설명 |
|------|------|
| `/wire` | 전체 파이프라인 실행 (Plan → Wireframe → Prototype → Critique → Refine) |
| `/plan-wire` | Plan 단계만 실행 |
| `/wireframe` | Wireframe 단계만 실행 |
| `/proto` | Prototype 단계만 실행 |
| `/critique` | Critique 단계만 실행 |

## 파이프라인

```
Phase 1: Plan        — 질문으로 맥락 확보 → 1-Pager → 요구사항 → User Flow → Screen Spec
Phase 2: Wireframe   — Figma에 Mobile(375px) + Desktop(1440px) 와이어프레임 생성
Phase 3: Prototype   — HTML/CSS/JS Interactive Prototype 생성
Phase 4: Critique    — 요구사항·UX원칙·디자인시스템 기준 검증
Phase 5: Refine      — Critique에서 Revise 판정 시 수정 (최대 3회)
Phase 6: Human Review — 최종 확인
```

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
│   └── ...                      ←   총 17개
├── context/                     ← Context (배경 지식)
│   ├── product-context.md       ←   제품 배경
│   ├── ux-principles.md         ←   UX 원칙
│   └── design-system.md         ←   디자인 시스템
├── specs/                       ← 기획 산출물 (자동 생성)
├── prototype/                   ← 프로토타입 산출물 (자동 생성)
└── evaluation/                  ← 검증 산출물 (자동 생성)
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

이 하네스를 자신의 프로젝트에 맞게 수정할 수 있습니다:

- **다른 제품에 적용**: `context/product-context.md`를 비우고 `/wire`를 실행하면 AI가 새로 질문합니다.
- **디자인 시스템 변경**: `context/design-system.md`를 자신의 DS에 맞게 수정합니다.
- **UX 원칙 변경**: `context/ux-principles.md`를 팀의 원칙에 맞게 수정합니다.
- **Playbook 추가**: `playbooks/`에 새 .md 파일을 추가하고, Agent나 Skill에서 참조합니다.

## 포함된 예시

`context/`, `specs/`, `evaluation/` 디렉토리에 카드 추천 서비스(CardFit) 예시 데이터가 포함되어 있습니다. 실제 서비스가 아닌 가상 데이터이며, 각 파일의 형식과 내용을 참고할 수 있습니다.

## 관련 글

이 하네스의 설계 과정과 배경은 MakersNote 38호에서 자세히 다루고 있습니다.
👉 https://maily.so/makersnote/

## License

MIT
