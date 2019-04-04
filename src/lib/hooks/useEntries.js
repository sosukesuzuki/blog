import { useContext, useEffect, useState } from "react";
import ContentfulContext from "../ContentfulContext";

export default function useEntries() {
  const [entries, setEntries] = useState(null);
  const { client } = useContext(ContentfulContext);

  useEffect(() => {
    client.getEntries().then(entries => {
      setEntries(entries);
    });
  }, []);

  return entries;
}
