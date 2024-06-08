export interface Book {
  id: string;
  title: string;
  thumbnail?: string;
  authors: string;
}

export interface BookDetails {
  id: string;
  title: string;
  subtitle: string;
  image?: string;
  authors: string;
  categories: string;
  publisher: string;
  publishedDate: Date;
  description: string;
  pageCount: number;
  language: string;
}

export interface GoogleBook {
  id: string;
  volumeInfo: VolumeInfo;
}

interface ImageLinks {
  smallThumbnail: string;
}

interface VolumeInfo {
  title: string;
  authors: string[];
  imageLinks: ImageLinks;
  subtitle?: String;
  description?: String;
  publisher?: String;
  publishedDate?: Date;
  pageCount?: Number;
  language?: String;
  categories?: string[];
}
