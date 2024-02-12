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
import BookInstances from "./components/BookInstances";
import CreateBookPage from "./pages/CreateBookPage";
import BookUpdatePage from "./pages/BookUpdatePage";
import BookDeletePage from "./pages/BookDeletePage";
import CreateAuthorPage from "./pages/CreateAuthorPage";
import AuthorUpdatePage from "./pages/AuhtorUpdatePage";
import AuthorDeletePage from "./pages/AuthorDeletePage";
import CreateGenrePage from "./pages/CreateGenrePage";
import GenreUpdatePage from "./pages/GenreUpdatePage";
import GenreDeletePage from "./pages/GenreDeletePage";
import BookInstanceDetailPage from "./pages/BookInstanceDetailPage";
import BookInstanceUpdatePage from "./pages/BookInstanceUpdatePage";
import CreateBookInstancePage from "./pages/CreateBookInstancePage";
import BookInstanceDeletePage from "./pages/BookInstanceDeletePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}>
          {/* book routes  */}
          <Route path="books" element={<Books />}></Route>
          <Route path="books/:id" element={<BookDetailPage />} />
          <Route path="book/create" element={<CreateBookPage />} />
          <Route path="book/update/:id" element={<BookUpdatePage />} />
          <Route path="book/delete/:id" element={<BookDeletePage />} />

          {/* author routes  */}
          <Route path="authors" element={<Authors />} />
          <Route path="authors/:id" element={<AuthorDetailPage />} />
          <Route path="author/create" element={<CreateAuthorPage />} />
          <Route path="author/update/:id" element={<AuthorUpdatePage />} />
          <Route path="author/delete/:id" element={<AuthorDeletePage />} />

          {/* genre routes  */}
          <Route path="genres" element={<Genres />} />
          <Route path="genres/:id" element={<GenreDetailPage />} />
          <Route path="genre/create" element={<CreateGenrePage />} />
          <Route path="genre/update/:id" element={<GenreUpdatePage />} />
          <Route path="genre/delete/:id" element={<GenreDeletePage />} />

          {/* bookinstace routes  */}
          <Route path="bookinstances" element={<BookInstances />} />
          <Route path="bookinstance/:id" element={<BookInstanceDetailPage />} />
          <Route
            path="bookinstance/create"
            element={<CreateBookInstancePage />}
          />
          <Route
            path="bookinstance/update/:id"
            element={<BookInstanceUpdatePage />}
          />
          <Route
            path="bookinstance/delete/:id"
            element={<BookInstanceDeletePage />}
          />

          {/* auth routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
