# Playbook: Figma 1-Pager 생성

## 목적
Discovery 결과를 Figma 파일에 1-pager 프레임으로 구성한다.
이 프레임은 와이어프레임 좌측에 배치되어, 디자인 작업의 맥락을 Figma 안에서 바로 참조할 수 있게 한다.

## 사용하는 Agent
- Planner Agent (Discovery 완료 후 실행)

## 전제 조건
- `playbooks/discover-context.md` (Discovery)가 완료되어 `context/product-context.md`가 채워져 있어야 한다.

> **Figma를 사용할 수 없는 경우** (MCP 미인증·미연결, Codex 환경 등)
> **파이프라인을 중단하지 않는다.** 사용자에게 알리고 `specs/product-1-pager.md`에
> 같은 구조의 마크다운 1-pager를 작성한 뒤 다음 단계로 진행한다.
> `specs/figma-info.md`에는 "Figma 미사용"을 기록한다.

## 단일 출처 원칙
**`context/product-context.md`가 원본이다.** 1-pager는 그 표현형일 뿐이다.
내용이 바뀌면 `product-context.md`를 먼저 고치고, 이 Playbook을 재실행해 1-pager를 다시 만든다.
Figma에서 직접 수정하지 않는다 — 두 곳이 어긋나면 이후 모든 단계가 원본을 기준으로 동작한다.

## 절차

### 1. Figma 파일 생성 또는 확인
- 프로젝트에 사용할 Figma 파일이 없으면 `create_new_file`로 새 파일을 만든다.
- 파일 이름: `[서비스 이름] - Prototype`
- 이미 fileKey가 있으면 그 파일을 사용한다.

### 2. 1-Pager 프레임 구성
`use_figma`로 Figma Plugin API를 실행하여 1-pager 프레임을 만든다.

**프레임 사양:**
- 위치: 페이지 좌측 (x: 0, y: 0)
- 크기: 너비 800px, 높이는 콘텐츠에 맞게 (Auto Layout)
- 배경: 흰색 (#FFFFFF)
- 패딩: 48px

**콘텐츠 구조 (위에서 아래로):**
```
┌─────────────────────────────────┐
│  📋 Product 1-Pager             │  ← 타이틀 (24px, Bold)
│                                 │
│  Service Name                   │  ← 서비스 이름 (20px, SemiBold)
│  ─────────────────────────────  │
│                                 │
│  🎯 서비스 배경                  │  ← 섹션 헤더 (16px, SemiBold)
│  [서비스 배경 내용]              │  ← 본문 (14px, Regular)
│                                 │
│  👁 Product Vision              │
│  [비전 내용]                     │
│                                 │
│  👤 Target Users                │
│  [타겟 유저 내용]                │
│                                 │
│  💎 Core Value Proposition      │
│  [핵심 가치 내용]                │
│                                 │
│  📊 Business Goal               │
│  [비즈니스 목표 내용]            │
│                                 │
│  🖥 Platform & Constraints      │
│  [플랫폼 내용]                   │
│                                 │
│  🎨 Tone & Mood                 │
│  [톤 & 무드 내용]                │
│                                 │
│  📌 Key Scenarios               │
│  1. [시나리오 1]                 │
│  2. [시나리오 2]                 │
│  3. ...                         │
│                                 │
└─────────────────────────────────┘
```

**텍스트 스타일:**
`context/design-system.md`의 Typography·Color 토큰을 우선 사용한다.
토큰이 정의되어 있지 않을 때만 아래 기본값을 쓴다.

| 요소 | 기본값 |
|------|--------|
| 타이틀 | 24px, Bold, 전경색 |
| 서비스 이름 | 20px, Semi Bold, 전경색 |
| 섹션 헤더 | 16px, Semi Bold, 전경색 (약하게) |
| 본문 | 14px, Regular, 보조 전경색 |
| 섹션 간 간격 | 24px (4px 스케일) |
| 헤더–본문 간격 | 8px |

> 1-pager는 와이어프레임과 같은 Figma 파일에 놓인다.
> 서로 다른 타이포·색을 쓰면 파일 전체가 일관성을 잃는다.

### 3. fileKey 기록
생성된 Figma 파일의 fileKey를 `specs/figma-info.md`에 기록한다.
이후 Wireframe Agent가 이 fileKey를 참조하여 같은 파일에 와이어프레임을 배치한다.

```markdown
# Figma File Info
- File Key: [fileKey]
- File URL: [URL]
- 1-Pager Frame Node ID: [nodeId]
- Wireframe 시작 X 좌표: 960 (1-pager 우측 여백 160px)
```

## Output
- Figma 파일에 1-pager 프레임 생성
- `specs/figma-info.md` 생성

## 참고
- 와이어프레임은 1-pager 프레임 우측(x: 960 이후)에 배치된다.
- 1-pager 내용이 업데이트되면 이 playbook을 재실행하여 Figma도 업데이트한다.
