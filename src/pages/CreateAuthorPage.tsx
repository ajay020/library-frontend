import AuthorForm, { AuthorFormData } from "../components/AuthorForm";
import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

const CreateAuthorPage = () => {
  const navigate = useNavigate();

  const createAuthor = async (authorData: AuthorFormData) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      console.log({ authorData });

      const response = await axios.post(
        `${API_BASE_URL}/catalog/author/create`,
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
      console.log("Author created:", response.data);
      navigate("/authors");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  return (
    <div>
      <AuthorForm onSubmit={createAuthor} />
    </div>
  );
};

export default CreateAuthorPage;
