import React from "react";
import { NavLink } from "react-router-dom";

interface PostCardProps {
  title: string;
  body: string;
  userId: number;
}

const PostCard: React.FC<PostCardProps> = ({ title, body, userId }) => {
  return (
    <div className="border border-gray-300 rounded p-4 shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-white-400 text-sm">{body}</p>
      <NavLink
        to={`/posts/${userId}/comments`}
        className=" block text-center text-indigo-500 hover:underline mr-2"
      >
        Comments
      </NavLink>
    </div>
  );
}

export default PostCard;
