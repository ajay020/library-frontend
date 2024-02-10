import { useState } from "react";
import { Author } from "../types";

export interface AuthorFormData {
  firstName: string;
  familyName: string;
  dateOfBirth: string;
  dateOfDeath?: string;
}

interface AuthorFormProps {
  initialAuthor?: Author;
  onSubmit: (formData: AuthorFormData) => void;
}

const AuthorForm: React.FC<AuthorFormProps> = ({ onSubmit, initialAuthor }) => {
  const [formData, setFormData] = useState<AuthorFormData>({
    firstName: initialAuthor?.first_name || "",
    familyName: initialAuthor?.family_name || "",
    dateOfBirth: initialAuthor?.date_of_birth?.split("T")[0] || "",
    dateOfDeath: initialAuthor?.date_of_death?.split("T")[0] || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Author Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="block mb-1">
            First Name
          </label>
          <input
            type="text"
            required
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="border-gray-300 border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="familyName" className="block mb-1">
            Family Name
          </label>
          <input
            type="text"
            id="familyName"
            required
            name="familyName"
            value={formData.familyName}
            onChange={handleChange}
            className="border-gray-300 border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="dateOfBirth" className="block mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            required
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="border-gray-300 border rounded px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="dateOfDeath" className="block mb-1">
            Date of Death (Optional)
          </label>
          <input
            type="date"
            id="dateOfDeath"
            name="dateOfDeath"
            value={formData.dateOfDeath}
            onChange={handleChange}
            className="border-gray-300 border rounded px-3 py-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AuthorForm;
