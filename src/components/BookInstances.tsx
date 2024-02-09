import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { BookInstace } from "../types";

const BookInstances = () => {
  const { data, loading } = useFetchData("/catalog/bookinstances") as {
    data: { bookinstace_list: BookInstace[] } | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No BookInstace found</p>;
  }

  return (
    <div>
      <h2>BookInstace: </h2>
      {data ? (
        data.bookinstace_list?.map((bookInstace) => (
          <div key={bookInstace._id}>
            <Link to={`/books/${bookInstace._id}`}>
              {bookInstace.book.title}
            </Link>
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookInstances;
