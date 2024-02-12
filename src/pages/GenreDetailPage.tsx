import { Link, useParams } from "react-router-dom";
import { Genre, Book } from "../types";
import { useFetchData } from "../hooks/useFetchData";

const GenreDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/genre/${id}`) as {
    data: { genre: Genre; books: Book[] } | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Genre not found</p>;
  }

  const { genre, books } = data;

  return (
    <div>
      <h2>{genre?.name}</h2>
      {books?.map((book) => (
        <Link key={book._id} to={`book/${book._id}`}>
          {book.title}
        </Link>
      ))}
      <div>
        <button className="p-2 mr-4 bg-blue-600">
          <Link to={`/genre/update/${genre._id}`}>Update</Link>
        </button>
        <button className="p-2 bg-blue-600">
          <Link to={`/genre/delete/${genre._id}`}>Delete</Link>
        </button>
      </div>
    </div>
  );
};

export default GenreDetailPage;
