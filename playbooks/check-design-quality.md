# Skill: 디자인 품질 점검

## 목적
프로토타입이 **디자이너 눈으로 봐도 괜찮은지** 점검한다.
간격·색·타이포의 일관성, 위계, 그리고 AI가 만든 결과물에서 반복되는 패턴을 찾는다.

> `check-ux-principles.md`는 "정보 계층이 명확한가" 같은 **원칙 준수**를 본다.
> 이 Playbook은 "간격이 12/13/14px로 섞여 있지 않은가" 같은 **실행 품질**을 본다.
> 둘 다 통과해야 "개발 논의를 시작할 수 있는" 수준이 된다.

## 사용하는 Agent
- Critic Agent (`check-prototype-runs.md` 다음, 실행 검증이 끝난 뒤)

## 전제
- `playbooks/check-prototype-runs.md`가 수행되어 프로토타입이 브라우저에 떠 있다.
- `context/design-tokens.md` 또는 `context/design-system.md`에 기준 토큰이 있다.

---

## 1. 실제 사용된 값을 수집한다 (추정하지 않는다)

눈으로 세지 않는다. **렌더된 페이지에서 계산된 값을 뽑는다.**

```javascript
// 브라우저에서 실행 — 실제로 쓰인 값만 모은다
const used = { color: {}, bg: {}, fontSize: {}, radius: {}, gap: {}, pad: {}, shadow: {} };
const bump = (b, k) => { if (k && k !== "none" && k !== "0px" && k !== "rgba(0, 0, 0, 0)") b[k] = (b[k]||0)+1; };
for (const el of document.querySelectorAll("body *")) {
  if (!el.offsetParent && el.tagName !== "BODY") continue;   // 숨은 요소 제외
  const s = getComputedStyle(el);
  bump(used.color, s.color); bump(used.bg, s.backgroundColor);
  bump(used.fontSize, s.fontSize); bump(used.radius, s.borderRadius);
  bump(used.gap, s.gap); bump(used.shadow, s.boxShadow);
  [s.paddingTop, s.paddingLeft].forEach(v => bump(used.pad, v));
}
const sorted = o => Object.entries(o).sort((a,b) => b[1]-a[1]);
return Object.fromEntries(Object.entries(used).map(([k,v]) => [k, sorted(v)]));
```

**Mobile(375px)과 Desktop(1440px) 양쪽에서 수집한다.** 반응형에서만 깨지는 값이 있다.

---

## 2. 수집한 값을 기준과 대조한다

| 항목 | 판정 기준 | 심각도 |
|------|----------|--------|
| **간격 스케일 이탈** | 4px 배수가 아닌 값 (15px, 30px, 13px…) | Major |
| **비슷하지만 다른 값** | 12/13/14px 처럼 1~2px 차이로 공존 | Major |
| **색 종류 과다** | 텍스트 색 5종 초과, 배경 색 6종 초과 | Major |
| **팔레트 이탈** | 토큰에 없는 색이 하드코딩됨 | Major |
| **타이포 크기 과다** | 8종 초과 | Minor |
| **위계 미구분** | 인접한 크기 차이가 2px 이하 (15px vs 16px) | Major |
| **radius 혼재** | 3종 초과, 또는 같은 역할에 다른 값 | Minor |
| **대비 부족** | 본문 4.5:1 미만, 큰 텍스트 3:1 미만 (WCAG AA) | **Critical** |

대비는 계산한다. 눈으로 "괜찮아 보인다"로 넘기지 않는다.

---

## 3. AI 결과물에서 반복되는 패턴을 찾는다

아래는 **에러가 아니지만 완성도를 떨어뜨리는** 것들이다. 발견하면 Minor 이상으로 기록한다.

| 패턴 | 증상 | 왜 문제인가 |
|------|------|------------|
| **의미 없는 그라디언트** | 버튼·카드 배경에 근거 없는 2색 그라디언트 | 시선을 끌 이유가 없는 곳에서 끈다 |
| **그림자 남발** | 거의 모든 카드에 box-shadow | 깊이 위계가 사라진다. 떠 있어야 할 것만 띄운다 |
| **전부 둥글게** | 모든 요소에 같은 radius | 요소 간 구분이 사라진다 |
| **이모지로 아이콘 대체** | 🏠 🔍 📖 을 UI 아이콘으로 | 플랫폼마다 다르게 렌더되고 톤이 흔들린다 |
| **중앙 정렬 남발** | 읽어야 할 본문까지 중앙 정렬 | 왼쪽 정렬이 읽기 쉽다. 중앙은 짧은 것만 |
| **보라/파랑 그라디언트 기본값** | `#667eea → #764ba2` 류 | 제품과 무관한 "AI가 만든 티" |
| **빈 공간 공포** | 모든 영역을 콘텐츠로 채움 | 여백이 위계를 만든다 |
| **라벨 중복** | 아이콘 옆에 같은 뜻의 텍스트가 또 | |

> **단정하지 않는다.** 그라디언트가 브랜드의 일부일 수 있고, 이모지가 톤에 맞을 수 있다.
> `context/product-context.md`의 Tone & Mood와 `context/design-tokens.md`의 근거를 먼저 읽고,
> **거기에 설명이 있으면 문제가 아니다.** 설명 없이 등장한 것만 지적한다.

---

## 4. 스크린샷으로 확인한다

수치로 안 잡히는 것들이다. Mobile·Desktop 각 1장 이상.

- **광학 정렬** — 수치상 맞는데 시각적으로 어긋나 보이는 곳
- **시선 흐름** — 가장 중요한 것에 눈이 먼저 가는가
- **밀도** — 특정 영역만 빽빽하거나 허전한가
- **같은 역할, 다른 모양** — 같은 종류의 버튼이 화면마다 다르게 생겼는가

---

## Output
`write-critique-report.md`에 전달할 디자인 품질 결과:

```markdown
## 디자인 품질

### 사용된 값
| 항목 | 종류 | 값 |
|------|------|-----|
| 텍스트 색 | 4종 | #1A1A1A(82) #6B6B70(31) … |
| 간격 | 6종 | 16px(44) 8px(23) … |
| 타이포 | 7종 | 14px(51) 12px(28) … |

### 기준 이탈
| 항목 | 내용 | 심각도 |
|------|------|--------|
| 간격 스케일 | 13px 사용 (4px 배수 아님) — `.quota__head` | Major |

### 반복 패턴
| 패턴 | 위치 | 근거 확인 |
|------|------|----------|
| 이모지 아이콘 | 하단 탭바 3개 | Tone & Mood에 "친근하게" 있음 → 의도적 |

### 대비 (WCAG AA)
| 요소 | 전경/배경 | 비율 | 판정 |
|------|----------|------|------|
| 본문 | #6B6B70 / #FFFFFF | 5.1:1 | Pass |
```

## 검증
- 값을 **추정하지 않고 렌더된 페이지에서 수집**했는가?
- Mobile·Desktop 양쪽에서 수집했는가?
- 대비를 실제로 계산했는가?
- 반복 패턴을 지적하기 전에 **Tone & Mood와 토큰 근거를 확인**했는가?
- 스크린샷으로 수치에 안 잡히는 것을 봤는가?

## 참고
`/design-review` 같은 디자이너 관점 QA 도구를 쓸 수 있는 환경이면 함께 활용한다.
없어도 이 Playbook만으로 점검할 수 있어야 한다 — **외부 도구에 의존하지 않는다.**
