import request from "supertest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createApp } from "../../createApp";
import mockBooks from "../mockData/bookMockData";

const app = createApp();
const googleUri = "https://www.googleapis.com/books/v1/volumes";
const testApiKey = "testApiKey";
describe("GET /api/books/volumes", () => {
  let mock: MockAdapter;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    process.env.GOOGLE_BOOKS_API_KEY = testApiKey;
  });

  afterEach(() => {
    mock.restore();
  });

  it("should return a list of books", async () => {
    mock
      .onGet(
        `${googleUri}?q=Harry%20Potter&key=${testApiKey}&maxResults=40&fields=items(id,volumeInfo(title,authors,imageLinks))`
      )
      .reply(200, {
        items: mockBooks,
      });

    const response = await request(app).get(
      "/api/books/volumes?q=Harry%20Potter"
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

  it("should handle errors when API key is missing", async () => {
    delete process.env.GOOGLE_BOOKS_API_KEY;

    const response = await request(app).get(
      "/api/books/volumes?q=Harry%20Potter"
    );

    expect(response.status).toBe(500);
    expect(response.text).toContain("Google Books API key is missing");

    process.env.GOOGLE_BOOKS_API_KEY = "testApiKey"; // Restore dummy API key
  });

  it("should handle errors when query parameter is missing", async () => {
    const response = await request(app).get("/api/books/volumes");

    expect(response.status).toBe(500);
  });

  it("should handle errors when query parameter is too short", async () => {
    const response = await request(app).get("/api/books/volumes?q=abc");

    expect(response.status).toBe(400);
    expect(response.text).toContain(
      "Query must be at least five characters long."
    );
  });
  it("should handle API errors gracefully", async () => {
    mock
      .onGet(
        `${googleUri}?q=Harry%20Potter&key=${testApiKey}&maxResults=40&fields=items(id,volumeInfo(title,authors,imageLinks))`
      )
      .reply(500);

    const response = await request(app).get(
      "/api/books/volumes?q=Harry%20Potter"
    );

    expect(response.status).toBe(500);
    expect(response.text).toBe("An error occurred while fetching book details");
  });
});
