# Skill: Figma 사용 가능 여부 확인

## 목적
Figma 작업을 시작하기 **전에** 연결 상태를 확인하고, 안 되면 **사용자에게 묻는다.**

> 묻지 않고 마크다운·HTML로 조용히 넘어가면, 사용자는 Phase 6까지 다 돌고 나서야
> Figma 산출물이 없다는 것을 안다. 연결은 1~2분이면 되는데 전체를 다시 돌리게 된다.
> **되돌리는 비용이 묻는 비용보다 훨씬 크다.**

## 사용하는 Agent
- Planner Agent (Phase 1, Figma 1-pager 생성 직전 — **여기서 한 번만 묻는다**)
- 대화형 환경이면 Claude Code / Codex 어느 쪽이든 동일하게 적용한다
- Wireframe Agent (`/wireframe` 단독 실행 시, `specs/figma-info.md`에 기록이 없을 때만)

---

## 절차

### 1. 이미 결정되어 있는지 먼저 본다

`specs/figma-info.md`에 **"Figma 미사용"** 이 기록되어 있으면 묻지 않는다.
사용자가 이미 Phase 1에서 선택한 것이다. 그대로 폴백 경로로 진행한다.

fileKey가 기록되어 있으면 그 파일을 계속 사용한다. 역시 묻지 않는다.

**한 번의 파이프라인에서 Figma 여부를 두 번 묻지 않는다.**

### 2. 연결 상태를 확인한다

Figma MCP 도구를 호출할 수 있는지 본다. 아래 중 하나라도 해당하면 **사용 불가**다.

| 상태 | 신호 |
|------|------|
| 서버 미연결 | MCP 서버 목록에 figma 계열이 없거나 `CONNECTION_CLOSED` 등 연결 실패 |
| 미인증 | 인증 도구(`authenticate`)만 노출되고 실제 작업 도구가 없음 |
| 서버 미등록 | 해당 환경에 Figma MCP 서버가 추가되어 있지 않음 |

**플랫폼으로 판단하지 않는다. 실제 호출 가능 여부로 판단한다.**
Claude Code와 Codex 모두 MCP를 지원한다. 어느 쪽이든 Figma 서버가 등록·인증되어 있으면 쓸 수 있고,
아니면 쓸 수 없다. "이 도구는 Figma를 못 쓴다"고 미리 단정하지 않는다.

### 3. 사용 가능하면 그대로 진행
`playbooks/create-figma-onepager.md` 또는 `playbooks/build-wireframe-figma.md`로 간다.

### 4. 사용 불가하면 멈추고 묻는다

AskUserQuestion으로 **하나**만 묻는다. **조용히 폴백하지 않는다.**

**질문**: `Figma MCP에 연결할 수 없습니다. 어떻게 할까요?`

| # | 라벨 | 설명 |
|---|------|------|
| 1 | **Figma 연결하고 진행** (권장) | 인증을 먼저 하고, 1-pager와 와이어프레임을 Figma에 생성합니다 |
| 2 | **Figma 없이 진행** | 1-pager는 마크다운, 와이어프레임은 HTML로 만듭니다. **나중에 Figma로 바꾸려면 Phase 1부터 다시 실행해야 합니다** |
| 3 | **중단** | 여기서 멈춥니다. Figma를 먼저 설정하고 다시 시작합니다 |

2번 설명에 **"나중에 바꾸려면 다시 돌려야 한다"를 반드시 포함한다.**
그 정보 없이는 사용자가 비용을 모르고 선택하게 된다.

### 5. 선택에 따라 처리

**1번 — 연결하고 진행**

환경에 맞는 방법을 안내한다.

| 환경 | 확인 | 등록·인증 |
|------|------|----------|
| Claude Code | `/mcp` 로 서버 목록과 상태 확인 | figma MCP의 인증 도구 호출 |
| Codex | `codex mcp list` 로 등록된 서버 확인 | `codex mcp add` 로 추가, `codex mcp login <name>` 으로 인증 |

- 브라우저 인증이 필요하면 사용자가 직접 완료해야 하므로, 끝나면 알려달라고 요청하고 기다린다.
- 연결된 뒤 2번 단계(연결 확인)를 다시 수행한다.
- 두 번 시도해도 안 되면 원인을 한 줄로 설명하고 선택지를 다시 제시한다. 무한히 재시도하지 않는다.

**2번 — Figma 없이 진행**
- `specs/figma-info.md`에 **"Figma 미사용"과 그 이유**를 기록한다. 이후 Phase가 이 기록을 보고 다시 묻지 않는다.
- 폴백 경로로 진행한다:

| 원래 | 폴백 |
|------|------|
| Figma 1-pager (`create-figma-onepager.md`) | `specs/product-1-pager.md` 마크다운 |
| Figma 와이어프레임 (`build-wireframe-figma.md` + `implement-responsive-figma.md`) | `build-wireframe-html.md` + `implement-responsive.md` |
| Phase 3의 `build-prototype-html.md` | **생략** (HTML이 이미 존재) |

**3번 — 중단**
- 지금까지의 산출물 위치를 안내한다.
- Figma 설정 후 어떤 명령으로 재개하는지 알려준다 (`/wire` 또는 `/plan-wire`).

---

## Output
- 사용 가능 → 그대로 Figma 경로
- 사용 불가 + 사용자가 폴백 선택 → `specs/figma-info.md`에 "Figma 미사용" 기록

```markdown
# Figma File Info

**Figma 미사용** — <이유: MCP 미연결 / 사용자 선택 / Codex 환경>
결정 시점: Phase 1 (사용자 확인함)

## 대체 산출물
| 원래 산출물 | 대체 |
|------------|------|
| Figma 1-Pager 프레임 | `specs/product-1-pager.md` |
| Figma 와이어프레임 프레임 | `prototype/` HTML 와이어프레임 |

## Figma를 나중에 연결하는 경우
1. figma MCP 인증 후 `playbooks/create-figma-onepager.md`를 재실행한다.
2. `playbooks/build-wireframe-figma.md`로 와이어프레임을 다시 생성한다.
3. 이 파일에 fileKey / nodeId / Wireframe 시작 X 좌표를 기록한다.
```

## 검증
- Figma 작업을 **시작하기 전에** 확인했는가? (작업 도중 실패로 알게 되지 않았는가)
- 사용 불가일 때 **조용히 넘어가지 않고 물었는가?**
- 폴백 선택지에 "나중에 바꾸려면 다시 실행해야 한다"를 명시했는가?
- 결정을 `specs/figma-info.md`에 기록해 이후 Phase가 다시 묻지 않게 했는가?
- 플랫폼 이름이 아니라 **실제 호출 가능 여부**로 판단했는가?
- 사용자에게 물을 수 없는 비대화형 환경에서만 묻지 않고 폴백했는가?
