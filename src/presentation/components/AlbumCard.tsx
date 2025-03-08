import { Album } from '@/domain/entities/Album';
import Image from 'next/image';

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard = ({ album }: AlbumCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <Image
          src={album.imageUrl}
          alt={album.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold truncate">{album.title}</h3>
        <p className="text-gray-600 truncate">{album.artist}</p>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(album.releaseDate).toLocaleDateString()}
        </p>
        <p className="text-sm font-medium text-gray-900 mt-2">
          {album.price.amount} {album.price.currency}
        </p>
        <a
          href={album.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Voir sur iTunes
        </a>
      </div>
    </div>
  );
}; 