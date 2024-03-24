import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAlbumPhotos } from "../services/index.ts";
import MetaTags from "../components/MetaTags.tsx";

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

const AlbumPhotos: React.FC = () => {
  const [album, setAlbum] = useState<Photo[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    getAlbumPhotos(Number(userId));
  }, [userId]);

  const getAlbumPhotos = async (id: number) => {
    try {
      const response = await fetchAlbumPhotos(id);
      setAlbum(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MetaTags
        title="Album Photos - Explore Photos | users-react-test"
        description="Explore photos of this album on users-react-test. Discover beautiful images and snapshots in the album."
      />

      <div className="container mx-auto p-4">
        <h2 className="text-center font-bold mb-4">Photos</h2>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {album.map(({ id, title, thumbnailUrl }) => (
            <li
              key={id}
              className="border border-gray-300 rounded p-4 shadow-md"
            >
              <img
                src={thumbnailUrl}
                alt={title}
                className="w-full h-auto"
              />
              <p className="text-lg font-semibold mt-2">{title}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default AlbumPhotos;
