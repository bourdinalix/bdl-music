export interface Album {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  price: {
    amount: number;
    currency: string;
  };
  releaseDate: string;
  category: string;
  link: string;
}

export interface AlbumResponse {
  feed: {
    entry: Array<{
      id: {
        label: string;
      };
      'im:name': {
        label: string;
      };
      'im:artist': {
        label: string;
      };
      'im:image': Array<{
        label: string;
      }>;
      'im:price': {
        attributes: {
            amount: string;
            currency: string;
        };
      };
      'im:releaseDate': {
        label: string;
      };
      category: {
        attributes: {
          label: string;
        };
      };
      link: {
        attributes: {
          href: string;
        };
      };
    }>;
  };
} 