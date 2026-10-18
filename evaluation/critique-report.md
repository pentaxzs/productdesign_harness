# Critique Report

**검증 일시**: 2026-09-19
**대상**: prototype/ 디렉토리
**판정**: Revise

---

## Summary
| 항목 | 결과 |
|------|------|
| 요구사항 충족 | 4/4 시나리오 |
| Flow 완주 | 가능 |
| UX 원칙 위반 | 3건 |
| DS 위반 | 2건 |
| 상태 누락 | 2건 |

---

## Critical Issues (반드시 수정)

1. **[C-01]** 카드 상세 — Mobile에서 CTA 바가 2개 렌더링됨
   - 위반 기준: 화면당 Primary CTA 하나 원칙
   - 설명: `detail__cta-bar`가 Desktop용(`#detail-cta-desktop`)과 Mobile용(`#detail-cta-mobile`) 2개 동시에 렌더링됨. Desktop에서는 Mobile CTA가 하단 고정으로 보이고, Mobile에서는 Desktop CTA도 보임.
   - 수정 방향: CSS media query로 Mobile에서는 `#detail-cta-desktop` 숨기고, Desktop에서는 `#detail-cta-mobile` 숨기기.

---

## Major Issues (수정 권장)

1. **[M-01]** 홈 — 검색 필터에서 카드사 선택(Select Field)과 연회비 범위(Slider) 누락
   - 위반 기준: Screen Spec에 명시된 사용자 액션
   - 설명: specs/screens.md에는 "카드사 셀렉트 박스", "연회비 범위 슬라이더"가 있지만 프로토타입에 구현되지 않음.
   - 수정 방향: 홈 필터 영역에 카드사 Select와 연회비 범위 입력 추가. filterCards()에도 반영.

2. **[M-02]** 전체 — Footer 누락
   - 위반 기준: Design System 컴포넌트(Footer)
   - 설명: 모든 화면에 Footer가 없음. DS에 Footer 컴포넌트가 있고 Screen Spec에도 명시됨.
   - 수정 방향: 공통 Footer 추가 (서비스명, 저작권, 이용약관 링크 등).

3. **[M-03]** AI 추천 — 입력 없이 직접 #/ai로 접근 시 홈으로 리다이렉트
   - 위반 기준: 모든 상태를 고려 (UX 원칙 6)
   - 설명: 헤더에서 "AI 추천" 클릭 시 aiInput이 비어있으면 홈으로 보내버림. AI 입력 화면을 보여줘야 함.
   - 수정 방향: aiInput이 비어있으면 AI 입력 폼을 보여주는 상태 추가.

---

## Minor Issues (개선 가능)

1. **[m-01]** 검색 결과 — 검색 필터 태그가 없을 때에도 빈 filter-tags div가 보임
   - 수정 방향: 필터가 없으면 해당 영역 숨기기.

2. **[m-02]** 비교 화면 — 1개만 선택 시 "비교할 카드를 선택해주세요" 표시되나, "1개 더 추가해주세요"가 더 적절
   - 수정 방향: compareCards.length === 1일 때 별도 메시지.

3. **[m-03]** 카드 상세 — 유의사항의 \n이 그대로 텍스트로 보임 (JS 템플릿 리터럴 이슈)
   - 수정 방향: \n을 `<br>`로 변환하거나 white-space: pre-line 확인.

4. **[m-04]** 홈 — 인기 카드 섹션이 Desktop에서도 리스트(단일 컬럼)로 표시됨
   - 수정 방향: Desktop에서는 card-grid 3열 레이아웃 사용.

---

## 상태 처리 현황
| 화면 | Default | Empty | Loading | Error |
|------|---------|-------|---------|-------|
| 홈 | O | N/A | N/A | N/A |
| 검색 결과 | O | O | O (HTML 존재) | O (HTML 존재) |
| AI 추천 | O | N/A | O | O (HTML 존재) |
| 카드 비교 | O | O | N/A | N/A |
| 카드 상세 | O | N/A | X (누락) | X (누락) |

---

## 수정 지시 요약

### Prototype Agent 수정 사항
1. **[C-01]** CSS에 Desktop/Mobile 분기 추가하여 CTA 바 중복 해결
2. **[M-01]** 홈에 카드사 Select + 연회비 범위 입력 추가, filterCards에 반영
3. **[M-02]** 공통 Footer HTML + CSS 추가
4. **[M-03]** AI 페이지에 입력 폼 상태 추가 (aiInput 비어있을 때)
5. **[m-03]** 유의사항 \n → `<br>` 변환
6. **[m-04]** 홈 인기 카드를 Desktop에서 grid 레이아웃으로
