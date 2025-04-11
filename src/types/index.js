// No types needed in JavaScript, but we'll keep documentation comments
// for reference on expected data shapes

/**
 * Product shape:
 * {
 *   id: number,
 *   name: string,
 *   price: number,
 *   image: string,
 *   category: string, 
 *   rating: number,
 *   description: string
 * }
 */

/**
 * CartItem shape:
 * {
 *   product: Product,
 *   quantity: number
 * }
 */

/**
 * FilterOptions shape:
 * {
 *   categories: string[],
 *   priceRange: [number, number],
 *   minRating: number
 * }
 */
