export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  visible: boolean;
  image?: string;
};
export const business = {
  name: "Acme Coffee",
  type: "MENU",
  category: "Cafe",
  url: "easyqrservice.com/acme-coffee",
  plan: "PILOT_PREMIUM",
} as const;
export const categories = [
  "Breakfast",
  "Coffee",
  "Iced drinks",
  "Freshly baked",
];
const seeds: [string, string, number, string, string?][] = [
  [
    "Cappuccino",
    "Espresso with silky steamed milk",
    4.5,
    "Breakfast",
    "coffee",
  ],
  [
    "Iced Latte",
    "Double espresso, milk, served over ice",
    5,
    "Breakfast",
    "iced",
  ],
  [
    "Butter Croissant",
    "Flaky, golden pastry, baked every morning",
    3.2,
    "Breakfast",
    "croissant",
  ],
  ["Espresso", "Our house blend, rich and balanced", 3, "Coffee", "coffee"],
  ["Flat White", "Double ristretto and velvety milk", 4.5, "Coffee", "coffee"],
  ["Americano", "Espresso with hot water", 3.5, "Coffee"],
  ["Caffè Latte", "Smooth espresso with steamed milk", 4.8, "Coffee", "coffee"],
  ["Mocha", "Espresso, dark chocolate and milk", 5.2, "Coffee"],
  ["Filter Coffee", "A rotating single-origin selection", 4, "Coffee"],
  ["Cortado", "Equal parts espresso and warm milk", 3.8, "Coffee"],
  ["Decaf Cappuccino", "All the comfort, without the caffeine", 4.5, "Coffee"],
  ["Cold Brew", "Slow steeped for a smooth finish", 5, "Iced drinks", "iced"],
  ["Iced Americano", "Double espresso over ice", 4, "Iced drinks"],
  [
    "Iced Mocha",
    "Chocolate, espresso and chilled milk",
    5.5,
    "Iced drinks",
    "iced",
  ],
  ["Matcha Latte", "Ceremonial matcha and oat milk", 5.5, "Iced drinks"],
  ["Fresh Orange Juice", "Freshly squeezed to order", 4.8, "Iced drinks"],
  [
    "House Lemonade",
    "Lemon, a little sugar and sparkling water",
    4,
    "Iced drinks",
  ],
  [
    "Almond Croissant",
    "Almond cream and toasted almonds",
    4,
    "Freshly baked",
    "croissant",
  ],
  ["Cinnamon Roll", "Soft dough and a cinnamon swirl", 3.8, "Freshly baked"],
  ["Banana Bread", "A thick slice, lightly toasted", 3.5, "Freshly baked"],
  [
    "Chocolate Cookie",
    "Dark chocolate, a little sea salt",
    2.8,
    "Freshly baked",
  ],
  [
    "Avocado Toast",
    "Sourdough, avocado and lemon",
    7.5,
    "Freshly baked",
    "toast",
  ],
  [
    "Blueberry Muffin",
    "Juicy blueberries and a crumble top",
    3.2,
    "Freshly baked",
  ],
  [
    "Pain au Chocolat",
    "Buttery pastry with dark chocolate",
    3.5,
    "Freshly baked",
    "croissant",
  ],
];
export const initialItems: MenuItem[] = seeds.map(
  ([name, description, price, category, image], i) => ({
    id: `item-${i + 1}`,
    name,
    description,
    price,
    category,
    available: i !== 2,
    visible: true,
    image: image ? `/images/${image}.jpg` : undefined,
  }),
);
export const designs = [
  {
    name: "Recommended",
    description: "A little warmth. A lasting first impression.",
    style: "warm",
  },
  {
    name: "Clean",
    description: "Simple, considered and easy to explore.",
    style: "clean",
  },
  {
    name: "Bold",
    description: "Confident type. Unmistakably yours.",
    style: "bold",
  },
] as const;
export const analytics = {
  "7 days": {
    views: 318,
    qr: 126,
    actions: 34,
    interactions: 22,
    period: "Oct 15 – Oct 21, 2026",
    labels: ["Oct 15", "Oct 17", "Oct 19", "Oct 21"],
    points: [19, 27, 21, 37, 31, 43, 48],
  },
  "30 days": {
    views: 1284,
    qr: 492,
    actions: 137,
    interactions: 89,
    period: "Sep 22 – Oct 21, 2026",
    labels: ["Sep 22", "Sep 29", "Oct 6", "Oct 13", "Oct 21"],
    points: [
      23, 31, 24, 35, 28, 30, 24, 40, 36, 45, 35, 47, 38, 43, 56, 42, 47, 38,
      50, 45, 55, 47, 58, 49, 65, 52, 63, 59, 71, 64,
    ],
  },
  "90 days": {
    views: 3426,
    qr: 1302,
    actions: 361,
    interactions: 246,
    period: "Jul 24 – Oct 21, 2026",
    labels: ["Jul 24", "Aug 15", "Sep 6", "Sep 28", "Oct 21"],
    points: [
      17, 24, 20, 35, 30, 37, 31, 42, 39, 35, 49, 42, 52, 45, 61, 54, 65, 58,
      71, 67,
    ],
  },
};
export type AnalyticsRange = keyof typeof analytics;
export type DomainState = "Empty" | "Waiting" | "Securing" | "Connected";
export const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  );
