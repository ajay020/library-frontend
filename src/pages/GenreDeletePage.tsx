import { useFetchData } from "../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import { Book, BookInstance } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";

const GenreDeletePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/book/${id}/delete`) as {
    data: { bookinstances: BookInstance[]; book: Book } | null;
    loading: boolean;
  };

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Data not found </p>;
  }

  const { bookinstances, book } = data;

  const deleteBook = async (bookid: string) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/book/${id}/delete`,
        { bookid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book Deleted:", response.data);
      navigate("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h1>Delete: {book.title}</h1>
      {bookinstances.length > 0 && (
        <div>
          <p> Delete the bookinstance before deleting the book.</p>
          {bookinstances.map((bookinstance) => (
            <p key={bookinstance._id}> {bookinstance.book.title}</p>
          ))}
        </div>
      )}
      {bookinstances.length == 0 && (
        <div>
          <p>Are you sure you want to delete this book?</p>
          <button
            onClick={() => deleteBook(book._id)}
            className="p-2 bg-blue-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default GenreDeletePage;
