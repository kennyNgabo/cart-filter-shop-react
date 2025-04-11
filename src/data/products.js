
// Sample product data
export const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    rating: 4.5,
    description: "Premium wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Cotton T-Shirt",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Clothing",
    rating: 4.2,
    description: "Comfortable cotton t-shirt, perfect for everyday wear"
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Electronics",
    rating: 4.8,
    description: "Track your fitness and stay connected with this smartwatch"
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Footwear",
    rating: 4.6,
    description: "Lightweight and comfortable running shoes for all terrains"
  },
  {
    id: 5,
    name: "Backpack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Accessories",
    rating: 4.3,
    description: "Durable backpack with multiple compartments"
  },
  {
    id: 6,
    name: "Smartphone",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1567581935884-3349723552ca",
    category: "Electronics",
    rating: 4.7,
    description: "Latest smartphone with advanced camera and long battery life"
  },
  {
    id: 7,
    name: "Jeans",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
    category: "Clothing",
    rating: 4.1,
    description: "Classic fit jeans, perfect for any occasion"
  },
  {
    id: 8,
    name: "Coffee Maker",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1570447338416-5b608c6188a7",
    category: "Home",
    rating: 4.4,
    description: "Programmable coffee maker for the perfect brew every time"
  }
];

// Helper functions to get unique categories and price range
export const getUniqueCategories = () => {
  return [...new Set(products.map(product => product.category))];
};

export const getPriceRange = () => {
  const prices = products.map(product => product.price);
  return [Math.min(...prices), Math.max(...prices)];
};
