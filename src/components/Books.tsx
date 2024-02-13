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

  if (!books) {
    return <p>book not found</p>;
  }

  return (
    <div className="pl-8">
      <h1 className="text-lg font-bold">Book List</h1>
      <ul className="list-disc">
        {books.map((book) => (
          <li className="my-2" key={book._id}>
            <Link className="text-blue-600" to={`${book._id}`}>
              {book.title}
            </Link>
            <span className="mx-2">{book.author.family_name}</span>
            <span>{book.author.first_name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
