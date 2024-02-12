import { Link, useParams } from "react-router-dom";

import { BookInstance } from "../types";
import { useFetchData } from "../hooks/useFetchData";

const BookInstanceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/bookinstance/${id}`) as {
    data: { bookinstance: BookInstance } | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Book not found</p>;
  }
  const { bookinstance } = data;

  return (
    <div>
      <h2>{bookinstance.book.title}</h2>
      <p> {bookinstance.status} </p>
      <div>
        <button className="p-2 mr-4 bg-blue-600">
          <Link to={`/bookinstance/update/${bookinstance._id}`}>Update</Link>
        </button>
        <button className="p-2 bg-blue-600">
          <Link to={`/bookinstance/delete/${bookinstance._id}`}>Delete</Link>
        </button>
      </div>
    </div>
  );
};

export default BookInstanceDetailPage;
