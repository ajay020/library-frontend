import BookForm, { BookFormData } from "../components/BookForm";
import { useFetchData } from "../hooks/useFetchData";
import { useParams } from "react-router-dom";
import { Author, Book, Genre } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";

const BookUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/book/${id}/update`) as {
    data: { authors: Author[]; genres: Genre[]; book: Book } | null;
    loading: boolean;
  };

  if (!data) {
    return <p>Data not found </p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const updateBook = async (formData: BookFormData) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/book/${id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book Updated:", response.data);
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div className="">
      <h1 className="text-center text-lg my-4 ">Update book</h1>
      <BookForm
        authors={data.authors}
        genres={data.genres}
        initialBook={data.book}
        onSubmit={updateBook}
      />
    </div>
  );
};

export default BookUpdatePage;
