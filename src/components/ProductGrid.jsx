
import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
