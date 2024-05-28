import { GoogleBook } from "../../interfaces/book.interface";

const mockBooks: GoogleBook[] = [
  {
    id: "1",
    volumeInfo: {
      title: "Harry Potter and the Sorcerer's Stone",
      authors: ["J.K. Rowling"],
      imageLinks: {
        smallThumbnail: "http://example.com/thumb1.jpg",
      },
    },
  },
  {
    id: "2",
    volumeInfo: {
      title: "Harry Potter and the Chamber of Secrets",
      authors: ["J.K. Rowling"],
      imageLinks: {
        smallThumbnail: "http://example.com/thumb2.jpg",
      },
    },
  },
];
export default mockBooks;
