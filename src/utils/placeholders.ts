const BASE = "https://images.unsplash.com/photo-";

const CATALOG: Record<string, string[]> = {
  hero: [
    "1518773553398-650c184e0bb3", // abstract dark
    "1520607162513-77705c0f0d4a", // gradient light
    "1500530855697-b586d89ba3ee", // city night
  ],
  founder: [
    "1544006659-f0b21884ce1d", // portrait-like
    "1517245386807-bb43f82c33c4",
  ],
  office: [
    "1524758631624-e2822e304c36",
    "1524758630476-8fcd79e8b0ff",
  ],
  lifestyle: [
    "1500534314209-a25ddb2bd429",
    "1496307042754-b4aa456c4a2d",
  ],
};

export function placeholder(category: keyof typeof CATALOG = "hero", index = 0, params = "auto=format&fit=crop&w=1600&q=80") {
  const list = CATALOG[category] ?? CATALOG.hero;
  const id = list[index % list.length];
  return `${BASE}${id}?${params}`;
}

export default placeholder;



