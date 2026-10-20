export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "Breakfast" | "Coffee" | "Pastries" | "Seasonal";
  available: boolean;
  visible: boolean;
  photo?: string;
};

export type DesignName = "Clean" | "Bold" | "Warm";
export type DomainState = "empty" | "waiting" | "securing" | "connected";
export type AnalyticsRange = "7" | "30" | "90";

export const business = {
  name: "Acme Coffee",
  slug: "acme-coffee",
  type: "MENU",
  category: "Cafe",
  status: "LIVE",
  plan: "PILOT_PREMIUM",
  url: "easyqrservice.com/acme-coffee",
  items: 24,
};

const photos = {
  cappuccino: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=340&q=80",
  latte: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=340&q=80",
  croissant: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=340&q=80",
  espresso: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=340&q=80",
  breakfast: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=340&q=80",
  muffin: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=340&q=80",
};

const row = (id: number, name: string, description: string, price: string, category: MenuItem["category"], available = true, photo?: string): MenuItem =>
  ({id: String(id), name, description, price, category, available, visible: true, photo});

export const initialMenu: MenuItem[] = [
  row(1, "Cappuccino", "Espresso with silky steamed milk", "4.50", "Coffee", true, photos.cappuccino),
  row(2, "Iced Latte", "Double espresso, chilled milk, ice", "5.00", "Coffee", true, photos.latte),
  row(3, "Flat White", "Double ristretto with microfoam", "4.75", "Coffee", true, photos.cappuccino),
  row(4, "Espresso", "Rich and balanced double shot", "3.20", "Coffee", true, photos.espresso),
  row(5, "Americano", "Espresso and hot filtered water", "3.75", "Coffee"),
  row(6, "Matcha Latte", "Ceremonial matcha, steamed milk", "5.50", "Coffee"),
  row(7, "Mocha", "Espresso, dark chocolate, milk", "5.25", "Coffee"),
  row(8, "Cold Brew", "Slow-steeped for 18 hours", "4.95", "Coffee"),
  row(9, "Avocado Toast", "Sourdough, avocado, chilli flakes", "9.50", "Breakfast", true, photos.breakfast),
  row(10, "Breakfast Sandwich", "Egg, cheddar, brioche bun", "8.75", "Breakfast"),
  row(11, "Granola Bowl", "Greek yogurt, berries, house granola", "7.80", "Breakfast"),
  row(12, "Scrambled Eggs", "Soft eggs on sourdough", "8.50", "Breakfast"),
  row(13, "Overnight Oats", "Oats, oat milk, seasonal fruit", "6.95", "Breakfast"),
  row(14, "Croissant", "Flaky French butter pastry", "3.20", "Pastries", false, photos.croissant),
  row(15, "Almond Croissant", "Toasted almonds, almond cream", "4.20", "Pastries", true, photos.croissant),
  row(16, "Blueberry Muffin", "Fresh berries, buttery crumble", "3.80", "Pastries", true, photos.muffin),
  row(17, "Banana Bread", "Toasted with a little salted butter", "4.30", "Pastries"),
  row(18, "Chocolate Cookie", "Dark chocolate, sea salt", "3.50", "Pastries"),
  row(19, "Cinnamon Roll", "Soft roll, vanilla glaze", "4.15", "Pastries"),
  row(20, "Lemon Loaf", "Bright lemon, light icing", "3.90", "Pastries"),
  row(21, "Maple Oat Latte", "Espresso, oat milk, maple", "5.75", "Seasonal"),
  row(22, "Pumpkin Spice Latte", "Autumn spice, espresso, milk", "5.95", "Seasonal"),
  row(23, "Apple Crumble Bowl", "Warm apple, granola, yogurt", "7.95", "Seasonal"),
  row(24, "Honey Lavender Latte", "Floral honey with espresso", "5.70", "Seasonal")
];

export const analytics = {
  "7":  {views: 308, qr: 116, actions: 32, interactions: 22, values: [19,25,21,34,29,36,31]},
  "30": {views: 1284,qr: 492, actions: 137,interactions: 89, values: [24,31,28,38,34,45,39,43,37,47,42,48,46,55,51,62,58,61,54,66,63,71,64,72,67,78,75,83,79,88]},
  "90": {views: 3671,qr: 1435,actions: 403,interactions: 271, values: [26,32,30,33,39,37,42,40,47,44,50,48,55,53,59,61,58,66,64,70,68,72,76,73,82,78,88,83,91,96]}
} as const;

export const topContent = [
  {title: "Cappuccino", interactions: 73},
  {title: "Breakfast Menu", interactions: 51},
  {title: "Iced Latte", interactions: 43}
];

export const navItems = [
  {href: "/dashboard", label: "Overview", icon: "LayoutDashboard"},
  {href: "/dashboard/content", label: "Content", icon: "List"},
  {href: "/dashboard/design", label: "Design", icon: "Palette"},
  {href: "/dashboard/share", label: "QR & Share", icon: "QrCode"},
  {href: "/dashboard/analytics", label: "Analytics", icon: "ChartNoAxesCombined"},
  {href: "/dashboard/domain", label: "Domain", icon: "Globe"}
] as const;
