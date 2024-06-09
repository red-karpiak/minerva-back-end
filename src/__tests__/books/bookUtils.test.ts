import { GetBookDetails, GetBookMinimal } from "../../utilities/bookUtils";
import { mockGoogleBookDetails } from "../mockData/bookMockData";

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
      image: mockGoogleBookDetails.volumeInfo.imageLinks.smallThumbnail,
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
