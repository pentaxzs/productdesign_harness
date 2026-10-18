# Design System Reference

Figma Simple Design System (by Figma)을 기반으로 합니다.
- Figma File: https://www.figma.com/design/d4miK4PCFdyIUnwM9s9GsY
- GitHub: https://github.com/figma/sds
- Light/Dark mode 지원, Variables 기반

---

## Component Inventory

### Buttons
| Component | 용도 |
|-----------|------|
| Button | Primary/Secondary 액션. 카드 발급 신청, 비교하기 등 |
| Button Danger | 삭제, 초기화 등 파괴적 액션 |
| Button Group | 관련 버튼 묶음 |
| Icon Button | 아이콘만 있는 버튼. 필터 토글, 닫기 등 |

### Cards
| Component | 용도 |
|-----------|------|
| Card | 범용 카드 컨테이너. 카드 상품 요약에 사용 |
| Card (Slot) | 빈 카드 컨테이너. 커스텀 콘텐츠 삽입 |
| Card Grid Image | 이미지 포함 카드 그리드. 카드 목록 표시 |
| Card Grid Icon | 아이콘 카드 그리드. 혜택 카테고리 표시 |
| Card Grid Pricing | 가격 비교 그리드. 카드 비교 화면 |
| Card Grid Content List | 콘텐츠 리스트형 그리드 |
| Credit card | 신용카드 비주얼 컴포넌트 |
| Product Info Card | 상품 상세 정보 카드 |
| Stats Card | 숫자/통계 표시 카드 |

### Input Fields
| Component | 용도 |
|-----------|------|
| Input Field | 텍스트 입력. AI 추천 질문 입력 |
| Search | 검색 입력. 카드 검색 |
| Select Field | 드롭다운. 카드사 선택, 카드 종류 선택 |
| Checkbox Field | 다중 선택. 혜택 필터 |
| Radio Field | 단일 선택. 카드 유형(신용/체크) |
| Switch Field | 토글. 연회비 무료만 보기 |
| Slider Field | 범위 선택. 연회비 범위 |

### Navigation
| Component | 용도 |
|-----------|------|
| Header | 메인 헤더. 로고 + 네비게이션 |
| Header Auth | 로그인 상태 헤더 |
| Navigation Pill / Navigation Pill List | 필 형태 네비게이션. 카테고리 필터 |
| Tab / Tabs | 탭 전환. 신용카드/체크카드 탭 |

### Tags
| Component | 용도 |
|-----------|------|
| Tag | 라벨/배지. 카드 혜택 태그, "인기", "추천" |
| Tag Toggle | 토글형 태그. 필터 선택/해제 |
| Tag Toggle Group | 태그 그룹. 혜택 필터 그룹 |

### Content Sections
| Component | 용도 |
|-----------|------|
| Hero Basic | 메인 히어로. 서비스 소개 + 검색 진입 |
| Hero Form | 폼 포함 히어로. AI 추천 입력 |
| Hero (Slot) | 빈 히어로. 커스텀 콘텐츠 |
| Accordion / Accordion Item | 접기/펼치기. 카드 상세 혜택, FAQ |
| Dialog / Dialog Body | 모달/바텀시트. 필터 상세, 카드 비교 |
| Footer | 페이지 하단 |
| Tabs | 콘텐츠 탭 전환 |

### AI Chat (확인됨, 상세 미수집)
| Component | 용도 |
|-----------|------|
| AI Chat Box | AI 대화형 추천 인터페이스 |

---

## Design Tokens (Variables)

Simple Design System은 Variables 기반으로 다음을 관리합니다:
- **Color**: Primitive ramp (Gray, Blue 등) → Semantic tokens (background, foreground, border 등)
- **Spacing**: 4px 기반 스케일
- **Border Radius**: 일관된 radius 체계
- **Typography**: 크기별 텍스트 스타일

HTML 프로토타입에서는 SDS GitHub repo의 CSS Variables를 참조하여 구현합니다.

---

## Usage Rules

1. **새 컴포넌트를 만들기 전에 이 목록에서 적합한 컴포넌트를 먼저 찾는다.**
2. 카드 목록은 `Card Grid Image` 또는 `Card Grid Pricing`을 우선 사용한다.
3. 필터는 `Tag Toggle Group` + `Select Field` 조합을 사용한다.
4. 검색은 `Search` 컴포넌트를 사용한다.
5. AI 추천 인터페이스는 `AI Chat Box`를 참고하되, `Hero Form`과 결합할 수 있다.
6. 모달/바텀시트는 `Dialog`를 사용한다.
7. `Credit card` 컴포넌트로 카드 비주얼을 표현한다.
