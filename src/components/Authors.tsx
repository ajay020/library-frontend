import { useFetchData } from "../hooks/useFetchData";

import { Author } from "../types";
import { formatdate } from "../util/helper";
import Heading from "./Heading";
import MLink from "./MLink";

const Authors = () => {
  const { data: authors, loading } = useFetchData("/catalog/authors") as {
    data: Author[] | null;
    loading: boolean;
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" flex flex-col gap-4 pl-8">
      <Heading level={1}>Authors</Heading>
      {authors ? (
        authors.map((author) => (
          <div key={author._id}>
            <MLink to={`${author._id}`}>
              {author.first_name} {author.family_name}
            </MLink>
            <span className="ml-2">
              ({formatdate(author.date_of_birth)} -{" "}
              {formatdate(author.date_of_death)})
            </span>
          </div>
        ))
      ) : (
        <p>No authors available.</p>
      )}
    </div>
  );
};

export default Authors;
