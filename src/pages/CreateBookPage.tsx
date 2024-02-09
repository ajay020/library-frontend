import BookForm, { BookFormData } from "../components/BookForm";
import { useFetchData } from "../hooks/useFetchData";
import { Author, Genre } from "../types";

import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";

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

  const createBook = async (formData: BookFormData) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/book/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book created:", response.data);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div>
      <BookForm authors={authors} genres={genres} onSubmit={createBook} />
    </div>
  );
};

export default CreateBookPage;
