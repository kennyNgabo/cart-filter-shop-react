
import { useState, useEffect, useCallback } from "react";
import { products } from "@/data/products";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import FilterPanel from "@/components/FilterPanel";

const Index = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 1000],
    minRating: 0
  });
  
  // Apply filters to products
  const applyFilters = useCallback(() => {
    let result = [...products];
    
    // Filter by category
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1]
    );
    
    // Filter by rating
    if (filters.minRating > 0) {
      result = result.filter(product => product.rating >= filters.minRating);
    }
    
    setFilteredProducts(result);
  }, [filters]);
  
  // Apply filters when they change
  useEffect(() => {
    applyFilters();
  }, [filters, applyFilters]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Shop Products</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel onFilterChange={handleFilterChange} />
          </div>
          
          <div className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
