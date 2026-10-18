# Design System Reference

Figma Simple Design System (by Figma)을 기반으로 합니다.
- Figma File: https://www.figma.com/design/d4miK4PCFdyIUnwM9s9GsY
- GitHub: https://github.com/figma/sds
- Light/Dark mode 지원, Variables 기반

> **다른 DS를 쓰는 경우**: 이 파일을 자신의 DS 컴포넌트 목록으로 교체하세요.
> 형식만 유지하면 됩니다 — `Component Inventory`(이름 + 용도) + `Design Tokens` + `Usage Rules`.
> Agent는 이 파일만 보고 컴포넌트를 선택하므로, 여기 없는 컴포넌트는 존재하지 않는 것으로 취급합니다.

---

## Component Inventory

### Buttons
| Component | 용도 |
|-----------|------|
| Button | Primary/Secondary 액션 |
| Button Danger | 삭제, 초기화 등 파괴적 액션 |
| Button Group | 관련 버튼 묶음 |
| Icon Button | 아이콘만 있는 버튼. 토글, 닫기 등 |

### Cards
| Component | 용도 |
|-----------|------|
| Card | 범용 카드 컨테이너. 항목 요약 |
| Card (Slot) | 빈 카드 컨테이너. 커스텀 콘텐츠 삽입 |
| Card Grid Image | 이미지 포함 카드 그리드. 시각적 항목 목록 |
| Card Grid Icon | 아이콘 카드 그리드. 카테고리/기능 소개 |
| Card Grid Pricing | 다중 항목 나란히 비교 그리드 |
| Card Grid Content List | 콘텐츠 리스트형 그리드 |
| Credit card | 신용카드 비주얼 컴포넌트 (금융 제품 전용) |
| Product Info Card | 상품/항목 상세 정보 카드 |
| Stats Card | 숫자/통계 표시 카드. 진도율, 점수, 요약 지표 |

### Input Fields
| Component | 용도 |
|-----------|------|
| Input Field | 텍스트 입력 |
| Search | 검색 입력 |
| Select Field | 드롭다운. 다수 옵션 중 하나 선택 |
| Checkbox Field | 다중 선택 |
| Radio Field | 단일 선택 (옵션이 적을 때) |
| Switch Field | 켜기/끄기 토글 |
| Slider Field | 범위·정도 선택 |

### Navigation
| Component | 용도 |
|-----------|------|
| Header | 메인 헤더. 로고 + 네비게이션 |
| Header Auth | 로그인 상태 헤더 |
| Navigation Pill / Navigation Pill List | 필 형태 네비게이션. 카테고리 전환 |
| Tab / Tabs | 탭 전환. 동급 콘텐츠 그룹 간 이동 |

### Tags
| Component | 용도 |
|-----------|------|
| Tag | 라벨/배지. 속성 표시, "인기", "추천", "NEW" |
| Tag Toggle | 토글형 태그. 선택/해제 |
| Tag Toggle Group | 태그 그룹. 다중 필터 |

### Content Sections
| Component | 용도 |
|-----------|------|
| Hero Basic | 메인 히어로. 서비스 소개 + 핵심 진입점 |
| Hero Form | 폼 포함 히어로. 즉시 입력 유도 |
| Hero (Slot) | 빈 히어로. 커스텀 콘텐츠 |
| Accordion / Accordion Item | 접기/펼치기. 상세 정보, FAQ |
| Dialog / Dialog Body | 모달/바텀시트. 상세 설정, 확인 |
| Footer | 페이지 하단 |
| Tabs | 콘텐츠 탭 전환 |

### AI Chat (확인됨, 상세 미수집)
| Component | 용도 |
|-----------|------|
| AI Chat Box | AI 대화형 인터페이스 |

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
2. 항목 목록은 `Card Grid Image`(시각 위주) 또는 `Card Grid Content List`(텍스트 위주)를 우선 사용한다.
3. 여러 항목을 나란히 비교할 때는 `Card Grid Pricing`을 사용한다.
4. 다중 필터는 `Tag Toggle Group`, 단일 선택 필터는 `Select Field`를 사용한다.
5. 검색은 `Search` 컴포넌트를 사용한다.
6. AI·대화형 인터페이스는 `AI Chat Box`를 참고하되, `Hero Form`과 결합할 수 있다.
7. 모달/바텀시트는 `Dialog`를 사용한다.
8. 진도·점수·요약 지표는 `Stats Card`를 사용한다.
9. 목록에 없는 UI가 필요하면 커스텀으로 만들되, 반드시 Design Tokens를 사용한다.
