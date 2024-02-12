import { Link, useParams } from "react-router-dom";

import { Book, BookInstance } from "../types";
import { useFetchData } from "../hooks/useFetchData";
import MLink from "../components/MLink";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/book/${id}`) as {
    data: { book: Book; bookInstances: BookInstance[] } | null;
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
    <div className={"flex flex-col gap-4"}>
      <h2 className="text-lg font-bold">Title: {book.title}</h2>
      <p>
        <span>Author: </span>
        <MLink
          to={`/authors/${book.author._id}`}
          text={book.author?.family_name}
        />
      </p>
      <p>Summary: {book.summary}</p>
      <p>ISBN: {book.isbn}</p>
      <p>
        <span>Genre: </span>
        <MLink to={`/authors/${book.author._id}`} text={book?.genre[0]?.name} />
      </p>
      <hr />
      <h2>Copies:</h2>
      <div>
        {bookInstances.map((bookInstance) => {
          let textColor = "yellow";

          if (bookInstance.status == "Available") {
            textColor = "text-green-400";
          } else if (bookInstance.status == "Maintenance") {
            textColor = "text-green-400";
          } else {
            textColor = "text-green-400";
          }
          return (
            <div className="flex flex-col gap-4">
              <p className={`${textColor}`}>{bookInstance.status}</p>
              <p>Imprint: {bookInstance.imprint}</p>
              <p>
                Id:
                <MLink
                  to={`/bookinstance/${bookInstance._id}`}
                  text={bookInstance._id}
                />
              </p>
              <hr />
            </div>
          );
        })}
      </div>

      <div>
        <button className="p-2 mr-4 bg-blue-600">
          <Link to={`/book/update/${book._id}`}>Update</Link>
        </button>
        <button className="p-2 bg-blue-600">
          <Link to={`/book/delete/${book._id}`}>Delete</Link>
        </button>
      </div>
    </div>
  );
};

export default BookDetailPage;
