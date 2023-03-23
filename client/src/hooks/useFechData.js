import { useState } from "react";

export default function useFetchData() {
  const [data, setData] = useState([]);

  const getNotes = async (page) => {
    try {
      let fetchUrl = new URL("http://localhost:3001/notes");
      fetchUrl.searchParams.append("page", page);
      const res = await fetch(fetchUrl).then((r) => r.json());
      setData(res.data);
    } catch (e) {
      console.log("ERROR IN FETCHING NOTES", e.message);
    }
  };

  return [data, getNotes];
}
