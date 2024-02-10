import { useFetchData } from "../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import { Author, Book } from "../types";
import axios from "axios";

import { API_BASE_URL } from "../hooks/useFetchData";
import AuthorForm, { AuthorFormData } from "../components/AuthorForm";

const AuthorUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/author/${id}`) as {
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

  const updateAuthor = async (authorData: AuthorFormData) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/author/${id}/update`,
        {
          first_name: authorData.firstName,
          family_name: authorData.familyName,
          date_of_birth: authorData.dateOfBirth,
          date_of_death: authorData.dateOfDeath,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Author Updated:", response.data);

      navigate("/authors");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div>
      <h1>Update author</h1>
      <AuthorForm initialAuthor={data.author} onSubmit={updateAuthor} />
    </div>
  );
};

export default AuthorUpdatePage;
