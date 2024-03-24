import React from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes/index.ts";
import Home from "./pages/Home.tsx";
import Albums from "./pages/Albums.tsx";
import Posts from "./pages/Posts.tsx";
import NotFound from "./pages/NotFound.tsx";
import AlbumPhotos from "./pages/AlbumPhotos.tsx";
import PostComments from "./pages/PostCommets.tsx";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />

      <Route path={routes.albums}>
        <Route path={routes.albumPhotos} element={<AlbumPhotos />} />
        <Route index element={<Albums />} />
      </Route>

      <Route path={routes.posts}>
        <Route path={routes.postComments} element={<PostComments />} />
        <Route index element={<Posts />} />
      </Route>

      <Route path={routes.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default App;
