import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserAlbums } from "../services/index.ts";
import AlbumCard from "../components/AlbumCard.tsx";
import MetaTags from "../components/MetaTags.tsx";

interface Album {
  id: number;
  title: string;
}

const Albums: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    getUserAlbums(Number(userId));
  }, [userId]);

  const getUserAlbums = async (id: number) => {
    try {
      const response = await fetchUserAlbums(id);
      setAlbums(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MetaTags
        title="User Albums - Explore Albums | users-react-test"
        description="Explore albums of this user on users-react-test. Find interesting photos and images in the albums."
      />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Albums</h2>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {albums.map(({ id, title }) => (
            <li key={id}>
              <AlbumCard id={id} title={title} userId={userId} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Albums;
