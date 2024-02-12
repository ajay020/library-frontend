import React, { useState } from "react";
import { Genre } from "../types";

export interface GenreFormData {
  name: string;
}

interface GenreFormProps {
  initialGenre?: Genre;
  onSubmit: (data: GenreFormData) => void;
}

const GenreForm: React.FC<GenreFormProps> = ({ initialGenre, onSubmit }) => {
  const [genreName, setGenreName] = useState(initialGenre?.name || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGenreName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ name: genreName });
  };

  return (
    <div className="w-1/3 mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Add Genre</h2>

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
          "Submit"
        </button>
      </form>
    </div>
  );
};

export default GenreForm;
