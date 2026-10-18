# Skill: 목업 데이터 생성

## 목적
실제 API 없이 프로토타입이 동작하도록 현실적인 목업 데이터를 생성한다.

## 사용하는 Agent
- Prototype Agent (주 사용)

## 데이터 구조

### 카드 데이터 (최소 12개)
```javascript
const cards = [
  {
    id: 1,
    name: "카드 이름",
    type: "credit" | "debit",       // 신용 / 체크
    issuer: "카드사 이름",
    annualFee: 15000,               // 연회비 (원)
    image: null,                     // placeholder 사용
    benefits: ["카테고리1", "카테고리2"],
    highlights: [                    // 주요 혜택
      { category: "카페", description: "스타벅스 30% 할인", rate: "30%" },
      { category: "교통", description: "대중교통 10% 적립", rate: "10%" },
    ],
    rating: 4.5,                    // 평점
    reviewCount: 1234,              // 리뷰 수
    tags: ["인기", "캐시백"],        // 태그
    detailUrl: "#",                 // 발급 페이지 (목업)
  },
  // ... 11개 더
];
```

### 혜택 카테고리
```javascript
const benefitCategories = [
  "카페/베이커리", "쇼핑/온라인", "교통", "통신",
  "외식/배달", "영화/문화", "여행/항공", "주유",
  "편의점/마트", "의료/약국", "캐시백", "마일리지"
];
```

### 카드사 목록
```javascript
const issuers = [
  "신한카드", "삼성카드", "현대카드", "KB국민카드",
  "하나카드", "우리카드", "롯데카드", "NH농협카드"
];
```

### AI 추천 시나리오
```javascript
const aiResponses = {
  "카페를 자주 가요": {
    summary: "카페 혜택이 큰 카드를 추천드려요",
    reason: "월 평균 카페 지출이 높은 패턴에 맞는 카드입니다.",
    cardIds: [1, 5, 8],
  },
  "default": {
    summary: "소비 패턴을 분석한 맞춤 추천입니다",
    reason: "입력하신 내용을 바탕으로 혜택이 가장 큰 카드를 선별했습니다.",
    cardIds: [2, 4, 7],
  }
};
```

## 데이터 다양성 규칙
- 신용카드 8개, 체크카드 4개 이상
- 연회비 범위: 0원 ~ 100,000원
- 카드사: 최소 5개사 포함
- 혜택: 카드당 2~4개 카테고리
- 태그: "인기", "추천", "신규", "캐시백", "마일리지", "무실적" 중 0~2개

## Output
`prototype/js/data.js`에 작성

## 검증
- 12개 이상의 카드 데이터가 있는가?
- 필터링 시 결과가 0건이 되는 조합이 존재하는가? (Empty State 테스트용)
- 카드 데이터의 필드가 모두 채워져 있는가?
