import { Album, AlbumResponse } from '@/domain/entities/Album';
import { IAlbumRepository } from '@/domain/repositories/IAlbumRepository';

export class ITunesAlbumRepository implements IAlbumRepository {
  private readonly baseUrl = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

  private mapResponseToAlbum(entry: AlbumResponse['feed']['entry'][0]): Album {
    return {
      id: entry.id.label,
      title: entry['im:name'].label,
      artist: entry['im:artist'].label,
      imageUrl: entry['im:image'][2].label,
      price: {
        amount: parseFloat(entry['im:price'].attributes.amount),
        currency: entry['im:price'].attributes.currency
      },
      releaseDate: entry['im:releaseDate'].label,
      category: entry.category.attributes.label,
      link: entry.link.attributes.href,
    };
  }

  async getTopAlbums(): Promise<Album[]> {
    try {
      const response = await fetch(this.baseUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: AlbumResponse = await response.json();
      return data.feed.entry.map(this.mapResponseToAlbum);
    } catch (error) {
      console.error('Error fetching top albums:', error);
      throw error;
    }
  }

  async searchAlbums(query: string): Promise<Album[]> {
    try {
      const albums = await this.getTopAlbums();
      return albums.filter(album => 
        album.title.toLowerCase().startsWith(query.toLowerCase()) ||
        album.artist.toLowerCase().startsWith(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching albums:', error);
      throw error;
    }
  }
} 