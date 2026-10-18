# Playbook: Figma 와이어프레임 생성

## 목적
레이아웃 설계와 컴포넌트 매핑을 바탕으로 Figma에 와이어프레임 프레임을 생성한다.

## 사용하는 Agent
- Wireframe Agent

## 전제 조건
- `specs/figma-info.md`에 Figma fileKey가 기록되어 있어야 한다.
- `playbooks/map-components.md`와 `playbooks/design-layout.md`가 완료되어야 한다.
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

**호출 2~6**: 화면별로 내부 콘텐츠 채우기 (한 호출에 Mobile+Desktop 1쌍)
```
→ 호출 2: 홈 (Mobile + Desktop)
→ 호출 3: 검색 결과
→ 호출 4: AI 추천 결과
→ 호출 5: 카드 비교
→ 호출 6: 카드 상세
```

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

### 5. 검증
- 모든 화면 쌍(Mobile + Desktop)이 생성되었는가?
- 프레임 이름이 규칙에 맞는가?
- Auto Layout이 올바르게 적용되었는가?
- screenshot()으로 시각적 확인

## Output
- Figma 파일 내 화면별 와이어프레임 프레임
- `specs/figma-info.md` 업데이트 (생성된 프레임 nodeId 목록)
