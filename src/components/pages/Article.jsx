import React, { useEffect } from "react";
import useEntry from "../../lib/hooks/useEntry";
import { formatDate } from "../../lib/date";
import remark from "remark";
import remark2react from "remark-react";

const Article = ({ id }) => {
  const entry = useEntry(id);

  useEffect(() => {
    if (entry !== null) {
      document.title = entry.fields.title;
    }
  }, [entry]);

  if (entry === null) {
    return <p>読み込み中</p>;
  }

  return (
    <article>
      <h1>{entry.fields.title}</h1>
      <label>{formatDate(entry.sys.createdAt)}に投稿</label>
      <div>
        {
          remark()
            .use(remark2react)
            .processSync(entry.fields.body).contents
        }
      </div>
    </article>
  );
};

export default React.memo(Article);
