import { useParams } from "react-router-dom";

import { Book, BookInstace } from "../types";
import { useFetchData } from "../hooks/useFetchData";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/book/${id}`) as {
    data: { book: Book; bookInstances: BookInstace[] } | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Book not found</p>;
  }

  const { book, bookInstances } = data;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author?.family_name}</p>
      <p>Genre: {book?.genre[0]?.name}</p>
      <p>Summary: {book.summary}</p>
      <p>ISBN: {book.isbn}</p>

      {bookInstances.map((bookInstace: BookInstace) => (
        <div key={bookInstace._id}>
          <p> {bookInstace?.imprint} </p>
          <p>{bookInstace?.imprint}</p>
        </div>
      ))}
    </div>
  );
};

export default BookDetailPage;
