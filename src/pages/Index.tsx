
import { useState, useEffect } from "react";
import { products } from "@/data/products";
import { FilterOptions, Product } from "@/types";
import FilterPanel from "@/components/FilterPanel";
import ProductGrid from "@/components/ProductGrid";
import Navbar from "@/components/Navbar";

const Index = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 1000],
    minRating: 0
  });

  // Apply filters when they change
  useEffect(() => {
    const filtered = products.filter(product => {
      // Filter by category (if any categories are selected)
      const categoryMatch = 
        filters.categories.length === 0 || 
        filters.categories.includes(product.category);
      
      // Filter by price range
      const priceMatch = 
        product.price >= filters.priceRange[0] && 
        product.price <= filters.priceRange[1];
      
      // Filter by minimum rating
      const ratingMatch = product.rating >= filters.minRating;
      
      return categoryMatch && priceMatch && ratingMatch;
    });
    
    setFilteredProducts(filtered);
  }, [filters]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Product Catalog</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>
          
          <div className="md:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-6">
        <div className="container text-center text-sm text-gray-500">
          &copy; 2023 ShopCart. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Index;
