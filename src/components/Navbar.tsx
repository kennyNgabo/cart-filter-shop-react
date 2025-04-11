
import { Button } from "@/components/ui/button";
import ShoppingCart from "./ShoppingCart";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-xl font-bold">ShopCart</span>
        </Link>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" asChild>
            <Link to="/">Shop</Link>
          </Button>
          <ShoppingCart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
