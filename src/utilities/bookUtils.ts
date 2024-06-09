import { Book, BookDetails } from "../interfaces/book.interface";

export function GetBookDetails(
  id: string,
  volumeInfo: any
): BookDetails | null {
  if (!id || !volumeInfo) return null;

  const bookDetails: BookDetails = {
    id: id,
    title: volumeInfo.title || "No title available",
    subtitle: volumeInfo.subtitle || "No title available",
    image: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "",
    description: volumeInfo.description || "No description available",
    authors: volumeInfo.authors
      ? volumeInfo.authors.join(", ")
      : "No authors available",
    publisher: volumeInfo.publisher || "No publisher available",
    publishedDate: volumeInfo.publishedDate
      ? new Date(volumeInfo.publishedDate as unknown as string)
      : new Date(),
    pageCount: volumeInfo.pageCount || 0,
    language: volumeInfo.language || "No language available",
    categories: volumeInfo.categories
      ? volumeInfo.categories.join(", ")
      : "No categories available",
  };

  return bookDetails;
}
export function GetBookMinimal(id: string, volumeInfo: any): Book | null {
  if (!id || !volumeInfo) return null;

  const book: Book = {
    id: id,
    title: volumeInfo.title || "No title available",
    image: volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : "",
    authors: volumeInfo.authors
      ? volumeInfo.authors.join(", ")
      : "No authors available",
  };

  return book;
}
