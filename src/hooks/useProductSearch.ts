import { useState, useCallback, useEffect } from 'react';
import { Product } from '@/data/marketplaceProducts';
import { categorizeProduct } from '@/data/marketplaceCategories';

export const useProductSearch = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');

  const handleSearch = useCallback((query: string) => {
    setSearchTerm(query);
    if (query.trim()) {
      setIsSearchActive(true);
      let filtered = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.location.toLowerCase().includes(query.toLowerCase())
      );

      // Apply category filters if any are selected
      if (selectedCategories.length > 0) {
        filtered = filtered.filter(product =>
          selectedCategories.includes(categorizeProduct(product.name))
        );
      }

      // Apply location filter if a specific location is selected
      if (selectedLocation !== 'All') {
        filtered = filtered.filter(product =>
          product.location.toLowerCase().includes(selectedLocation.toLowerCase())
        );
      }

      setFilteredProducts(filtered);
    } else {
      setIsSearchActive(false);
      setFilteredProducts([]);
    }
  }, [products, selectedCategories, selectedLocation]);

  const handleCategoryToggle = useCallback((categoryName: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryName)) {
        return prev.filter(cat => cat !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setSelectedCategories([]);
    setSelectedLocation('All');
    setMinPrice('');
    setMaxPrice('');
  }, []);

  const getDisplayProducts = useCallback(() => {
    let products_to_display = products;

    if (isSearchActive && searchTerm.trim()) {
      products_to_display = filteredProducts;
    } else if (selectedCategories.length > 0 || selectedLocation !== 'All') {
      // Show products from selected categories and/or location even without search
      products_to_display = products.filter(product => {
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(categorizeProduct(product.name));
        const matchesLocation = selectedLocation === 'All' || product.location.toLowerCase().includes(selectedLocation.toLowerCase());
        return matchesCategory && matchesLocation;
      });
    }

    return products_to_display;
  }, [products, isSearchActive, searchTerm, filteredProducts, selectedCategories, selectedLocation]);

  // Update filtered products when categories change
  useEffect(() => {
    if (isSearchActive && searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  }, [selectedCategories, handleSearch, isSearchActive, searchTerm]);

  // Update filtered products when location changes
  useEffect(() => {
    if (isSearchActive && searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  }, [selectedLocation, handleSearch, isSearchActive, searchTerm]);

  return {
    searchTerm,
    isSearchActive,
    filteredProducts,
    selectedCategories,
    selectedLocation,
    minPrice,
    maxPrice,
    handleSearch,
    handleCategoryToggle,
    clearAllFilters,
    getDisplayProducts,
    setSelectedLocation,
    setMinPrice,
    setMaxPrice
  };
};