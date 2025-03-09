'use client';

import { useEffect, useState, useMemo } from 'react';
import { Album } from '@/domain/entities/Album';
import { AlbumCard } from '@/presentation/components/AlbumCard';
import { CategoryFilter } from '@/presentation/components/CategoryFilter';
import { ITunesAlbumRepository } from '@/infrastructure/repositories/ITunesAlbumRepository';
import { GetTopAlbumsUseCase } from '@/application/use-cases/album/GetTopAlbumsUseCase';
import { SearchAlbumsUseCase } from '@/application/use-cases/album/SearchAlbumsUseCase';

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const albumRepository = new ITunesAlbumRepository();
  const getTopAlbumsUseCase = new GetTopAlbumsUseCase(albumRepository);
  const searchAlbumsUseCase = new SearchAlbumsUseCase(albumRepository);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const data = await getTopAlbumsUseCase.execute();
        setAlbums(data);
      } catch (error) {
        console.error('Error fetching albums:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = await searchAlbumsUseCase.execute(query);
      setAlbums(results);
    } else {
      const allAlbums = await getTopAlbumsUseCase.execute();
      setAlbums(allAlbums);
    }
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
  };

  const filteredAlbums = useMemo(() => selectedCategory
    ? albums.filter(album => album.category === selectedCategory)
  : albums, [albums, selectedCategory]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        iTunes x BDL
      </h1>

      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center gap-12">
          <input
            type="text"
            placeholder="Rechercher un album..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-[600px] px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="w-48">
            <CategoryFilter 
              albums={albums}
              onFilterChange={handleCategoryChange}
              selectedCategory={selectedCategory}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredAlbums.map((album, index) => (
          <AlbumCard 
            key={album.id} 
            album={album}
            isPriority={index < 4}
          />
        ))}
      </div>
    </main>
  );
}
