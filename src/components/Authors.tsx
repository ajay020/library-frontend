import { Link } from "react-router-dom";
import { useFetchData } from "../hooks/useFetchData";
import { Author } from "../types";

const Authors = () => {
  const { data: authors, loading } = useFetchData("/catalog/authors") as {
    data: Author[] | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Authors</h2>
      {authors ? (
        authors.map((author) => (
          <div key={author._id}>
            <Link to={`${author._id}`}>
              {author.first_name} {author.family_name}
            </Link>
          </div>
        ))
      ) : (
        <p>No authors available.</p>
      )}
    </div>
  );
};

export default Authors;
