'use client';

import { useEffect, useState } from 'react';
import { Album } from '@/domain/entities/Album';
import { AlbumCard } from '@/presentation/components/AlbumCard';
import { ITunesAlbumRepository } from '@/infrastructure/repositories/ITunesAlbumRepository';
import { GetTopAlbumsUseCase } from '@/application/use-cases/album/GetTopAlbumsUseCase';
import { SearchAlbumsUseCase } from '@/application/use-cases/album/SearchAlbumsUseCase';

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
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
        Itunes x BDL
      </h1>
      
      <div className="mb-8">
        <input
          type="text"
          placeholder="Rechercher un album..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-md mx-auto block px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album, index) => (
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
