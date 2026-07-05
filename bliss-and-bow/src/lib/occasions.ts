export const OCCASIONS = ["Birthday", "Wedding", "Holiday", "Corporate", "Other"] as const;
export type Occasion = (typeof OCCASIONS)[number];
