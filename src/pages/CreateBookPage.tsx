import BookForm from "../components/BookForm";
import { useFetchData } from "../hooks/useFetchData";
import { Author, Genre } from "../types";

const CreateBookPage = () => {
  const { data: authors, loading } = useFetchData("/catalog/authors") as {
    data: Author[] | null;
    loading: boolean;
  };

  const { data: genres, loading: genreLoading } = useFetchData(
    "/catalog/genres"
  ) as {
    data: Genre[] | null;
    loading: boolean;
  };

  if (!authors || !genres) {
    return <p>Data not found!</p>;
  }

  if (loading || genreLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <BookForm authors={authors} genres={genres} />
    </div>
  );
};

export default CreateBookPage;
