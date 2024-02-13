import { useFetchData } from "../hooks/useFetchData";
import { BookInstance } from "../types";
import Heading from "./Heading";
import MLink from "./MLink";

const BookInstances = () => {
  const { data, loading } = useFetchData("/catalog/bookinstances") as {
    data: { bookinstace_list: BookInstance[] } | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No BookInstace found</p>;
  }

  return (
    <div className=" flex flex-col gap-4 pl-8">
      <Heading level={1}>BookInstace: </Heading>
      {data ? (
        data.bookinstace_list?.map((bookInstace) => (
          <div key={bookInstace._id}>
            <MLink to={`/bookinstance/${bookInstace._id}`}>
              {bookInstace.book.title}
            </MLink>
          </div>
        ))
      ) : (
        <p>No books available.</p>
      )}
    </div>
  );
};

export default BookInstances;
