import { useParams } from "react-router-dom";

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
    <div className={"flex flex-col gap-5 p-8"}>
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
      <div>
        <span>Genre: </span>
        <>
          {book.genre.map((g) => (
            <MLink key={g._id} to={`/genre/${book.author._id}`} text={g.name} />
          ))}
        </>
      </div>
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

        {bookInstances.length == 0 && <p>No copy available of this book.</p>}
      </div>

      <div className="flex flex-col gap-4">
        <MLink to={`/book/update/${book._id}`} text="Update" />
        <MLink to={`/book/delete/${book._id}`} text="Delete" />
      </div>
    </div>
  );
};

export default BookDetailPage;
