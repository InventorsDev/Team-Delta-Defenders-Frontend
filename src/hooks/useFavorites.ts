import { useState, useCallback } from 'react';

export const useFavorites = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavoriteProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  }, []);

  const isFavorite = useCallback((productId: number) => {
    return favoriteProducts.includes(productId);
  }, [favoriteProducts]);

  const clearFavorites = useCallback(() => {
    setFavoriteProducts([]);
  }, []);

  return {
    favoriteProducts,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
};