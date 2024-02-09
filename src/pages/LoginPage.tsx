import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../hooks/useFetchData";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;

      // Save the token to localStorage
      localStorage.setItem("token", token);

      // Redirect to the home page
      window.location.href = "/";
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login error (e.g., display error message to the user)
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 font-bold mb-2"
          >
            Username
          </label>
          <input
            required
            type="text"
            id="username"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-bold mb-2"
          >
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </form>
      <p>
        Not registered?{" "}
        <Link to="/register" className="text-blue-600">
          Register
        </Link>{" "}
      </p>
    </div>
  );
};

export default LoginPage;
