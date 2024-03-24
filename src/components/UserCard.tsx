import React from "react";
import { NavLink } from "react-router-dom";

interface UserCardProps {
  id: number;
  username: string;
}

const UserCard: React.FC<UserCardProps> = ({ id, username }) => {
  return (
    <div className="border border-gray-300 rounded p-4 shadow-md">
      <p className="text-xl font-semibold mb-2">{username}</p>
      <div className="flex justify-between">
        <NavLink
          to={`albums/${id}`}
          className="text-indigo-500 hover:underline mr-2"
        >
          Albums
        </NavLink>
        <NavLink to={`posts/${id}`} className="text-indigo-500 hover:underline">
          Posts
        </NavLink>
      </div>
    </div>
  );
}

export default UserCard;
