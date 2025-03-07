import { Album } from '@/domain/entities/Album';
import { IAlbumRepository } from '@/domain/repositories/IAlbumRepository';

export class GetTopAlbumsUseCase {
  constructor(private readonly albumRepository: IAlbumRepository) {}

  async execute(): Promise<Album[]> {
    try {
      return await this.albumRepository.getTopAlbums();
    } catch (error) {
      throw new Error('Impossible de récupérer les albums : ' + (error as Error).message);
    }
  }
}
