import { useState, useEffect } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const toggleFavorite = (albumId: string) => {
    const newFavorites = favorites.includes(albumId)
      ? favorites.filter(id => id !== albumId)
      : [...favorites, albumId];
    
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (albumId: string) => favorites.includes(albumId);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}; 