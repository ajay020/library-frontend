import React, { useState } from "react";
import { Book, BookInstance } from "../types";

export interface BookInstanceFormData {
  book: string;
  imprint: string;
  due_back: string;
  status: string;
}

interface BookInstanceFormProps {
  initialData?: BookInstance;
  books: Book[];
  selected_book_id?: string;
  onSubmit: (formData: BookInstanceFormData) => void;
}

const BookInstanceForm: React.FC<BookInstanceFormProps> = ({
  initialData,
  books,
  selected_book_id,
  onSubmit,
}) => {
  const [book, setBook] = useState(selected_book_id || "");
  const [imprint, setImprint] = useState(initialData?.imprint || "");
  const [dueBack, setDueBack] = useState(
    initialData?.due_back.split("T")[0] || ""
  );
  const [status, setStatus] = useState(initialData?.status || "");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      book: book,
      imprint,
      due_back: dueBack,
      status,
    };
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="book">Book:</label>
        <select
          id="book"
          name="book"
          value={book}
          onChange={(e) => setBook(e.target.value)}
        >
          <option value="">--Select a book--</option>
          {books?.map((book) => {
            if (book._id === selected_book_id) {
              return (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              );
            } else {
              return (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              );
            }
          })}
        </select>
      </div>
      <div>
        <label htmlFor="imprint">Imprint:</label>
        <input
          type="text"
          id="imprint"
          name="imprint"
          value={imprint}
          onChange={(e) => setImprint(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="dueBack">Due Back:</label>
        <input
          type="date"
          id="dueBack"
          name="dueBack"
          value={dueBack}
          onChange={(e) => setDueBack(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1"
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">--Please select status--</option>
          {["Maintenance", "Available", "Loaned", "Reserved"].map((val) => {
            if (val !== status) {
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            } else {
              return (
                <option key={val} value={val}>
                  {val}
                </option>
              );
            }
          })}
        </select>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default BookInstanceForm;
