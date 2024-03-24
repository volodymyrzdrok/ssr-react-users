import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

interface AlbumCardProps {
  userId: number;
  id: number;
  title: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ userId, id, title }) => {
  const { pathname } = useLocation();

  return (
    <div className="border border-gray-300 rounded p-4 shadow-md">
      <p className="text-xl font-semibold mb-2">{title}</p>
      <NavLink
        to={`/albums/${userId}/photos`}
        className="text-indigo-500 hover:underline mr-2"
      >
        View photos
      </NavLink>
    </div>
  );
}

export default AlbumCard;
