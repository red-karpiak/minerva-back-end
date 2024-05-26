import { Request, Response } from "express-serve-static-core";
import axios from "axios";
import { Book } from "../interfaces/book.interface";

export async function getBooksByTitle(request: Request, response: Response) {
  const title = request.params.title;
  const url = `https://openlibrary.org/search.json?title=${title}`;

  try {
    await axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          title
        )}&key=AIzaSyBThlDKHBdnQztwpAfhA9aWqNN6AeuaFiQ`
      )
      .then((res) => {
        const books: Book[] = res.data.docs;

        if (books.length === 0)
          response
            .status(404)
            .send(`No books with title: '${title}' were found`);
        const exactMatch: Book[] = books.filter(
          (book) => book.title.toLowerCase() === title.toLowerCase()
        );
        response.send(exactMatch.length > 0 ? exactMatch : books);
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
//function buildBookSearchQuery(searchValue: string): string {
//title
//isbn
//author_name
//author_key
//type
//first_publish_year
//publisher
//number_of_pages_median
//edition_key
//cover_i
//}
