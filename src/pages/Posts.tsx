import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserPosts } from "../services/index.ts";
import PostCard from "../components/PostCard.tsx";
import MetaTags from "../components/MetaTags.tsx";

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    getUserPosts(userId);
  }, [userId]);

  const getUserPosts = async (id: string) => {
    try {
      const response = await fetchUserPosts(id);
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MetaTags
        title="User Posts - Explore Posts | users-react-test"
        description="Explore posts by this user on users-react-test. Read interesting stories, thoughts, and experiences shared by the user."
      />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map(({ id, title, body, userId }) => (
            <PostCard
              key={id}
              id={id}
              title={title}
              body={body}
              userId={userId}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Post;
