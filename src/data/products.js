import product1 from "../assets/img/product-1.jpg";
import img2 from "../assets/img/img2.jpg";
import img3 from "../assets/img/img-3.jpg";
import img4 from "../assets/img/img-4.jpg";
import clock1 from "../assets/img/clock1.jpg";
import clock2 from "../assets/img/clock2.jpg";
import clock5 from "../assets/img/clock5.jpg";
import clock6 from "../assets/img/clock6.jpg";

// ═══════════════════════════════════════════════════════════════
// YOUR PRODUCTS — edit name, brand, price, type and image here.
//
// HOW TO USE YOUR OWN IMAGES:
//  1. Add your photo to src/assets/img/
//  2. Import it at the top of this file, e.g.:
//       import myClock from "../assets/img/my-clock.jpg";
//  3. Reference it in the `image` field of a product below.
//
// FILTER WORKS AUTOMATICALLY — the `type` field controls which
// products appear when visitors click Wall / Alarm / Luxury filters:
//   type: "wall"    → Wall Clocks filter
//   type: "alarm"   → Alarm Clocks filter
//   type: "luxury"  → Luxury Clocks filter
// ═══════════════════════════════════════════════════════════════
export const sampleProducts = [
  {
    id: 1,
    name: "Modern Wall Clock",
    brand: "ClockCraft",
    price: 45.99,
    originalPrice: 59.99,
    image: product1,
    type: "wall",
    rating: 4.5,
    reviews: 128,
    discount: 23,
    stock: 15,
    description: "Beautiful modern wall clock with minimalist design",
  },
  {
    id: 2,
    name: "Digital Alarm Clock",
    brand: "TimeKeeper",
    price: 24.99,
    originalPrice: 34.99,
    image: img2,
    type: "alarm",
    rating: 4.2,
    reviews: 89,
    discount: 29,
    stock: 20,
    description: "Advanced digital alarm clock with smart features",
  },
  {
    id: 3,
    name: "Luxury Chronograph",
    brand: "EliteTime",
    price: 299.99,
    originalPrice: 399.99,
    image: img3,
    type: "luxury",
    rating: 5,
    reviews: 234,
    discount: 25,
    stock: 5,
    description: "Exquisite luxury chronograph watch",
  },
  {
    id: 4,
    name: "Vintage Wall Clock",
    brand: "RetroStyle",
    price: 55.99,
    originalPrice: 75.99,
    image: img4,
    type: "wall",
    rating: 4.7,
    reviews: 156,
    discount: 26,
    stock: 10,
    description: "Vintage style wall clock with classic charm",
  },
  {
    id: 5,
    name: "Smart Alarm Clock",
    brand: "TechTime",
    price: 79.99,
    originalPrice: 99.99,
    image: clock1,
    type: "alarm",
    rating: 4.6,
    reviews: 203,
    discount: 20,
    stock: 12,
    description: "Smart alarm clock with WiFi connectivity",
  },
  {
    id: 6,
    name: "Premium Desk Clock",
    brand: "OfficeElite",
    price: 89.99,
    originalPrice: 119.99,
    image: clock2,
    type: "wall",
    rating: 4.4,
    reviews: 67,
    discount: 25,
    stock: 8,
    description: "Professional desk clock for office",
  },
  {
    id: 7,
    name: "Luxury Wall Clock",
    brand: "EliteTime",
    price: 199.99,
    originalPrice: 279.99,
    image: clock6,
    type: "luxury",
    rating: 4.8,
    reviews: 189,
    discount: 29,
    stock: 6,
    description: "Exquisite luxury wall clock with gold finish",
  },
  {
    id: 8,
    name: "Minimalist Wall Clock",
    brand: "ModernDesign",
    price: 35.99,
    originalPrice: 49.99,
    image: clock5,
    type: "wall",
    rating: 4.3,
    reviews: 112,
    discount: 28,
    stock: 18,
    description: "Minimalist wall clock with clean lines",
  },

  // ── TO ADD A NEW PRODUCT copy one block above, paste it here ──
  // Give the new product a unique id and set its image.
];

export const ADMIN_CREDENTIALS = {
  email: "admin@clockstore.com",
  password: "admin123",
};
