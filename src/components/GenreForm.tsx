import axios from "axios";
import React, { useState } from "react";
import { API_BASE_URL } from "../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

const GenreForm = () => {
  const [genreName, setGenreName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/catalog/genre/create`,
        {
          name: genreName,
        },
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

    // Clear the input field after submission
    setGenreName("");
  };

  return (
    <div className="w-1/3 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Genre</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          name="genreName"
          required
          value={genreName}
          onChange={handleChange}
          placeholder="Enter genre name"
          className="border border-gray-300 rounded-md px-4 py-2 mr-4 focus:outline-none focus:border-blue-500 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default GenreForm;
