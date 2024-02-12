import { useFetchData } from "../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import { Book, BookInstance } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";
import BookInstanceForm, {
  BookInstanceFormData,
} from "../components/BookInstanceForm";

const BookInstanceUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, loading } = useFetchData(
    `/catalog/bookinstance/${id}/update`
  ) as {
    data: {
      book_list: Book[];
      selected_book: string;
      bookinstance: BookInstance;
    } | null;
    loading: boolean;
  };

  if (!data) {
    return <p>Data not found </p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  const { book_list, selected_book: selected_book_id, bookinstance } = data;

  const updateBookInstace = async (formData: BookInstanceFormData) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/bookinstance/${id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book Updated:", response.data);
      navigate("/bookinstances");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div>
      <h1>Update Bookinstace</h1>
      <BookInstanceForm
        books={book_list}
        initialData={bookinstance}
        selected_book_id={selected_book_id}
        onSubmit={updateBookInstace}
      />
    </div>
  );
};

export default BookInstanceUpdatePage;
