# Skill: 검증 체크리스트 생성

## 목적
`evaluation/checklist.md`의 **Part A(제품별 체크리스트)**를 채운다.
Critic이 무엇을 기준으로 채점할지를 기획 단계에서 미리 확정한다.

> 이 Playbook이 없으면 Critic은 Part B(공통 기준)만으로 채점하게 되고,
> 제품 고유의 요구사항은 검증되지 않는다.

## 사용하는 Agent
- Planner Agent (Phase 1 마지막 단계)

## 전제
- `context/product-context.md`의 Key Scenarios가 확정되어 있다.
- `specs/screens.md`에 화면 목록과 Spec이 있다.

---

## 절차

### 1. Key Scenarios를 체크 항목으로 변환
`context/product-context.md`의 Key Scenarios를 **그대로** 옮긴다. 임의로 바꾸거나 요약하지 않는다.
요구사항과 검증 기준이 어긋나는 것을 막기 위해서다.

```markdown
## Key Scenarios
- [ ] 사용자가 (시나리오 1을) 처음부터 끝까지 수행할 수 있다.
- [ ] 사용자가 (시나리오 2를) 처음부터 끝까지 수행할 수 있다.
```

### 2. Screen Spec에서 기능 항목 도출
`specs/screens.md`의 각 화면에서 **사용자 액션**과 **Primary CTA**를 체크 항목으로 만든다.
기능 그룹별로 묶는다 (화면별이 아니라 기능별로 묶어야 중복이 줄어든다).

```markdown
### (기능 그룹 이름)
- [ ] (사용자 액션)을 수행할 수 있다.
- [ ] (액션의 결과)가 화면에 반영된다.
```

### 3. 상태 처리 표의 행 채우기
Part B의 "상태 처리 점검" 표에 `specs/screens.md`의 화면 목록으로 행을 만든다.
각 화면의 Screen Spec에 정의된 상태를 기준으로, 해당 없는 칸은 `N/A`로 미리 표기한다.

| 화면 | Default | Empty | Loading | Error |
|------|---------|-------|---------|-------|
| 홈 | | N/A | | |

> `N/A`는 "안 만들어도 된다"는 선언이다. Screen Spec에 근거가 있어야 한다.
> 근거 없이 `N/A`를 쓰면 Critic이 누락을 못 잡는다.

### 4. UX 원칙 표 동기화
`context/ux-principles.md`를 수정했다면 Part B의 UX 원칙 표도 같은 항목으로 맞춘다.
수정하지 않았으면 그대로 둔다.

---

## Output
`evaluation/checklist.md` — Part A가 채워지고, Part B의 상태 처리 표에 화면 행이 생긴 상태

## 검증
- Key Scenarios의 개수와 체크 항목의 개수가 일치하는가?
- `specs/screens.md`의 모든 화면이 상태 처리 표에 있는가?
- 각 화면의 Primary CTA가 체크 항목에 포함되었는가?
- `N/A`로 표기한 칸에 Screen Spec상의 근거가 있는가?
- 플레이스홀더(`(시나리오 1)`, `(기능 그룹 1)`)가 남아 있지 않은가?
