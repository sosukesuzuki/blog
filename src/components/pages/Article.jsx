import React, { useEffect } from "react";
import "github-markdown-css";
import "highlight.js/styles/github.css";
import useEntry from "../../lib/hooks/useEntry";
import { formatDate } from "../../lib/date";
import remark from "remark";
import html from "remark-html";
import highlight from "remark-highlight.js";

const markdownProcessor = remark()
  .use(html)
  .use(highlight);

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
      <label>
        投稿日: {formatDate(entry.sys.createdAt)} 更新日:{" "}
        {formatDate(entry.sys.updatedAt)}
      </label>
      <h1>{entry.fields.title}</h1>
      <div
        className="markdown-body"
        dangerouslySetInnerHTML={{
          __html: markdownProcessor.processSync(entry.fields.body).toString()
        }}
      />
    </article>
  );
};

export default React.memo(Article);
