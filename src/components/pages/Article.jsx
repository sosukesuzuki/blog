import React, { useEffect } from "react";
import useEntry from "../../lib/hooks/useEntry";
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
      <h1>
        {entry.fields.title}({entry.sys.createdAt})
      </h1>
      <div>
        {
          remark()
            .use(remark2react)
            .processSync(entry.fields.body).contents
        }
      </div>
      <p>最終更新日: {entry.sys.updatedAt}</p>
    </article>
  );
};

export default React.memo(Article);
