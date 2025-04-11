
import { useCart } from "@/context/CartContext";
import { CartItem as CartItemType } from "@/types";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const increaseQuantity = () => {
    updateQuantity(product.id, quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };
  
  const handleRemove = () => {
    removeFromCart(product.id);
  };
  
  const subtotal = product.price * quantity;
  
  return (
    <div className="cart-item">
      <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover rounded"
        />
      </div>
      
      <div className="flex-grow space-y-1">
        <h4 className="font-medium text-gray-900">{product.name}</h4>
        <p className="text-sm text-gray-500">${product.price.toFixed(2)}</p>
        
        <div className="flex items-center space-x-3 mt-2">
          <div className="flex items-center border rounded">
            <Button 
              onClick={decreaseQuantity}
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center text-sm">{quantity}</span>
            
            <Button 
              onClick={increaseQuantity}
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-none"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <Button 
            onClick={handleRemove}
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-shrink-0 font-medium">
        ${subtotal.toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
