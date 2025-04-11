
import { getUniqueCategories, getPriceRange } from "@/data/products";
import { FilterOptions } from "@/types";
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface FilterPanelProps {
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterPanel = ({ onFilterChange }: FilterPanelProps) => {
  const categories = getUniqueCategories();
  const [minPrice, maxPrice] = getPriceRange();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [minRating, setMinRating] = useState<number>(0);

  // Apply filters when they change
  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      minRating
    });
  }, [selectedCategories, priceRange, minRating, onFilterChange]);

  // Handle category checkbox changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Handle price slider changes
  const handlePriceChange = (values: number[]) => {
    setPriceRange([values[0], values[1]]);
  };

  // Handle rating selection
  const handleRatingChange = (rating: number) => {
    setMinRating(rating);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([minPrice, maxPrice]);
    setMinRating(0);
  };

  return (
    <div className="space-y-6 p-4 bg-white rounded-lg border shadow-sm">
      <div>
        <h3 className="text-lg font-semibold mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox 
                id={`category-${category}`} 
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={[minPrice, maxPrice]} 
            min={minPrice}
            max={maxPrice}
            step={1} 
            value={[priceRange[0], priceRange[1]]}
            onValueChange={handlePriceChange}
            className="mt-6"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span>${priceRange[0].toFixed(2)}</span>
            <span>${priceRange[1].toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Minimum Rating</h3>
        <div className="flex space-x-2">
          {[0, 1, 2, 3, 4, 5].map((rating) => (
            <Button 
              key={rating}
              variant={minRating === rating ? "default" : "outline"} 
              size="sm"
              onClick={() => handleRatingChange(rating)}
              className={minRating === rating ? "" : "bg-white"}
            >
              {rating === 0 ? "All" : rating}
            </Button>
          ))}
        </div>
      </div>

      <Button 
        onClick={handleClearFilters}
        variant="outline"
        className="w-full mt-4"
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterPanel;
