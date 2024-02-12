import { useFetchData } from "../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import { BookInstance } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";

const BookInstanceDeletePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(
    `/catalog/bookinstance/${id}/delete`
  ) as {
    data: { bookinstance: BookInstance } | null;
    loading: boolean;
  };

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Data not found </p>;
  }

  const { bookinstance } = data;

  const deleteBookInstance = async (booinstanceid: string) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/bookinstance/${id}/delete`,
        { booinstanceid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("BookInstance Deleted:", response.data);
      navigate("/bookinstances");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div>
      <h1>Delete: {bookinstance.book.title}</h1>

      <div>
        <p>Are you sure you want to delete this bookinstace?</p>
        <button
          onClick={() => deleteBookInstance(bookinstance._id)}
          className="p-2 bg-blue-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookInstanceDeletePage;
