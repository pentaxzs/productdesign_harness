# 예시: CardFit — 카드 추천 서비스

하네스를 한 바퀴 돌려서 나온 **완성된 산출물 한 세트**입니다.
각 단계의 결과물이 어떤 형식·수준이어야 하는지 참고용으로 보세요.

> ⚠️ 가상의 서비스이며 실제 카드 정보가 아닙니다.
> 하네스 본체(`agents/`, `playbooks/`, `context/`)는 제품 중립적이며, 이 디렉토리의 내용을 참조하지 않습니다.

## 단계별 산출물

| 파일 | 생성 단계 | 생성한 Agent |
|------|----------|-------------|
| `context/product-context.md` | Discovery | Planner |
| `specs/user-flow.md` | Phase 1 (Plan) | Planner |
| `specs/screens.md` | Phase 1 (Plan) | Planner |
| `specs/figma-info.md` | Phase 1~2 | Planner / Wireframe |
| `prototype/index.html` | Phase 3 (Prototype) | Prototype |
| `prototype/styles.css` | Phase 3 (Prototype) | Prototype |
| `prototype/app.js` | Phase 3 (Prototype) | Prototype |
| `evaluation/critique-report.md` | Phase 4 (Critique) | Critic |

## 프로토타입 실행

```bash
cd examples/cardfit/prototype
python3 -m http.server 8000
# → http://localhost:8000
```

## Critique 결과

이 예시의 판정은 **Revise**입니다. Critic이 Critical 1건, Major·Minor 다수를 찾아낸 상태로,
Refine을 돌리기 직전의 스냅샷입니다. "완벽한 결과"가 아니라 **Critic이 실제로 무엇을 잡아내는지**를 보여주는 자료입니다.

자세한 내용은 `evaluation/critique-report.md`를 참고하세요.
