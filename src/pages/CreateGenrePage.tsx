import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import GenreForm, { GenreFormData } from "../components/GenreForm";
import { useState } from "react";

const CreateGenrePage = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const createGenre = async (genreData: GenreFormData) => {
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/catalog/genre/create`,
        genreData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Genre added successfully:", response.data);
      navigate("/genres");
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      {loading && <p>Creating genre...</p>}
      <GenreForm onSubmit={createGenre} />
    </div>
  );
};

export default CreateGenrePage;
