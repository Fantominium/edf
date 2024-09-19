// Import the helper functions from their respective files.
import { parseJsonBook } from '../utils/parseJsonBook';
import { parseXmlBook } from '../utils/parseXmlBook';

export interface Book {
  title: string;
  author: string;
  isbn: string;
  quantity: number;
  price: number;
}

interface BookSearchApiClientOptions {
  format: "json" | "xml";
}

class BookSearchApiClient {
  private format: "json" | "xml";

  constructor(options: BookSearchApiClientOptions) {
    this.format = options.format;
  }

  async getBooksByAuthor(authorName: string, limit: number): Promise<Book[]> {
    const url = `http://api.book-seller-example.com/by-author?q=${authorName}&limit=${limit}&format=${this.format}`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      if (this.format === "json") {
        const json = await response.json();
        return json.map((item: any) => parseJsonBook(item));
      }

      if (this.format === "xml") {
        const xmlText = await response.text();
        return parseXmlBook(xmlText);
      }

      throw new Error("Unsupported format");
    } catch (error) {
      console.error("Error fetching books:", error);
      return [];
    }
  }
}

export default BookSearchApiClient;
