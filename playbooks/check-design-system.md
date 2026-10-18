# Skill: Design System 준수 점검

## 목적
Prototype이 Design System 컴포넌트와 토큰을 올바르게 사용했는지 점검한다.

## 사용하는 Agent
- Critic Agent (주 사용)

## 점검 항목

### 1. 컴포넌트 사용 여부
`context/design-system.md`의 Usage Rules를 기준으로:
- DS에 있는 컴포넌트 대신 커스텀 UI를 만든 곳이 있는가?
- 커스텀 UI가 불가피한 경우, 사유가 타당한가?

점검 대상:
| 화면 요소 | 기대 컴포넌트 | 실제 사용 |
|----------|-------------|----------|
| 헤더 | Header | ? |
| 카드 목록 | Card Grid | ? |
| 검색 | Search | ? |
| 필터 | Tag Toggle Group | ? |
| CTA | Button | ? |
| 모달 | Dialog | ? |
| 카드 비주얼 | Credit card | ? |
| 하단 | Footer | ? |

### 2. 토큰 준수
CSS를 읽고 확인한다:
- 색상: CSS Variables(--color-*)를 사용했는가, 하드코딩된 값이 있는가?
- 간격: 4px 스케일(--space-*)을 따르는가?
- Border Radius: --radius-* 토큰을 사용했는가?
- Typography: --text-*, --font-family를 사용했는가?

### 3. 컴포넌트 오용
DS 컴포넌트를 의도와 다르게 사용한 경우:
- Button Danger를 일반 CTA로 사용하지 않았는가?
- Dialog를 페이지 전환 용도로 사용하지 않았는가?
- Tag를 버튼 용도로 사용하지 않았는가?

## Output 형식
```markdown
## Design System 점검

### 컴포넌트 사용: M/N 항목 준수
| 요소 | 기대 | 실제 | 판정 |
|------|------|------|------|
| 헤더 | Header | Header | Pass |
| 필터 | Tag Toggle | 커스텀 div | Fail |

### 토큰 위반
1. [파일:라인] — [위반 내용] (예: color: #333 대신 var(--color-text) 사용 필요)

### 컴포넌트 오용
1. [화면] — [컴포넌트] — [오용 내용]
```
