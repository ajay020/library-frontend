import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { Book } from "../types";

const Books = () => {
  const { data: books, loading } = useFetchData("/catalog/books") as {
    data: Book[] | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Books</h2>
      {books ? (
        books?.map((book) => (
          <div key={book._id}>
            <Link to={`${book._id}`}>{book.title}</Link>
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default Books;
