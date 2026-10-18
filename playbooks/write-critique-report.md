# Skill: Critique Report 작성

## 목적
요구사항, UX 원칙, Design System 점검 결과를 하나의 구조화된 리포트로 통합한다.

## 사용하는 Agent
- Critic Agent (주 사용)

## Input
- `check-requirements` 결과
- `check-ux-principles` 결과
- `check-design-system` 결과

## 리포트 구조

```markdown
# Critique Report

**검증 일시**: [날짜]
**대상**: prototype/ 디렉토리
**판정**: Pass / Revise

---

## Summary
| 항목 | 결과 |
|------|------|
| 요구사항 충족 | M/N |
| Flow 완주 | 가능/불가능 |
| UX 원칙 위반 | X건 |
| DS 위반 | Y건 |
| 상태 누락 | Z건 |

---

## Critical Issues (반드시 수정 — Pass 불가)
1. **[C-01]** [화면명] — [문제 설명]
   - 위반 기준: [어떤 원칙/규칙]
   - 수정 방향: [구체적 지시]

---

## Major Issues (수정 권장 — 3건 이상이면 Revise)
1. **[M-01]** [화면명] — [문제 설명]
   - 위반 기준: [어떤 원칙/규칙]
   - 수정 방향: [구체적 지시]

---

## Minor Issues (개선 가능)
1. **[m-01]** [화면명] — [문제 설명]
   - 수정 방향: [제안]

---

## 상태 처리 현황
| 화면 | Default | Empty | Loading | Error |
|------|---------|-------|---------|-------|
| 홈 | O | N/A | O | X |
| 검색 | O | O | O | X |
| ... | | | | |

---

## 수정 지시 요약
Revise 판정 시, Wireframe/Prototype Agent에게 전달할 수정 목록:

### Wireframe Agent 수정 사항
1. [C-01] [구체적 수정 내용]

### Prototype Agent 수정 사항
1. [M-01] [구체적 수정 내용]
```

## 판정 기준
- **Pass**: Critical 0건 AND Major 2건 이하
- **Revise**: Critical 1건 이상 OR Major 3건 이상

## 심각도 분류 기준
| 심각도 | 기준 |
|--------|------|
| Critical | 핵심 Flow를 수행할 수 없음, 필수 요구사항 누락 |
| Major | Flow는 가능하나 UX 원칙 위반 또는 DS 미준수 |
| Minor | 사용성에 큰 영향 없으나 개선 여지 있음 |

## Output
`evaluation/critique-report.md`에 작성
