import { Request, Response } from "express-serve-static-core";
import axios from "axios";
import { Book, BookDetails } from "../interfaces/book.interface";
import { GetBookDetails, GetBookMinimal } from "../utilities/bookUtils";

const googleUri = "https://www.googleapis.com/books/v1/volumes";

export async function queryBooks(
  request: Request,
  response: Response
): Promise<Book[] | null> {
  const query: string = request.query.q!.toString() || "";
  const apiKey: string | undefined = process.env.GOOGLE_BOOKS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Books API key is missing");
  }

  if (!query) {
    throw new Error("Query parameter is missing or empty");
  }

  const url = `${googleUri}?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&maxResults=40&fields=items(id,volumeInfo(title,authors,imageLinks))`;

  try {
    const result = await axios.get(url);
    const items = result.data.items;
    if (!items || items.length === 0) {
      response.status(404).send(`Unable to find books from query "${query}"`);
      return null;
    }
    const books: Book[] = items.map((item: any) => {
      const bookMinimal: Book | null = GetBookMinimal(item.id, item.volumeInfo);
      if (!bookMinimal) {
        console.error("Unable to retrieve book...");
      }
      return bookMinimal;
    });
    response.status(200).json(books);
    return books;
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send("An error occurred while fetching book details");
    return null;
  }
}

export async function queryBookById(
  request: Request,
  response: Response
): Promise<Book | BookDetails | null> {
  const id: string = request.params.id;
  const apiKey: string = process.env.GOOGLE_BOOKS_API_KEY as string;

  if (!apiKey) {
    throw new Error("Google Books API key is missing");
  }

  if (!id) {
    throw new Error("Id parameter is missing or empty");
  }

  const minimal: boolean = request.params.minimal?.toLowerCase() === "true";
  const queryFields = minimal
    ? "fields=volumeInfo(title,authors,imageLinks)"
    : "fields=volumeInfo(title,subtitle,authors,description,publisher,publishedDate,imageLinks,pageCount,language,categories)";
  const url = `${googleUri}/${id}?projection=full&key=${apiKey}&${queryFields}`;

  try {
    const result = await axios.get(url);
    const volumeInfo = result.data.volumeInfo;
    if (!volumeInfo || volumeInfo.length === 0) {
      response.status(404).send(`Unable to find book with id "${id}"`);
      return null;
    }
    const book = minimal
      ? GetBookMinimal(id, volumeInfo)
      : GetBookDetails(id, volumeInfo);
    if (!book) {
      response.status(404).send(`Unable to find book with id "${id}"`);
      return null;
    }
    response.status(200).json(book);
    return book;
  } catch (error) {
    console.error("Error:", error);
    response.status(500).send("An error occurred while fetching book details");
    return null;
  }
}
