
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";
import CartItem from "./CartItem";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const ShoppingCart = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  
  const handleCheckout = () => {
    toast.success("Thank you for your order!");
    clearCart();
  };
  
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingBag className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>
        
        {cart.length > 0 ? (
          <>
            <div className="flex-grow overflow-auto py-6 space-y-4">
              {cart.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex justify-between py-2">
                <span className="font-medium">Items:</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-medium">Shipping:</span>
                <span>Free</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between py-2 text-lg font-bold">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <Button 
                onClick={handleCheckout}
                className="w-full mt-4"
              >
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-medium mb-1">Your cart is empty</h3>
            <p className="text-gray-500 text-center mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <SheetTrigger asChild>
              <Button variant="outline">Continue Shopping</Button>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCart;
