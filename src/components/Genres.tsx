import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { Genre } from "../types";

const Books = () => {
  const { data: genres, loading } = useFetchData("/catalog/genres") as {
    data: Genre[] | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Genres</h2>
      {genres ? (
        genres?.map((genre) => (
          <div key={genre._id}>
            <Link to={`${genre._id}`}>{genre.name}</Link>
          </div>
        ))
      ) : (
        <p>No Genre available.</p>
      )}
    </div>
  );
};

export default Books;
