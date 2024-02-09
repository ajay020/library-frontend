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

  return (
    <div>
      <h2>{data.genre?.name}</h2>
      {data.books.map((book) => (
        <Link key={book._id} to={`book/${book._id}`}>
          {book.title}
        </Link>
      ))}
    </div>
  );
};

export default GenreDetailPage;
