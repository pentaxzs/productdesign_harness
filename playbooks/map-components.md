# Skill: 컴포넌트 매핑

## 목적
Screen Spec의 각 요소를 Design System 컴포넌트에 매핑한다.
적합한 컴포넌트가 없을 때만 커스텀 UI를 허용한다.

## 사용하는 Agent
- Wireframe Agent (주 사용)
- Critic Agent (DS 준수 점검 시 참조)

## 절차

### 1. Screen Spec 요소 나열
Screen Spec에서 필요한 UI 요소를 추출한다:
- 헤더/네비게이션
- 콘텐츠 영역 (목록, 상세, 입력 등)
- 액션 (버튼, 링크)
- 피드백 (태그, 상태 표시)

### 2. DS 컴포넌트 탐색
`context/design-system.md`에서 각 요소에 맞는 컴포넌트를 찾는다.

우선 매핑 규칙:
| 화면 요소 | DS 컴포넌트 |
|----------|------------|
| 페이지 헤더 | Header / Header Auth |
| 항목 목록 (시각 위주) | Card Grid Image |
| 항목 목록 (텍스트 위주) | Card Grid Content List |
| 항목 나란히 비교 | Card Grid Pricing |
| 개별 항목 요약 | Card / Product Info Card |
| 숫자·지표 표시 | Stats Card |
| 검색 입력 | Search |
| 필터 그룹 (다중) | Tag Toggle Group + Select Field |
| 단일 필터 토글 | Tag Toggle / Switch Field |
| 범위 필터 | Slider Field |
| 동급 그룹 전환 | Tab / Tabs |
| 소수 옵션 중 택1 | Radio Field |
| 속성 라벨 | Tag |
| 상세 정보 접기 | Accordion / Accordion Item |
| 모달/바텀시트 | Dialog / Dialog Body |
| 대화형·AI 입력 | Input Field + Button (AI Chat Box 참고) |
| 메인 히어로 | Hero Basic / Hero Form |
| CTA 버튼 | Button |
| 위험 액션 | Button Danger |
| 페이지 하단 | Footer |

> 제품 고유의 비주얼 컴포넌트는 `context/design-system.md`에서 찾는다.
> (예: 금융 제품의 카드 비주얼 → `Credit card`)

### 3. 매핑 불가 요소 처리
DS에 적합한 컴포넌트가 없는 경우:
- Card (Slot) 또는 Hero (Slot)을 컨테이너로 사용
- DS 토큰(색상, 간격, radius, 타이포그래피)은 반드시 따른다
- 매핑 불가 요소와 사유를 기록한다

## Output 형식
```markdown
## 컴포넌트 매핑: [Screen 이름]

| 화면 요소 | DS 컴포넌트 | 비고 |
|----------|------------|------|
| [요소] | [컴포넌트명] | |
| [요소] | 커스텀 | [사유] |
```
