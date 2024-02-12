import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="">
      <ul>
        <li className="hover:underline">
          <Link to="books">All Books</Link>
        </li>
        <li className="hover:underline">
          <Link to="authors"> All Authors</Link>
        </li>
        <li className="hover:underline">
          <Link to="genres">All Genres</Link>
        </li>
        <li className="hover:underline">
          <Link to="bookinstances">All book instaces</Link>
        </li>
      </ul>
      <hr className="my-2" />
      <ul>
        <li className="hover:underline">
          <Link to="book/create">Create new book</Link>
        </li>
        <li className="hover:underline">
          <Link to="author/create">Create new author</Link>
        </li>
        <li className="hover:underline">
          <Link to="bookinstance/create">Create new bookInstace</Link>
        </li>
        <li className="hover:underline">
          <Link to="genre/create">Create new genre</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
