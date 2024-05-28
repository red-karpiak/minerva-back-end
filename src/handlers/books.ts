import { Request, Response } from "express-serve-static-core";
import axios from "axios";
import { Book, BookDetails } from "../interfaces/book.interface";

const googleUri = "https://www.googleapis.com/books/v1/volumes";

export async function queryBooks(request: Request, response: Response) {
  const query: string = request.params.query;
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

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
    await axios
      .get(url)
      .then((res) => {
        const books: Book[] = res.data.items.map((item: any): Book => {
          const volumeInfo = item.volumeInfo;
          const book: Book = {
            id: item.id,
            title: volumeInfo.title || "No title available",
            thumbnail: volumeInfo.imageLinks
              ? volumeInfo.imageLinks.smallThumbnail
              : "",
            authors: volumeInfo.authors
              ? volumeInfo.authors.join(", ")
              : "No authors available",
          };
          return book;
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
  const apiKey = process.env.GOOGLE_BOOKS_API_KEY;

  if (!apiKey) {
    throw new Error("Google Books API key is missing");
  }

  if (!id) {
    throw new Error("Id parameter is missing or empty");
  }
  const url = `${googleUri}/${id}?projection=full&key=${apiKey}&fields=volumeInfo(title,subtitle,authors,description,publisher,publishedDate,imageLinks,pageCount,language,categories)`;
  try {
    await axios
      .get(url)
      .then((res) => {
        const volumeInfo = res.data.volumeInfo;
        const book: BookDetails = {
          id: id,
          title: volumeInfo.title || "No title available",
          subtitle: volumeInfo.subtitle || "No title available",
          image: volumeInfo.imageLinks ? volumeInfo.imageLinks.small : "",
          description: volumeInfo.description || "No description available",
          authors: volumeInfo.authors
            ? volumeInfo.authors.join(", ")
            : "No authors available",
          publisher: volumeInfo.publisher || "No publisher available",
          publishedDate: volumeInfo.publishedDate
            ? new Date(volumeInfo.publishedDate)
            : new Date(),
          pageCount: volumeInfo.pageCount || 0,
          language: volumeInfo.language || "No language available",
          categories: volumeInfo.categories
            ? volumeInfo.categories.join(", ")
            : "No categories available",
        };

        if (!book)
          response.status(404).send(`Unable to find book with id "${id}"`);

        response.status(200).send(book);
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
