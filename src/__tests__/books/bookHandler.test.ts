import request from "supertest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createApp } from "../../createApp";
import mockBooks from "../mockData/bookMockData";
import { GoogleBook } from "../../interfaces/book.interface";

const app = createApp();
const googleUri = "https://www.googleapis.com/books/v1/volumes";
describe("GET /api/books/volumes/:query", () => {
  let mock: MockAdapter;

  beforeAll(() => {
    mock = new MockAdapter(axios);
    process.env.GOOGLE_BOOKS_API_KEY = "testApiKey";
  });

  afterAll(() => {
    mock.restore();
  });

  it("should return a list of books", async () => {
    const mockBookData: GoogleBook[] = mockBooks;

    mock
      .onGet(
        `${googleUri}?q=Harry%20Potter&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=40&fields=items(id,volumeInfo(title,authors,imageLinks))`
      )
      .reply(200, {
        items: mockBooks,
      });

    const response = await request(app).get(
      "/api/books/volumes/Harry%20Potter"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      mockBooks.map((book) => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors.join(", "),
        thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
      }))
    );
  });

  // it("should handle errors when API key is missing", async () => {
  //   delete process.env.GOOGLE_BOOKS_API_KEY;

  //   const response = await request(app).get(
  //     "/api/books/volumes/Harry%20Potter"
  //   );

  //   expect(response.status).toBe(500);
  //   expect(response.text).toBe("Google Books API key is missing");

  //   process.env.GOOGLE_BOOKS_API_KEY = "testApiKey"; // Restore test API key
  // });

  // it("should handle errors when query parameter is missing", async () => {
  //   const response = await request(app).get("/api/books/volumes/");

  //   expect(response.status).toBe(404); // Express catches this as a missing route
  // });

  // it("should handle API errors gracefully", async () => {
  //   mock
  //     .onGet(
  //       "https://www.googleapis.com/books/v1/volumes?q=Harry%20Potter&key=testApiKey&maxResults=40&fields=items(id,volumeInfo(title,authors,imageLinks))"
  //     )
  //     .reply(500);

  //   const response = await request(app).get(
  //     "/api/books/volumes/Harry%20Potter"
  //   );

  //   expect(response.status).toBe(500);
  //   expect(response.text).toBe("An error occurred while fetching book details");
  // });
});