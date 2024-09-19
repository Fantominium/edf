// Utility function to parse XML book data into the desired format.
import { Book } from '../api/BookSearchApiClient';

export function parseXmlBook(xmlText: string): Book[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlText, "application/xml");
  const books: Book[] = [];

  // Get all book elements
  const bookNodes = xmlDoc.getElementsByTagName("book");

  // Loop through each book element
  for (let i = 0; i < bookNodes.length; i++) {
    const bookNode = bookNodes[i];

    // Use `getElementsByTagName` to fetch child elements from `bookNode`
    const titleNode = bookNode.getElementsByTagName("title")[0];
    const authorNode = bookNode.getElementsByTagName("author")[0];
    const isbnNode = bookNode.getElementsByTagName("isbn")[0];

    // Stock information is inside a 'stock' element
    const stockNode = bookNode.getElementsByTagName("stock")[0];
    const quantityNode = stockNode.getElementsByTagName("quantity")[0];
    const priceNode = stockNode.getElementsByTagName("price")[0];

    // Extract the text content, using fallback values in case a node is missing
    const title = titleNode?.textContent || "";
    const author = authorNode?.textContent || "";
    const isbn = isbnNode?.textContent || "";
    const quantity = Number(quantityNode?.textContent || "0");
    const price = Number(priceNode?.textContent || "0");

    // Push the parsed book object into the array
    books.push({ title, author, isbn, quantity, price });
  }

  return books;
}
