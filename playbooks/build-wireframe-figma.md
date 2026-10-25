# Playbook: Figma 와이어프레임 생성

## 목적
레이아웃 설계와 컴포넌트 매핑을 바탕으로 Figma에 와이어프레임 프레임을 생성한다.

## 사용하는 Agent
- Wireframe Agent

## 전제 조건
- `specs/figma-info.md`에 Figma fileKey가 기록되어 있어야 한다.
- `playbooks/map-components.md`와 `playbooks/design-layout.md`가 완료되어야 한다.
- `specs/layouts.md`에 화면별 레이아웃 구조도가 작성되어 있어야 한다.
- Figma MCP `figma-use` 스킬을 로드한 상태여야 한다.

## Figma 파일 구조

```
Figma File: [서비스명] - Prototype
├── Page: "1-Pager & Wireframes"
│   ├── 1-Pager 프레임 (x: 0)
│   │
│   ├── [Mobile] 홈 (x: 960, y: 0)           ← 375 × auto
│   ├── [Desktop] 홈 (x: 1395, y: 0)         ← 1440 × auto
│   │
│   ├── [Mobile] 검색 결과 (x: 960, y: +gap)
│   ├── [Desktop] 검색 결과 (x: 1395, y: +gap)
│   │
│   ├── ... (이하 화면별 Mobile/Desktop 쌍)
```

### 배치 규칙
- 1-Pager 우측 160px 간격부터 와이어프레임 시작 (x: 960)
- Mobile 프레임: 너비 375px
- Desktop 프레임: Mobile 우측 60px 간격 (x: 960 + 375 + 60 = 1395)
- 화면 쌍 간 세로 간격: 200px
- 프레임 이름: `[Mobile] 화면이름` / `[Desktop] 화면이름`

## 절차

### 1. 와이어프레임 스타일 정의
와이어프레임은 최종 디자인이 아니라 구조를 보여주는 것이 목적이다.

**색상 팔레트 (와이어프레임용):**
- 배경: #FFFFFF
- 표면(카드, 섹션): #F5F5F5
- 보더: #E0E0E0
- 텍스트 primary: #333333
- 텍스트 secondary: #888888
- CTA/강조: #2563EB (Blue)
- placeholder 이미지: #D9D9D9

**타이포그래피:**
- 폰트: Inter
- 헤딩 (H1): 24px Bold
- 헤딩 (H2): 20px Semi Bold
- 서브헤딩: 16px Semi Bold
- 본문: 14px Regular
- 캡션: 12px Regular

### 2. 화면별 Figma 프레임 생성

각 화면에 대해:

1. **Mobile 프레임 생성**
   - `figma.createAutoLayout('VERTICAL')` 사용
   - 너비 375px, 높이는 콘텐츠에 맞게 (primaryAxisSizingMode: 'AUTO')
   - 섹션 구조: Header → Content Sections → Footer/CTA

2. **Desktop 프레임 생성**
   - Mobile과 같은 정보/구조, 레이아웃만 확장
   - 너비 1440px
   - 멀티 컬럼 레이아웃 적용 (카드 그리드 3열, 사이드바+콘텐츠 등)

3. **프레임 네이밍 + 배치**
   - `[Mobile] 홈`, `[Desktop] 홈` 형식
   - 배치 규칙에 따른 x, y 좌표 설정

### 3. `use_figma` 호출 전략

MCP 호출 횟수를 최소화하기 위해:

**호출 1**: 모든 화면의 빈 프레임 껍데기를 한 번에 생성 (placeholder 설정)
```
→ 10개 프레임 (5화면 × Mobile/Desktop) 생성
→ 각 프레임에 placeholder = true
→ 모든 프레임 ID 반환
```

**호출 2~N**: 화면별로 내부 콘텐츠 채우기 (한 호출에 Mobile+Desktop 1쌍)
`specs/screens.md`의 화면 수만큼 호출한다.

> 예시 (카드 추천 서비스, 화면 5개):
> ```
> → 호출 2: 홈 (Mobile + Desktop)
> → 호출 3: 검색 결과
> → 호출 4: AI 추천 결과
> → 호출 5: 카드 비교
> → 호출 6: 카드 상세
> ```

**호출 7**: 스크린샷으로 검증
```
→ 주요 프레임 screenshot() 확인
```

**총 예상 호출: 7~10회**

### 4. 와이어프레임 요소 표현 규칙

| UI 요소 | Figma 표현 |
|---------|-----------|
| 헤더 | 높이 56px 가로 바, 로고 텍스트 + 메뉴 아이콘 |
| 버튼 (Primary) | 파란 배경(#2563EB) + 흰 텍스트, 높이 48px, radius 8px |
| 버튼 (Secondary) | 흰 배경 + 보더 + 텍스트 |
| 카드 | 흰 배경 + 보더 + radius 12px, Auto Layout vertical |
| 카드 이미지 | 회색(#D9D9D9) 직사각형, 카드 비율 |
| 텍스트 입력 | 흰 배경 + 보더, 높이 48px, placeholder 텍스트 |
| 태그 | 회색 배경 pill shape, radius full, 패딩 8/16 |
| 탭 | 수평 Auto Layout, 선택된 탭에 밑줄/파란색 |
| Accordion | 보더 하단선 + 화살표 아이콘(텍스트 ▼) |
| 스켈레톤/로딩 | 회색 라운드 사각형 반복 |
| 하단 고정 CTA | 별도 프레임, 그림자 효과 |

---

## Auto Layout 함정 3종 (반드시 읽을 것)

`use_figma`는 **에러 없이 성공해도 화면이 깨질 수 있다.** 아래 셋은 실제로 전부 겪은 것이고,
구조 검증(프레임 수·폭·터치 타겟)은 셋 다 통과시켰다.

### 1. `resize()`가 양축을 FIXED로 되돌린다

가장 자주 터진다 (한 번에 7건). 폭을 지정하려고 `resize(W, 10)`을 쓰면
**세로까지 FIXED 10px이 되어** 콘텐츠가 통째로 잘린다.

```javascript
// ❌ 세로가 10px에 고정된다
frame.resize(720, 10);
frame.layoutSizingHorizontal = "FIXED";

// ✅ 세로를 명시적으로 되돌린다
frame.resize(720, 10);
frame.layoutSizingHorizontal = "FIXED";
frame.layoutSizingVertical = "HUG";
```

**폭만 고정하고 싶으면 `resize()` 대신 부모에 넣고 `FILL`을 쓴다.** 사이드바처럼
고정 폭이 꼭 필요할 때만 `resize()`를 쓰고, 그때는 반드시 세로를 함께 복구한다.

### 2. HUG 폭 부모 안의 FILL 자식은 수축한다

부모 폭이 정해지지 않았는데 자식이 `FILL`이면, 자식은 **최소 폭으로 붕괴한다.**
증상은 "카드 안 글자가 한두 개씩 줄바꿈되는" 모습이다 (실제로 82px까지 줄었다).

```javascript
// ❌ plans가 HUG인데 자식 카드가 FILL → 카드가 82px로 붕괴
parent.appendChild(plans);              // HUG가 기본
plans.appendChild(card);
card.layoutSizingHorizontal = "FILL";

// ✅ 부모 폭을 먼저 확정한다
parent.appendChild(plans);
plans.layoutSizingHorizontal = "FILL";  // 부모 폭을 물려받음
plans.appendChild(card);
card.layoutSizingHorizontal = "FILL";
```

**단, 세로 Auto Layout에서 밑줄·구분선 같은 장식이 `FILL`인 것은 정상이다.**
그 경우 폭은 형제 텍스트가 결정하고 장식만 늘어난다. 일괄 치환하지 말 것.

### 3. 가로 Auto Layout은 넘쳐도 알려주지 않는다

자식 폭 합계가 부모를 넘으면 **조용히 잘린다.** Mobile 375px에서 특히 잘 터진다.
(일본어 문장 토큰 합계 380px > 콘텐츠 폭 343px → 문장 끝 `。`가 잘림)

```javascript
// ✅ 줄바꿈을 허용한다
sentence.layoutSizingHorizontal = "FILL";
sentence.layoutWrap = "WRAP";
sentence.counterAxisSpacing = 4;
```

---

### 5. 검증

**구조 검증과 시각 검증을 모두 한다. 구조만으로는 위 함정 3종을 전부 놓친다.**

#### 5-1. 구조 검증 (스크립트)

와이어프레임 생성 직후 아래를 실행한다. 사람이 눈으로 세지 않는다.

```javascript
const roots = figma.currentPage.children.filter(n =>
  n.name.startsWith("[Mobile]") || n.name.startsWith("[Desktop]"));
const issues = { collapsed: [], overflow: [], badWidth: [], smallTarget: [] };

for (const root of roots) {
  // 폭 규칙
  const want = root.name.startsWith("[Mobile]") ? 375 : 1440;
  if (Math.round(root.width) !== want) issues.badWidth.push(root.name + "=" + Math.round(root.width));

  for (const n of root.findAll(x => x.type === "FRAME")) {
    if (!n.layoutMode || n.layoutMode === "NONE") continue;

    // 함정 1 — 세로가 눌린 컨테이너
    if (n.children.length > 0 && n.layoutSizingVertical === "FIXED" && n.height <= 20)
      issues.collapsed.push(root.name + " / " + n.name + " h=" + Math.round(n.height));

    // 함정 3 — 가로 넘침
    if (n.layoutMode === "HORIZONTAL" && n.layoutWrap !== "WRAP") {
      const inner = n.width - n.paddingLeft - n.paddingRight;
      const sum = n.children.reduce((a, c) => a + c.width, 0)
                + Math.max(0, n.children.length - 1) * n.itemSpacing;
      if (sum > inner + 1)
        issues.overflow.push(root.name + " / " + n.name + " need=" + Math.round(sum) + " have=" + Math.round(inner));
    }

    // 터치 타겟 (Mobile만)
    if (root.name.startsWith("[Mobile]") && /Button|opt|Row|tag/.test(n.name) && n.height < 44)
      issues.smallTarget.push(root.name + " / " + n.name + " h=" + Math.round(n.height));
  }
}
return { frameCount: roots.length, issues };
```

함정 2(FILL 자식 수축)는 폭 수치만으로 판정하기 어렵다. **스크린샷으로 잡는다.**

#### 5-2. 시각 검증 (필수)

**최소한 아래 3개는 반드시 스크린샷으로 본다.**

| 대상 | 이유 |
|------|------|
| 가장 복잡한 Desktop 화면 | 함정 1이 데스크톱에서 주로 터진다 |
| 가장 복잡한 Mobile 화면 | 함정 2·3이 좁은 폭에서 주로 터진다 |
| 핵심 화면 (`specs/screens.md`에서 ★ 표시한 것) | 제품의 중심이므로 |

스크린샷에서 확인할 것:
- 콘텐츠가 **잘리거나 비어 있지 않은가** (함정 1의 증상)
- 글자가 **한두 개씩 줄바꿈되지 않는가** (함정 2의 증상)
- 문장·버튼이 **프레임 밖으로 넘치지 않는가** (함정 3의 증상)
- Mobile과 Desktop이 **같은 정보**를 담고 있는가

#### 5-3. 체크리스트
- 모든 화면 쌍(Mobile + Desktop)이 생성되었는가?
- 프레임 이름이 규칙에 맞는가? (`[Mobile] 이름` / `[Desktop] 이름`)
- 구조 검증 스크립트가 `issues` 전부 빈 배열을 반환하는가?
- 스크린샷 3개를 실제로 **보았는가?**
- 발견한 결함을 고치고 **다시 스크린샷을 찍었는가?**

## Output
- Figma 파일 내 화면별 와이어프레임 프레임
- `specs/figma-info.md` 업데이트 (생성된 프레임 nodeId 목록)
