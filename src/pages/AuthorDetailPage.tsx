import { useParams } from "react-router-dom";

import { Author, Book } from "../types";
import { useFetchData } from "../hooks/useFetchData";
import Heading from "../components/Heading";
import { formatdate } from "../util/helper";
import MLink from "../components/MLink";

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
    <div className="flex flex-col gap-4 p-8">
      <Heading level={1}>
        {author.first_name} {author.family_name}
      </Heading>
      <p>Date of Birth: {formatdate(author?.date_of_birth?.toString())}</p>
      <Heading level={3} className="text-lg font-normal">
        Books:{" "}
      </Heading>

      {author_books.map((book: Book) => (
        <div key={book._id}>
          <MLink to={`/books/${book._id}`}>{book.title}</MLink>
        </div>
      ))}

      <hr />
      <div className="flex flex-col gap-4">
        <MLink to={`/author/update/${author._id}`}>Update</MLink>
        <MLink to={`/author/delete/${author._id}`}>Delete</MLink>
      </div>
    </div>
  );
};

export default AuthorDetailPage;
