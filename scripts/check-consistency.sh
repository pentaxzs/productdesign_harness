#!/usr/bin/env bash
# 하네스 문서 일관성 검사.
# 같은 내용이 여러 파일에 흩어지면 한쪽만 고쳐져 어긋난다. 그걸 잡는다.
#
#   ./scripts/check-consistency.sh
#
# 하네스를 수정한 뒤, 커밋 전에 돌린다.
set -uo pipefail
cd "$(dirname "$0")/.."
fail=0

echo "1. playbook 참조가 실제 파일과 일치하는가"
python3 - <<'PY' || fail=1
import re, pathlib, sys
root = pathlib.Path('.')
existing = {str(f).removeprefix('./') for f in root.rglob('*.md') if 'examples' not in str(f)}
# 파이프라인이 실행 중에 만드는 파일 — 템플릿에는 없는 것이 정상이다
generated = {'specs/user-flow.md','specs/screens.md','specs/figma-info.md','specs/layouts.md',
             'specs/product-1-pager.md','evaluation/critique-report.md',
             'context/design-tokens.md'}
bad = []
targets = (list(root.glob('.claude/commands/*.md')) + list(root.glob('agents/*.md'))
           + list(root.glob('playbooks/*.md')) + [pathlib.Path(f) for f in ('CLAUDE.md','AGENTS.md','README.md')])
for f in targets:
    for ref in re.findall(r'`((?:playbooks|agents|context|evaluation|specs)/[a-z0-9-]+\.md)`', f.read_text(encoding='utf-8')):
        if ref not in existing and ref not in generated:
            bad.append(f"   {f} → {ref}")
print("\n".join(sorted(set(bad))) if bad else "   ✅ 통과")
sys.exit(1 if bad else 0)
PY

echo "2. CLAUDE.md Agent 표가 agents/*.md 와 일치하는가"
python3 - <<'PY' || fail=1
import re, pathlib, sys
claude = pathlib.Path('CLAUDE.md').read_text(encoding='utf-8')
bad = []
for agent in ['planner','wireframe','prototype','critic']:
    row = next((l for l in claude.splitlines() if f'agents/{agent}.md' in l and l.startswith('|')), None)
    listed = {x for x in re.findall(r'[a-z][a-z-]{3,}', row.split('|')[-2])if '-' in x} if row else set()
    actual = set(re.findall(r'playbooks/([a-z-]+)\.md',
                            pathlib.Path(f'agents/{agent}.md').read_text(encoding='utf-8')))
    if actual - listed: bad.append(f"   {agent}: 표에 없음 {sorted(actual - listed)}")
    if listed - actual: bad.append(f"   {agent}: 표에만 있음 {sorted(listed - actual)}")
print("\n".join(bad) if bad else "   ✅ 통과")
sys.exit(1 if bad else 0)
PY

echo "3. playbook 개수 표기가 실제와 맞는가"
n=$(ls playbooks/*.md | wc -l | tr -d ' ')
if grep -q "총 ${n}개" README.md && grep -q "기본 ${n}개" README.md; then
  echo "   ✅ 통과 (${n}개)"
else
  echo "   ⚠️  실제 ${n}개 / README 표기 불일치"; grep -n '총 [0-9]*개\|기본 [0-9]*개' README.md | sed 's/^/      /'; fail=1
fi

echo "4. AGENTS.md 가 절차를 복제하고 있지 않은가"
if grep -qE '^### Phase [0-9]' AGENTS.md; then
  echo "   ⚠️  AGENTS.md 에 Phase 절차가 복제됨. 포인터만 두고 wire.md 를 참조할 것"; fail=1
else
  echo "   ✅ 통과"
fi

echo
[ $fail -eq 0 ] && echo "모두 통과" || echo "실패 항목이 있다. 위 내용을 확인할 것."
exit $fail
