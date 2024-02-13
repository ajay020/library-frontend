import { Outlet, useLocation } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { useFetchData } from "../hooks/useFetchData";
import { CatalogDetail } from "../types";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";

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
      <div className="flex  ">
        <div className="bg-gray-100 w-1/4 p-3 h-screen">
          <Sidebar />
        </div>
        <div className=" w-3/4 p-8">
          {currentpath == "/" ? (
            <div className="flex flex-col gap-4">
              <Heading level={1}>Welcome to Local Library</Heading>
              <p>The Library has the following record counts:</p>
              <ul className="list-disc pl-4">
                <li>Books: {catalogDetails?.book_count}</li>
                <li>Copies: {catalogDetails?.book_instance_count}</li>
                <li>Authors: {catalogDetails?.author_count}</li>
                <li>
                  Copies Available:{" "}
                  {catalogDetails?.book_instance_available_count}
                </li>
                <li>Genres: {catalogDetails?.genre_count}</li>
              </ul>
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
