import { Book } from '../api/BookSearchApiClient';

export function parseJsonBook(item: any): Book {
  return {
    title: item.book.title,
    author: item.book.author,
    isbn: item.book.isbn,
    quantity: item.stock.quantity,
    price: item.stock.price,
  };
}
