import { Request, Response } from "express-serve-static-core";
import axios from "axios";
import { Book, BookDetails } from "../interfaces/book.interface";
import { GetBookDetails, GetBookMinimal } from "../utilities/bookUtils";

const googleUri = "https://www.googleapis.com/books/v1/volumes";

export async function queryBooks(request: Request, response: Response) {
  const query: string = request.query.q!.toString();
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  const url = `${googleUri}?q=${encodeURIComponent(
    query
  )}&key=${apiKey}&maxResults=40&fields=items(id,volumeInfo(title,authors,imageLinks))`;

  try {
    await axios
      .get(url)
      .then((res) => {
        const books: Book[] = res.data.items.map((item: any): Book => {
          const bookMinimal: Book | null = GetBookMinimal(
            item.id,
            item.volumeInfo
          );
          if (!bookMinimal) {
            response.status(500).send("Unable to retrieve book");
          }
          return bookMinimal as Book;
        });

        if (books.length === 0)
          response
            .status(404)
            .send(`Unable to find books from query "${query}"`);

        response.status(200).send(books);
      })
      .catch((error) => {
        console.error("Error:", error);
        response
          .status(500)
          .send("An error occurred while fetching book details");
      });
  } catch (err) {
    console.log(err);
    response.sendStatus(404);
  }
}
export async function queryBookById(request: Request, response: Response) {
  const id: string = request.params.id;
  const apiKey: string = process.env.GOOGLE_BOOKS_API_KEY as string;
  let queryFields =
    "fields=volumeInfo(title,subtitle,authors,description,publisher,publishedDate,imageLinks,pageCount,language,categories)";
  let minimal: Boolean = false;

  if (!apiKey) {
    throw new Error("Google Books API key is missing");
  }

  if (!id) {
    throw new Error("Id parameter is missing or empty");
  }

  if (request.params.minimal) {
    minimal = (request.params.minimal as string).toLowerCase() === "true";
    queryFields = "fields=volumeInfo(title,authors,imageLinks)";
  }
  const url = `${googleUri}/${id}?projection=full&key=${apiKey}&${queryFields}`;
  try {
    await axios
      .get(url)
      .then((res) => {
        const item = res.data.items;
        if (!item || item.length === 0) {
          response.status(404).send(`Unable to find book with id "${id}"`);
        }

        const volumeInfo = item.volumeInfo;

        if (minimal) {
          const bookMinimal = GetBookMinimal(id, volumeInfo);
          if (!bookMinimal)
            response.status(404).send(`Unable to find book with id "${id}"`);
          response.status(200).send(bookMinimal);
        }

        const bookDetails = GetBookDetails(id, volumeInfo);
        if (!bookDetails)
          response.status(404).send(`Unable to find book with id "${id}"`);

        response.status(200).send(bookDetails);
      })
      .catch((error) => {
        console.error("Error:", error);
        response
          .status(500)
          .send("An error occurred while fetching book details");
      });
  } catch (err) {
    console.log(err);
    response.sendStatus(404);
  }
}
