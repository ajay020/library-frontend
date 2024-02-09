import React, { useState } from "react";
import { Author, Book, Genre } from "../types";
import { useNavigate } from "react-router-dom";

export interface BookFormData {
  title: string;
  author: string;
  summary: string;
  isbn: string;
  genre: string[];
}

interface BookFormProps {
  authors: Author[];
  genres: Genre[];
  initialBook?: Book;
  onSubmit: (formData: BookFormData) => void;
}

const BookForm: React.FC<BookFormProps> = ({
  authors,
  genres,
  initialBook,
  onSubmit,
}) => {
  const [title, setTitle] = useState(initialBook?.title || "");
  const [author, setAuthor] = useState("");
  const [summary, setSummary] = useState(initialBook?.summary || "");
  const [isbn, setIsbn] = useState(initialBook?.isbn || "");

  const generIds: string[] = [];
  if (initialBook) {
    initialBook.genre.forEach((g) => {
      const id: string = g._id;
      generIds.push(id);
    });
  }

  const [selectedGenres, setSelectedGenres] = useState<string[]>([...generIds]);

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

    onSubmit(formData);

    navigate("/books");
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
