import { useFetchData } from "../hooks/useFetchData";
import { Genre } from "../types";
import Heading from "./Heading";
import MLink from "./MLink";

const Books = () => {
  const { data: genres, loading } = useFetchData("/catalog/genres") as {
    data: Genre[] | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-2 pl-8">
      <Heading level={1}>Genres</Heading>
      {genres ? (
        genres?.map((genre) => (
          <div key={genre._id}>
            <MLink to={`${genre._id}`}>{genre.name}</MLink>
          </div>
        ))
      ) : (
        <p>No Genre available.</p>
      )}
    </div>
  );
};

export default Books;
