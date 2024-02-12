import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useFetchData } from "../hooks/useFetchData";
import { CatalogDetail } from "../types";
import Navbar from "../components/Navbar";

const HomePage = () => {
  const { data: catalogDetails } = useFetchData("/") as {
    data: CatalogDetail | null;
    loading: boolean;
  };

  const location = useLocation();
  const currentpath = location.pathname;

  return (
    <>
      <Navbar />
      <div className="flex bg-slate-100 ">
        <div className="w-1/4 p-3 h-screen">
          <Sidebar />
        </div>
        <div className="bg-gray-100 w-3/4">
          {currentpath == "/" ? (
            <div>
              <h1>Welcome to Local Library</h1>
              <p>Total books: {catalogDetails?.book_count}</p>
              <p>Total authors: {catalogDetails?.author_count}</p>
              <p>
                Book instance available:{" "}
                {catalogDetails?.book_instance_available_count}
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
