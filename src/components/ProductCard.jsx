
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Star, StarHalf } from "lucide-react";
import { toast } from "sonner";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    
    return (
      <div className="flex items-center space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-md animate-fade-in">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow p-4 space-y-3">
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-gray-900 truncate">{product.name}</h3>
            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-gray-100">
              {product.category}
            </span>
          </div>
          <div className="mt-2">
            {renderRating(product.rating)}
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <Button 
            onClick={handleAddToCart}
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
