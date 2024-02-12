import { useFetchData } from "../hooks/useFetchData";
import { Book } from "../types";

import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";
import BookInstanceForm, {
  BookInstanceFormData,
} from "../components/BookInstanceForm";
import { useNavigate } from "react-router-dom";

const CreateBookInstancePage = () => {
  const { data, loading } = useFetchData("/catalog/bookinstance/create") as {
    data: { book_list: Book[] } | null;
    loading: boolean;
  };

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Data not found!</p>;
  }

  const createBookInstance = async (formData: BookInstanceFormData) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/bookinstance/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("BookInstance created:", response.data);
      navigate("/bookinstances");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div>
      <BookInstanceForm books={data.book_list} onSubmit={createBookInstance} />
    </div>
  );
};

export default CreateBookInstancePage;
