# Skill: 핵심 화면 하이파이 (선택 단계)

## 목적
**핵심 화면 1~2개만** 실제 디자인 수준으로 올려, 시각 방향을 합의한다.

> 와이어프레임은 "무엇이 어디 있는가"를 묻고, 하이파이는 **"이 방향으로 가도 되는가"** 를 묻는다.
> 다른 질문이므로 별도 단계다. 그리고 **전체 화면에 하지 않는다.**

## 사용하는 Agent
- Wireframe Agent (Phase 2.5, 와이어프레임 확정 후)

---

## 왜 1~2개만 하는가

전체를 하이파이로 올리는 것은 **권하지 않는다.**

| 이유 | |
|------|---|
| **방향 합의에 1개면 충분하다** | 핵심 화면 하나를 보면 "이 톤이 맞나"를 판단할 수 있다. 14개를 봐야 알 수 있는 게 아니다 |
| **품질이 가장 떨어지는 구간이다** | 구조는 규칙으로 되지만 하이파이는 절제와 타이포 판단이 필요하다. 양이 늘수록 평균이 내려간다 |
| **완성돼 보이는데 완성되지 않은 것** | 전체가 색을 입으면 다 된 것처럼 보인다. 회색 와이어프레임이 오히려 정직하다 |
| **비용** | 와이어프레임 14개에 `use_figma` 4회 + 수정 3라운드가 들었다. 하이파이는 더 무겁다 |

합의된 뒤 나머지는 사람이 확장하거나, 다음 반복에서 늘린다.

---

## 전제
- Phase 2 와이어프레임이 완성되고 검증을 통과했다.
- `context/design-tokens.md`가 있다. 없으면 **`playbooks/select-visual-language.md`를 먼저 실행한다.**
  색·타이포 근거 없이 하이파이를 만들면 그냥 색칠이 된다.
- `specs/figma-info.md`에 와이어프레임 nodeId가 있다.

---

## 절차

### 1. 대상 화면을 고른다

`specs/screens.md`에서 **★ 표시된 핵심 화면**을 고른다. 없으면 사용자에게 묻는다.

**고르는 기준** — 제품의 정체성이 가장 잘 드러나는 화면.
목록·설정 화면이 아니라 **사용자가 가장 오래 머무는 화면**이다.

> 예시 (세리후): 문장 학습 — 대사가 주인공인 화면이라 타이포와 여백이 제품의 핵심이다.

최대 2개. 2개를 고른다면 성격이 다른 것으로 (예: 콘텐츠 중심 1 + 목록 중심 1).

### 2. 와이어프레임을 복제한다

**원본을 수정하지 않는다.** 와이어프레임은 구조 합의의 기록으로 남겨야 한다.

```javascript
const wf = await figma.getNodeByIdAsync("WIREFRAME_NODE_ID");
const hifi = wf.clone();
hifi.name = wf.name.replace("[Mobile]", "[Hi-Fi Mobile]");
hifi.x = 3000;   // 와이어프레임 영역 우측
hifi.y = wf.y;
figma.currentPage.appendChild(hifi);
return { hifiId: hifi.id };
```

배치: 와이어프레임 오른쪽에 **별도 열**로. Desktop 프레임 우측 끝 + 200px.

### 3. 토큰을 적용한다

`context/design-tokens.md`의 값을 Figma Variables로 만들고 **바인딩한다.**
하드코딩하지 않는다 — 토큰을 바꿨을 때 디자인이 따라와야 한다.

```javascript
const col = figma.variables.createVariableCollection("Design Tokens");
const v = figma.variables.createVariable("color/accent", col, "COLOR");
v.scopes = ["FRAME_FILL", "SHAPE_FILL"];        // ALL_SCOPES 금지
v.setValueForMode(col.modes[0].modeId, { r: .357, g: .294, b: .910 });
// 적용
node.fills = [figma.variables.setBoundVariableForPaint(
  { type: "SOLID", color: { r: 0, g: 0, b: 0 } }, "color", v)];
```

### 4. 실제 컴포넌트로 교체한다

와이어프레임의 회색 박스를 `context/design-system.md`의 **실제 DS 컴포넌트 인스턴스**로 바꾼다.
DS가 Figma 라이브러리면 `importComponentByKeyAsync`로 가져온다.

DS에 없는 것만 커스텀으로 두되, 토큰은 반드시 쓴다.

### 5. 타이포와 여백을 다듬는다

여기가 하이파이의 본체다. 색만 칠하는 게 아니다.

- **위계를 크기가 아니라 대비로도** 만든다 (굵기, 색, 여백)
- **여백이 위계를 만든다** — 관련된 것은 붙이고, 다른 것은 띄운다
- **읽는 것은 왼쪽 정렬** — 중앙 정렬은 짧은 것만
- 자간·행간을 본문 크기에 맞게 (한국어·일본어는 행간을 넉넉히)

### 6. 검증한다

`playbooks/build-wireframe-figma.md`의 **Auto Layout 함정 3종**이 그대로 적용된다.
복제본에서도 `resize()` 양축 리셋, HUG 부모 + FILL 자식, 가로 넘침이 똑같이 발생한다.

그리고 **스크린샷을 본다.** 하이파이는 특히 눈으로 봐야 한다.
`playbooks/check-design-quality.md`의 "반복되는 패턴" 표를 여기서도 적용한다 —
의미 없는 그라디언트, 그림자 남발, 전부 둥글게.

---

## Output
- Figma 파일 내 `[Hi-Fi Mobile] 화면이름` / `[Hi-Fi Desktop] 화면이름`
- Figma Variables 컬렉션 (토큰)
- `specs/figma-info.md`에 하이파이 프레임 nodeId 기록

## 체크포인트
이 단계가 끝나면 **멈추고 묻는다** (`playbooks/report-checkpoint.md`).
목적이 방향 합의이므로, 합의 없이 Phase 3으로 넘어가면 단계 자체가 무의미하다.

선택지:
1. **이 방향으로 진행** — Phase 3에서 프로토타입을 이 시안에 맞춰 만든다
2. **시각 방향 수정** — 토큰이나 타이포를 바꿔 다시
3. **다른 화면도 하이파이** — 1개 더
4. **와이어프레임으로 충분** — 하이파이를 버리고 Phase 3으로

## 검증
- 대상이 **1~2개인가?** (전체로 번지지 않았는가)
- 원본 와이어프레임을 **보존**했는가?
- 색을 **변수로 바인딩**했는가? (하드코딩 아님)
- `design-tokens.md`의 근거와 실제 적용이 일치하는가?
- Auto Layout 함정 3종을 검사했는가?
- 스크린샷을 **실제로 봤는가?**
