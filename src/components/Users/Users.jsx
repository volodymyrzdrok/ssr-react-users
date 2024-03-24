import { useEffect, useState } from "react";
import { fetchUsers } from "../../services";
import UserCard from "../UserCard/UserCard";
import SearchBar from "../SearchBar/SearchBar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await fetchUsers();
      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const sortedUsers = users
    .slice()
    .sort((a, b) =>
      sortAsc
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username)
    )
    .filter((el) => el.username.toLowerCase().trim().includes(inputValue));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-center font-bold mb-4">Users</h2>
      <SearchBar setInputValue={setInputValue} inputValue={inputValue} />
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded-md mr-2"
          onClick={() => setSortAsc(true)}
        >
          Sort Asc
        </button>
        <button
          className="px-4 py-2 bg-indigo-500 text-white rounded-md"
          onClick={() => setSortAsc(false)}
        >
          Sort Desc
        </button>
      </div>
      {sortedUsers.length > 0 ? (
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {sortedUsers.map(({ id, username }) => (
            <li key={id}>
              <UserCard id={id} username={username} />
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="text-center">Users not found</h3>
      )}
    </div>
  );
}
