import { GoogleBook, BookDetails, Book } from "../../interfaces/book.interface";

export const mockGoogleBooks: GoogleBook[] = [
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
export const mockGoogleBookDetails: GoogleBook = {
  id: "1",
  volumeInfo: {
    title: "Harry Potter and the Half-Blood Prince",
    subtitle: "Book 6",
    description:
      "Harry Potter enters his sixth year at Hogwarts School of Witchcraft and Wizardry.",
    authors: ["J.K. Rowling"],
    imageLinks: {
      smallThumbnail: "http://example.com/thumb1.jpg",
    },
    publisher: "Bloombury",
    publishedDate: new Date(2005, 7, 16),
    pageCount: 652,
    language: "en",
    categories: ["Fiction"],
  },
};
export const mockGoogleBook: GoogleBook = {
  id: "3",
  volumeInfo: {
    title: "Harry Potter and the Philosopher's Stone",
    authors: ["J.K. Rowling"],
    imageLinks: {
      smallThumbnail: "http://example.com/thumb1.jpg",
    },
  },
};

export const mockBookDetails: BookDetails = {
  id: "1",
  title: "Harry Potter and the Half-Blood Prince",
  subtitle: "Book 6",
  image: "http://example.com/thumb1.jpg",
  description:
    "Harry Potter enters his sixth year at Hogwarts School of Witchcraft and Wizardry.",
  authors: "J.K. Rowling",
  publisher: "Bloombury",
  publishedDate: new Date(2005, 7, 16),
  pageCount: 652,
  language: "en",
  categories: "Fiction",
};

export const mockBookDetailsVolumeInfoEmpty: BookDetails = {
  id: "4",
  title: "No title available",
  subtitle: "No title available",
  image: "",
  description: "No description available",
  authors: "No authors available",
  publisher: "No publisher available",
  publishedDate: new Date(),
  pageCount: 0,
  language: "No language available",
  categories: "No categories available",
};
