import React from "react";
import Link from "next/link";
import createClient from "../lib/createClient";
import Layout from "../components/layout";
import { formatDate } from "../lib/date";

const Home = ({ items }) => {
  return (
    <Layout>
      <p>
        <a href="https://sosukesuzuki.github.io">鈴木颯介</a>
        のブログです。主にJavaScript周りの技術について投稿します。
      </p>
      <ul>
        {items.map(item => (
          <li key={item.sys.id}>
            <span>{formatDate(item.sys.createdAt)}: </span>
            <Link href={`/article?id=${item.sys.id}`} as={`/${item.sys.id}`}>
              <a>{item.fields.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

Home.getInitialProps = async () => {
  const client = createClient();
  const entries = await client.getEntries();
  const { items } = entries;

  return { items };
};

export default Home;
