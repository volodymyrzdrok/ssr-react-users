import React from "react";
import MetaTags from "../components/MetaTags.tsx";
import Users from "../components/Users.tsx";

const Home: React.FC = () => {
  return (
    <>
      <MetaTags
        title="User List, Posts, and Albums "
        description="Discover a variety of users, posts, and albums. Search by username, sort content, and share links easily. "
      />

      <Users />
    </>
  );
}

export default Home;
