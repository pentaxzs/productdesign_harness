# Skill: 반응형 구현

## 목적
Mobile First로 작성된 HTML을 Tablet/PC까지 확장한다.

## 사용하는 Agent
- Wireframe Agent (주 사용)

## Breakpoints
```css
/* Mobile First (기본) */
/* 375px 기준 */

/* Tablet */
@media (min-width: 768px) { }

/* PC */
@media (min-width: 1024px) { }

/* Wide */
@media (min-width: 1440px) { }
```

## 반응형 패턴

### 카드 그리드
- Mobile: 1컬럼, 카드 풀 너비
- Tablet: 2컬럼
- PC: 3~4컬럼

```css
.sds-card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

@media (min-width: 768px) {
  .sds-card-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  .sds-card-grid { grid-template-columns: repeat(3, 1fr); }
}
```

### 필터
- Mobile: 상단 수평 스크롤 Tag Toggle + "필터" 버튼 → Dialog(Bottom Sheet)
- PC: 사이드바 패널에 모든 필터 표시

### 비교 화면
- Mobile: 스와이프 가능한 카드 또는 세로 스택
- PC: 가로 테이블형 비교

### 네비게이션
- Mobile: 햄버거 메뉴 또는 간소화된 헤더
- PC: 풀 네비게이션 링크 표시

### 히어로
- Mobile: 세로 배치 (텍스트 → 이미지/폼)
- PC: 가로 배치 (텍스트 | 이미지/폼)

## 터치 타겟
- 모든 인터랙티브 요소 최소 높이: 44px
- 버튼 최소 크기: 44px × 44px
- 링크 간 최소 간격: 8px

## 검증
- Chrome DevTools에서 375px (iPhone SE)으로 확인
- Chrome DevTools에서 768px (iPad)으로 확인
- 1440px (Desktop)에서 확인
- 터치 타겟이 44px 이상인가?
- 가로 스크롤이 발생하지 않는가?
