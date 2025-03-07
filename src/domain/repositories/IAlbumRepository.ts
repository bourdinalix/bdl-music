import { Album } from '../entities/Album';

export interface IAlbumRepository {
  getTopAlbums(): Promise<Album[]>;
  searchAlbums(query: string): Promise<Album[]>;
} 