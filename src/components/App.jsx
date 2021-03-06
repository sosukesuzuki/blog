import React, { Suspense } from "react";
import { mount, route } from "navi";
import { Router, View, Link } from "react-navi";
import styled, { createGlobalStyle } from "styled-components";
import { createClient } from "contentful";
import ContentfulContext from "../lib/ContentfulContext";
import ArticleList from "./pages/ArticleList";
import Article from "./pages/Article";
import { black, blue, border } from "../lib/colors";

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

const GlobalStyle = createGlobalStyle`
  body {
    color: ${black};
    font-family: 'Noto Sans JP', sans-serif;
    a {
      color: ${blue};
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Header = styled.header`
  display: flex;
  padding: 20px 0;
  height: 30px;
  width: 100%;
  background-color: #3d3d3d;
  border-bottom: 1px solid ${border};
  div {
    max-width: 800px;
    width: 800px;
    margin: 0 auto;
    display: flex;
    img {
      margin-right: 10px;
      border-radius: 50%;
    }
    h1 {
      margin: 0;
      line-height: 30px;
      font-size: 28px;
    }
    a {
      color: white;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 30px 10px;
`;

const App = () => {
  const client = createClient({
    space: process.env.CTF_SPACE_ID,
    accessToken: process.env.CTF_CDA_ACCESS_TOKEN
  });
  return (
    <>
      <GlobalStyle />
      <ContentfulContext.Provider value={{ client }}>
        <Router routes={routes}>
          <Header>
            <div>
              <img src="./logo.jpg" width="30px" height="30px" />
              <Link href="/">
                <h1>鈴木颯介のブログ</h1>
              </Link>
            </div>
          </Header>
          <Main>
            <Suspense fallback={null}>
              <View />
            </Suspense>
          </Main>
        </Router>
      </ContentfulContext.Provider>
    </>
  );
};

export default App;
