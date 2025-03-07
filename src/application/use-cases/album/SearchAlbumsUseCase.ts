import { Album } from '@/domain/entities/Album';
import { IAlbumRepository } from '@/domain/repositories/IAlbumRepository';

export class SearchAlbumsUseCase {
  constructor(private readonly albumRepository: IAlbumRepository) {}

  async execute(query: string): Promise<Album[]> {
    if (!query.trim()) {
      throw new Error('Le terme de recherche ne peut pas être vide');
    }

    try {
      return await this.albumRepository.searchAlbums(query);
    } catch (error) {
      throw new Error('Impossible de rechercher les albums : ' + (error as Error).message);
    }
  }
} 
