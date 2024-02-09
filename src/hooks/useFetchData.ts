import axios from "axios";
import { useState, useEffect } from "react";

export const API_BASE_URL = "http://localhost:3000";

export function useFetchData(path: string) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${path}`);
        setData(response.data);
        setLoading(false); // Set loading to false when data arrives
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [path]);

  return { data, loading };
}
