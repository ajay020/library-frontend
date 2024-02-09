import React, { useState } from "react";
import axios from "axios";
import { Author, Genre } from "../types";
import { API_BASE_URL } from "../hooks/useFetchData";
import { useNavigate } from "react-router-dom";

interface BookFormProps {
  authors: Author[];
  genres: Genre[];
}

const BookForm: React.FC<BookFormProps> = ({ authors, genres }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState("");
  const [isbn, setIsbn] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      title,
      author,
      summary,
      isbn,
      genre: selectedGenres,
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage

      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axios.post(
        `${API_BASE_URL}/catalog/book/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Book created:", response.data);

      navigate("/books");
    } catch (error) {
      console.error("Error creating book:", error);
      // Handle error here
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block mb-1">
          Author
        </label>
        <select
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        >
          <option value="">Select an author</option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.first_name} {author.family_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="summary" className="block mb-1">
          Summary
        </label>
        <textarea
          id="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="isbn" className="block mb-1">
          ISBN
        </label>
        <input
          type="text"
          id="isbn"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className="border rounded px-3 py-2 w-full"
          required
        />
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <label className="block mb-2">Genre</label>
        {genres.map((genre) => (
          <div key={genre._id} className="mb-2">
            <input
              type="checkbox"
              id={genre._id}
              checked={selectedGenres.includes(genre._id)}
              onChange={(e) => {
                const isChecked = e.target.checked;
                setSelectedGenres((prevGenres) =>
                  isChecked
                    ? [...prevGenres, genre._id]
                    : prevGenres.filter((id) => id !== genre._id)
                );
              }}
            />
            <label htmlFor={genre._id} className="ml-2">
              {genre.name}
            </label>
          </div>
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default BookForm;
