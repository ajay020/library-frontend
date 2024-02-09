import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Books from "./components/Books";
import Authors from "./components/Authors";
import Genres from "./components/Genres";
import BookDetailPage from "./pages/BookDetailPage";
import AuthorDetailPage from "./pages/AuthorDetailPage";
import GenreDetailPage from "./pages/GenreDetailPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import GenreForm from "./components/GenreForm";
import BookInstances from "./components/BookInstances";
import CreateBookPage from "./pages/CreateBookPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* book routes  */}
          <Route path="books" element={<Books />}></Route>
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="book/create" element={<CreateBookPage />} />

          {/* author routes  */}
          <Route path="authors" element={<Authors />} />
          <Route path="authors/:id" element={<AuthorDetailPage />} />

          {/* genre routes  */}
          <Route path="genres" element={<Genres />} />
          <Route path="genres/:id" element={<GenreDetailPage />} />

          {/* bookinstace routes  */}
          <Route path="bookinstances" element={<BookInstances />} />

          {/* // create catalog items  */}
          <Route path="genre/create" element={<GenreForm />} />

          {/* auth routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
