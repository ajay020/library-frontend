import { useFetchData } from "../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import { Author, Book } from "../types";
import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";

const AuthorDeletePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/author/${id}/delete`) as {
    data: { author: Author; author_books: Book[] } | null;
    loading: boolean;
  };

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Data not found </p>;
  }

  const { author, author_books } = data;

  const deleteAuthor = async (authorid: string) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/author/${id}/delete`,
        { authorid },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Author Deleted:", response.data);
      navigate("/authors");
    } catch (error) {
      console.error("Error deleting author:", error);
    }
  };

  return (
    <div>
      <h1>Delete: {author.first_name}</h1>
      {author_books?.length > 0 && (
        <div>
          <p> Delete the books before deleting the author.</p>
          {author_books.map((book) => (
            <p key={book._id}> {book.title}</p>
          ))}
        </div>
      )}
      {author_books.length == 0 && (
        <div>
          <p>Are you sure you want to delete this author?</p>
          <button
            onClick={() => deleteAuthor(author._id)}
            className="p-2 bg-blue-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default AuthorDeletePage;
