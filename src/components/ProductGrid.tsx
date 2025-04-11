
import { Product } from "@/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div className="col-span-full p-8 text-center">
          <p className="text-lg text-gray-500">No products match the selected filters.</p>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
