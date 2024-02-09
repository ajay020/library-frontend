import { useParams } from "react-router-dom";

import { Author, Book } from "../types";
import { useFetchData } from "../hooks/useFetchData";

type AuthorDataType = {
  author: Author;
  author_books: Book[];
};

const AuthorDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useFetchData(`/catalog/author/${id}`) as {
    data: AuthorDataType | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Author not found</p>;
  }

  const { author, author_books } = data;

  return (
    <div>
      <h2>
        {author.first_name} {author.family_name}
      </h2>
      <p>Date of Birth: {author?.date_of_birth?.toString()}</p>

      <p>Books: </p>

      {author_books.map((book: Book) => (
        <div key={book._id}>
          <p>{book.title}</p>
        </div>
      ))}
    </div>
  );
};

export default AuthorDetailPage;
