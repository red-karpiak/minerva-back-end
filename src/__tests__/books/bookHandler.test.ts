import request from "supertest";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createApp } from "../../createApp";
import {
  mockGoogleBooks,
  mockBookDetails,
  mockGoogleBookDetails,
} from "../mockData/bookMockData";
import { GoogleBook } from "../../interfaces/book.interface";
import { GetBookDetails, GetBookMinimal } from "../../utilities/bookUtils";

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
        items: mockGoogleBooks,
      });

    const response = await request(app).get(
      "/api/books/volumes?q=Harry%20Potter"
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      mockGoogleBooks.map((book: GoogleBook) => ({
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

describe("GET /api/books/volumes/:id", () => {
  let mock: MockAdapter;
  const id: Number = 1;
  beforeEach(() => {
    mock = new MockAdapter(axios);
    process.env.GOOGLE_BOOKS_API_KEY = testApiKey;
  });

  afterEach(() => {
    mock.restore();
  });

  it("should the book details with the specified id", async () => {
    mock
      .onGet(
        `${googleUri}/${id}?projection=full&key=${testApiKey}&fields=volumeInfo(title,subtitle,authors,description,publisher,publishedDate,imageLinks,pageCount,language,categories)`
      )
      .reply(200, {
        items: mockGoogleBookDetails,
      });

    const response = await request(app).get(`/api/books/volumes/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: mockGoogleBookDetails.id,
      title: mockGoogleBookDetails.volumeInfo.title,
      subtitle: mockGoogleBookDetails.volumeInfo.subtitle,
      description: mockGoogleBookDetails.volumeInfo.description,
      authors: mockGoogleBookDetails.volumeInfo.authors.join(", "),
      image: mockGoogleBookDetails.volumeInfo.imageLinks.smallThumbnail,
      publisher: mockGoogleBookDetails.volumeInfo.publisher,
      publishedDate:
        mockGoogleBookDetails.volumeInfo.publishedDate?.toISOString(),
      pageCount: mockGoogleBookDetails.volumeInfo.pageCount,
      language: mockGoogleBookDetails.volumeInfo.language,
      categories: mockGoogleBookDetails.volumeInfo.categories?.join(", "),
    });
  });
});

describe("GetBookDetails Tests", () => {
  it("should return the book details", () => {
    const result = GetBookDetails(
      mockGoogleBookDetails.id,
      mockGoogleBookDetails.volumeInfo
    );
    expect(result).toEqual({
      id: mockGoogleBookDetails.id,
      title: mockGoogleBookDetails.volumeInfo.title,
      subtitle: mockGoogleBookDetails.volumeInfo.subtitle,
      description: mockGoogleBookDetails.volumeInfo.description,
      authors: mockGoogleBookDetails.volumeInfo.authors.join(", "),
      image: mockGoogleBookDetails.volumeInfo.imageLinks.smallThumbnail,
      publisher: mockGoogleBookDetails.volumeInfo.publisher,
      publishedDate: mockGoogleBookDetails.volumeInfo.publishedDate,
      pageCount: mockGoogleBookDetails.volumeInfo.pageCount,
      language: mockGoogleBookDetails.volumeInfo.language,
      categories: mockGoogleBookDetails.volumeInfo.categories?.join(", "),
    });
  });

  it("should return null when id is missing", () => {
    const result = GetBookDetails("", mockGoogleBookDetails.volumeInfo);
    expect(result).toBeNull();
  });

  it("should return null when volumeInfo is missing", () => {
    const result = GetBookDetails(mockGoogleBookDetails.id, null);
    expect(result).toBeNull();
  });
});

describe("GetBookMinimal Tests", () => {
  it("should return the book details", () => {
    const result = GetBookMinimal(
      mockGoogleBookDetails.id,
      mockGoogleBookDetails.volumeInfo
    );
    expect(result).toEqual({
      id: mockGoogleBookDetails.id,
      title: mockGoogleBookDetails.volumeInfo.title,
      authors: mockGoogleBookDetails.volumeInfo.authors.join(", "),
      thumbnail: mockGoogleBookDetails.volumeInfo.imageLinks.smallThumbnail,
    });
  });

  it("should return null when id is missing", () => {
    const result = GetBookMinimal("", mockGoogleBookDetails.volumeInfo);
    expect(result).toBeNull();
  });

  it("should return null when volumeInfo is missing", () => {
    const result = GetBookMinimal(mockGoogleBookDetails.id, null);
    expect(result).toBeNull();
  });
});
