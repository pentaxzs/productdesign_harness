# Skill: 시각 언어 선택 (선택 단계)

## 목적
프로토타입의 **색·타이포·간격 토큰**을 어디서 가져올지 정한다.

> 이 단계가 없으면 AI가 토큰 값을 **즉흥적으로 지어낸다.**
> Tone & Mood가 "친근하고 가벼움"이라는 이유만으로 `--color-accent: #5B4BE8` 같은 값이
> 근거 없이 정해진다. 프로토타입으로는 동작하지만, 왜 그 색인지 설명할 수 없다.

## 사용하는 Agent
- Prototype Agent (Phase 3, `build-prototype-html.md` 직전)

> **왜 Phase 3인가**
> Phase 2 와이어프레임은 **구조**를 보여주는 단계라 회색 팔레트를 쓴다
> (`build-wireframe-figma.md`). 브랜드 색이 실제로 쓰이는 건 `styles.css`를 쓸 때다.

**이 단계는 건너뛸 수 있다.** 건너뛰면 Tone & Mood에서 토큰을 생성한다 — 지금까지의 동작과 같다.

---

## 절차

### 1. 이미 정해져 있는지 본다
`context/design-tokens.md` 가 존재하면 그대로 쓴다. 묻지 않는다.

### 2. 묻는다

AskUserQuestion으로 **하나**만 묻는다.

**질문**: `프로토타입의 색·폰트·간격을 어떻게 정할까요?`

| # | 라벨 | 설명 |
|---|------|------|
| 1 | **Tone & Mood에서 생성** (기본) | `context/product-context.md`의 톤을 근거로 토큰을 만듭니다. 추가 입력 없이 바로 진행 |
| 2 | **DESIGN.md 붙여넣기** | 가지고 계신 DESIGN.md를 주시면 그대로 씁니다. [getdesign.md](https://getdesign.md/)에 실제 사이트에서 추출한 카탈로그가 있습니다 |
| 3 | **직접 지정** | 브랜드 색·폰트만 알려주셔도 됩니다. 나머지는 채웁니다 |

1번이 기본이자 건너뛰기다. **사용자가 아무 말 없이 넘어가면 1번으로 진행한다.**

### 3. 선택을 반영한다

**1번 — Tone & Mood에서 생성**
- `context/product-context.md`의 Tone & Mood와 Target Users를 근거로 토큰을 정한다.
- **왜 그 값인지 한 줄로 적는다.** 근거 없는 값을 남기지 않는다.
  ```
  --color-accent: #5B4BE8   /* 학습 집중을 방해하지 않는 차분한 보라. 과한 게임화 지양 */
  ```

**2번 — DESIGN.md 붙여넣기**
- 사용자가 붙여넣은 내용을 `context/design-tokens.md` 로 저장한다.
- DESIGN.md는 색·타이포·간격과 **그 이유**를 담은 문서다. 이유 부분을 버리지 않는다.
- 자동으로 가져올 수 없다. 카탈로그에 유료 구간이 있고, 하네스가 로그인하지 않는다.
  **사용자가 직접 붙여넣는다.**
- 실제 브랜드에서 추출된 것이면 **그 사실을 기록한다.** 내부 논의용 프로토타입에는 문제없지만,
  그대로 출시하면 남의 시각 언어를 복제하는 것이다. 한 줄 남겨 나중에 판단할 수 있게 한다.

**3번 — 직접 지정**
- 받은 값을 토큰에 넣고, 빠진 부분은 1번 방식으로 채운다.

### 4. 토큰을 기록한다

`context/design-tokens.md` 에 아래 형식으로 쓴다. `build-prototype-html.md`가 이 파일을 읽어
`styles.css`의 CSS Variables를 만든다.

```markdown
# Design Tokens

> 출처: <Tone & Mood 생성 / DESIGN.md: 이름 / 사용자 직접 지정>
> 결정 시점: Phase 3

## Color
| 토큰 | 값 | 근거 |
|------|-----|------|
| `--color-accent` | #5B4BE8 | 차분한 보라. 과한 게임화 지양 |
| `--color-bg` | #FFFFFF | |
...

## Typography
폰트 패밀리, 크기 스케일

## Spacing
4px 기반 스케일

## Radius
```

`context/design-system.md`의 Design Tokens 절과 충돌하면 **이 파일이 우선한다.**
`design-system.md`는 컴포넌트 인벤토리가 본체이고, 토큰은 그 DS의 기본값일 뿐이다.

---

## Output
- `context/design-tokens.md` (1·2·3 어느 경우든 생성)

## 검증
- 토큰마다 근거가 있는가? (최소한 accent와 주요 색은)
- 4px 기반 간격 스케일을 지키는가?
- Light/Dark 양쪽 값이 있는가? (프로토타입이 다크 모드를 지원한다면)
- DESIGN.md를 썼다면 출처와 실제 브랜드 여부를 기록했는가?
- 사용자가 건너뛰었을 때 **막히지 않고** Tone & Mood로 진행했는가?
