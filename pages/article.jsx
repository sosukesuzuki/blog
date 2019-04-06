import React from "react";
import Head from "next/head";
import { formatDate } from "../lib/date";
import remark from "remark";
import remark2react from "remark-react";
import createClient from "../lib/createClient";
import Layout from "../components/layout";

const Article = ({ entry }) => {
  return (
    <Layout>
      <Head>
        <title>{entry.fields.title}</title>
      </Head>
      <article>
        <label>
          投稿日: {formatDate(entry.sys.createdAt)} 更新日:{" "}
          {formatDate(entry.sys.updatedAt)}
        </label>
        <h1>{entry.fields.title}</h1>
        <div>
          {
            remark()
              .use(remark2react)
              .processSync(entry.fields.body).contents
          }
        </div>
      </article>
    </Layout>
  );
};

Article.getInitialProps = async ({ query: { id } }) => {
  const client = createClient();
  const entry = await client.getEntry(id);

  return { entry };
};

export default Article;