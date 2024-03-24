import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserAlbums } from "../services";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import MetaTags from "../components/MetaTags/MetaTags";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const { userId } = useParams();

  useEffect(() => {
    getUserAlbums(userId);
  }, [userId]);

  const getUserAlbums = async (id) => {
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
}
