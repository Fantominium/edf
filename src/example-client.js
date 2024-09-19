
import BookSearchApiClient from './api/BookSearchApiClient';

async function main() {
  // You can specify the format as either "json" or "xml".
  const client = new BookSearchApiClient({ format: 'json' });

  try {
    // Fetch books by author. You can specify the author name and limit.
    const books = await client.getBooksByAuthor('J.K. Rowling', 10);

    // Log the result to the console (or render it in your UI if this is React).
    console.log('Fetched Books:', books);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
}

// Execute the main function to initiate the process.
main();
