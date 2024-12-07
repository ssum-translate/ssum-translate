export type Question =
  | "상대방의 나이는?"
  | "나와의 관계는"
  | "상대방의 성향은?";

export interface Filter {
  question: Question;
  items: string[];
}

const FILTERS: Filter[] = [
  {
    question: "상대방의 나이는?",
    items: [
      "10대 후반",
      "20대 초반",
      "20대 중반",
      "20대 후반",
      "30대 초반",
      "30대 중반",
    ],
  },
  {
    question: "나와의 관계는",
    items: ["썸 타는중", "동료", "친한 친구", "오래된 연인", "연애 초기"],
  },
  {
    question: "상대방의 성향은?",
    items: ["논리자판기", "감성자판기"],
  },
] as const;

export default FILTERS;
