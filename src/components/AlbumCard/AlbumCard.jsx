import React from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

export default function AlbumCard({ userId, id, title }) {
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
