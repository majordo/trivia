import { useState, useEffect } from "react";
import axios from "axios";

export function useLeaders() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/leader-board")
      .then((resp) => {
        setData(resp.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return {
    data,
    loading,
  };
}
