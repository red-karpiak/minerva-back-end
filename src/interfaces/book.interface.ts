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
  categories: string[];
  publisher: string;
  publishedDate: Date;
  description: string;
  pageCount: number;
  language: string;
}
