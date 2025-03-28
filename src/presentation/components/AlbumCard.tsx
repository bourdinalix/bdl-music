import { Album } from '@/domain/entities/Album';
import { formatCurrency } from '@/domain/constants/currencies';
import { FavoriteStar } from '@/presentation/components/FavoriteStar';
import Image from 'next/image';

interface AlbumCardProps {
  album: Album;
  isPriority?: boolean;
}

export const AlbumCard = ({ album, isPriority = false }: AlbumCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48 w-full">
        <FavoriteStar albumId={album.id} />
        <Image
          src={album.imageUrl}
          alt={album.title}
          fill
          priority={isPriority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg text-gray-900 font-semibold truncate">{album.title}</h3>
        <p className="text-gray-600 truncate">{album.artist}</p>
        <p className="text-sm text-gray-500 mt-2">
          {new Date(album.releaseDate).toLocaleDateString()}
        </p>
        <p className="text-sm font-medium text-gray-900 mt-2">
          {formatCurrency(album.price.amount, album.price.currency)}
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