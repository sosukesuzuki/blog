import { useContext, useEffect, useState } from "react";
import ContentfulContext from "../ContentfulContext";

export default function useEntry(id) {
  const [entry, setEntry] = useState(null);
  const { client } = useContext(ContentfulContext);

  useEffect(() => {
    client.getEntry(id).then(entry => {
      setEntry(entry);
    });
  }, []);

  return entry;
}
