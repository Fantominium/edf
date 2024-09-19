
import BookSearchApiClient from './api/BookSearchApiClient';

async function main() {
  const client = new BookSearchApiClient({ format: 'json' });

  try {
    const books = await client.getBooksByAuthor('J.K. Rowling', 10);

    console.log('Fetched Books:', books);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

main();
