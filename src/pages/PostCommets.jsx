import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostComments } from "../services";
import MetaTags from "../components/MetaTags/MetaTags";

export default function PostComments() {
  const [comments, setComments] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getPostComments(userId);
  }, [userId]);

  const getPostComments = async (id) => {
    try {
      const response = await fetchPostComments(id);
      setComments(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MetaTags
        title="Post Comments - Read Comments | users-react-test"
        description="Read comments on this post on users-react-test. Explore thoughts, opinions, and discussions shared by others. Join the conversation today!"
      />
      <div className="container mx-auto p-4">
        <h2 className="text-center font-bold mb-4">Comments</h2>
        <ul className="">
          {comments.map(({ body, email, id, name, postId }) => (
            <li
              key={id}
              className="border-b border-gray-300  p-4 mb-4 shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">{name}</h3>
              <p className="text-white-700 text-sm mb-2">
                {email.toLowerCase()}
              </p>
              <p className="text-white-200 text-sm">{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
