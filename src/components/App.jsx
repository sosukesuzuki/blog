import React, { Suspense } from "react";
import { mount, route } from "navi";
import { Router, View, Link } from "react-navi";
import { createClient } from "contentful";
import ContentfulContext from "../lib/ContentfulContext";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";

const routes = mount({
  "/": route({
    title: "鈴木颯介のブログ",
    view: <ArticleList />
  }),
  "/:id": route(async req => {
    const params = req.params;
    return {
      view: <Article id={params.id} />
    };
  })
});

const App = () => {
  const client = createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  });
  return (
    <ContentfulContext.Provider value={{ client }}>
      <Router routes={routes}>
        <header>
          <Link href="/">
            <h1>鈴木颯介のブログ</h1>
          </Link>
        </header>
        <Suspense fallback={null}>
          <View />
        </Suspense>
        <footer>
          <h4>その他リンク</h4>
          <ul>
            <li>
              <a href="https://github.com/sosukesuzuki">GitHub</a>
            </li>
            <li>
              <a href="https://twitter.com/__sosukesuzuki">Twitter</a>
            </li>
          </ul>
        </footer>
      </Router>
    </ContentfulContext.Provider>
  );
};

export default App;
