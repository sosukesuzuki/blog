import React, { useMemo } from "react";
import { Link } from "react-navi";
import useEntries from "../../lib/hooks/useEntries";
import { formatDate } from "../../../lib/date";

const ArticleList = () => {
  const entries = useEntries();
  const items = useMemo(() => {
    if (entries === null) return null;
    return entries.items;
  }, [entries]);

  if (items === null) {
    return <p>読み込み中</p>;
  }

  return (
    <>
      <p>
        <a href="https://sosukesuzuki.github.io">鈴木颯介</a>
        のブログです。主にJavaScript周りの技術について投稿します。
      </p>
      <ul>
        {items.map(item => (
          <li key={item.sys.id}>
            <span>{formatDate(item.sys.createdAt)}: </span>
            <Link href={`/${item.sys.id}`}>{item.fields.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ArticleList;
