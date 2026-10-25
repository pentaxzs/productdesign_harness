# Skill: 디자인 시스템 선택

## 목적
와이어프레임을 그리기 전에 **어떤 컴포넌트 인벤토리를 쓸지** 정한다.

> 기본값은 Figma Simple Design System이다. 하지만 자체 DS를 가진 팀이
> 그 사실을 말할 기회조차 없이 SDS로 전체가 만들어지면, 나중에 바꾸려고
> Phase 2부터 다시 돌려야 한다. **묻는 비용보다 되돌리는 비용이 훨씬 크다.**

## 사용하는 Agent
- Wireframe Agent (Phase 2 맨 앞, `map-components.md` 직전)

> **왜 Phase 2인가**
> DS는 Wireframe Agent의 핵심 Context다. 실제로 컴포넌트를 고르고 배치하는 주체가 여기다.
> Phase 1은 이미 Discovery 7항목과 Figma 확인으로 혼잡하고, `/wireframe` 단독 실행도
> 지원해야 한다. 사용자도 화면 목록을 승인한 직후라 더 나은 판단을 할 수 있다.

---

## 이 Playbook이 정하는 것 / 정하지 않는 것

| | 여기서 정함 | 여기서 안 정함 |
|---|---|---|
| **컴포넌트 인벤토리** — Button, Card Grid, Tag Toggle… | ✅ | |
| **시각 언어** — 브랜드 색, 폰트, 간격 스케일 | | ➡️ `playbooks/select-visual-language.md` (Phase 3) |

와이어프레임은 **구조를 보여주는 것**이므로 브랜드 색을 쓰지 않는다
(`build-wireframe-figma.md`의 회색 팔레트). 시각 언어는 Phase 3에서 정한다.

---

## 절차

### 1. 이미 정해져 있는지 본다

`context/design-system.md` 첫 줄에 `> 출처:` 가 있으면 이미 선택된 것이다. **묻지 않는다.**
한 파이프라인에서 같은 질문을 두 번 하지 않는다.

### 2. 사용 가능한 DS를 탐지한다

**묻기 전에 찾는다.** "어떤 DS를 쓰시겠어요?"는 답하기 어렵지만,
"이거 중에 고르세요"는 쉽다.

**Figma 라이브러리** — Figma를 쓰는 경우 (`specs/figma-info.md` 확인)
```
get_libraries({ fileKey })
→ libraries_added_to_file / libraries_available_to_add
```

**코드 레포** — 아래 흔적을 찾는다. 있으면 그 DS를 쓰고 있을 가능성이 높다.
| 신호 | 추정 |
|------|------|
| `components/ui/` + `components.json` | shadcn/ui |
| `tailwind.config.*` | Tailwind (토큰은 여기, 컴포넌트는 별도) |
| `package.json`에 `@mui/`, `antd`, `@chakra-ui/` | 해당 라이브러리 |
| `*.figma.tsx` / `*.figma.ts` (Code Connect) | 코드↔Figma 연결된 자체 DS |
| `**/design-system/`, `**/packages/ui/` | 사내 DS 패키지 |

### 3. 찾은 게 없으면 묻지 않는다

SDS 기본값으로 조용히 진행한다. **선택지가 없는 사람에게 질문을 보이지 않는다.**
`context/design-system.md` 첫 줄에 `> 출처: Figma Simple Design System (기본값)` 을 기록한다.

### 4. 찾았으면 멈추고 묻는다

AskUserQuestion으로 **하나**만 묻는다.

**질문**: `와이어프레임에 어떤 디자인 시스템을 쓸까요?`

| # | 라벨 | 설명 |
|---|------|------|
| 1 | **〈탐지된 DS 이름〉** | 어디서 찾았는지 명시 (예: "Figma 라이브러리 / 48개 컴포넌트") |
| 2 | **Simple Design System** (기본) | Figma 공식 SDS. 지금 `context/design-system.md`에 들어 있는 것 |
| 3 | **직접 작성** | 컴포넌트 목록을 직접 알려주시면 반영합니다 |

탐지된 게 2개 이상이면 1번 자리에 나열한다 (선택지 최대 4개).

### 5. 선택을 반영한다

**1번 — 탐지된 DS**
- Figma 라이브러리: `search_design_system` 으로 컴포넌트를 조회해 인벤토리를 만든다.
- 코드 레포: 컴포넌트 디렉터리와 export를 읽어 목록을 만든다.
- `context/design-system.md` 를 **같은 형식**으로 다시 쓴다:
  `Component Inventory`(이름 + 용도) + `Design Tokens` + `Usage Rules`.
  형식을 유지해야 `map-components.md` 와 `check-design-system.md` 가 그대로 동작한다.

**2번 — SDS 기본**
- 아무것도 바꾸지 않는다. 첫 줄에 출처만 기록한다.

**3번 — 직접 작성**
- 컴포넌트 목록을 받아 같은 형식으로 작성한다.
- 목록이 빈약하면 SDS를 바탕으로 두고 차이점만 덮어쓸지 제안한다.

### 6. 결정을 기록한다

`context/design-system.md` 첫 줄:
```markdown
> 출처: <DS 이름> — <탐지 경로 또는 "사용자 직접 작성" 또는 "기본값">
> 결정 시점: Phase 2 (사용자 확인함 / 자동 선택)
```

이후 `/wireframe` 단독 실행이나 Refine 때 이 줄을 보고 다시 묻지 않는다.

---

## Output
- `context/design-system.md` (선택한 DS 기준으로 갱신, 첫 줄에 출처 기록)

## 검증
- 탐지를 **먼저** 하고 물었는가? ("무엇을 원하냐"가 아니라 "무엇을 가지고 있냐")
- 찾은 게 없을 때 묻지 않고 조용히 SDS로 갔는가?
- 갱신한 `design-system.md` 가 기존 형식(Inventory / Tokens / Usage Rules)을 유지하는가?
- 첫 줄에 출처를 기록해 이후 Phase가 다시 묻지 않게 했는가?
- 브랜드 색·폰트를 여기서 정하지 **않았는가?** (그건 Phase 3)
