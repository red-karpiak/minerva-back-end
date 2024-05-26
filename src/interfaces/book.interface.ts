export interface Book {
  isbn: string[];
  title: string;
  image: string;
  synopsis: string;
  author: string;
  notes: string;
  publisher: string;
  publicationDate: Date;
}

export interface BookDetails {
    thumbnail_url?: string;
    
}