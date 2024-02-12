import { useFetchData } from "../hooks/useFetchData";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../hooks/useFetchData";
import GenreForm, { GenreFormData } from "../components/GenreForm";
import { Genre } from "../types";

const GenreUpdatePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, loading } = useFetchData(`/catalog/genre/${id}`) as {
    data: { genre: Genre } | null;
    loading: boolean;
  };

  const navigate = useNavigate();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (!data) {
    return <p>Data not found </p>;
  }

  const updateGenre = async (formData: GenreFormData) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/genre/${id}/update`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("genre Updated:", response.data);
      navigate("/genres");
    } catch (error) {
      console.error("Error creating genre:", error);
    }
  };

  return (
    <div>
      <h1>Update Genre</h1>
      <GenreForm onSubmit={updateGenre} initialGenre={data.genre} />
    </div>
  );
};

export default GenreUpdatePage;
