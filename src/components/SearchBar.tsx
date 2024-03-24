import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface SearchBarProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ setInputValue, inputValue }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    if (query) {
      setInputValue(query);
    }
  }, []);

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = evt.target.value.toLowerCase().trim();

    setInputValue(value);
    setSearchParams({ query: value });
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Search by username..."
        className="px-3 py-2 border border-gray-700 rounded-md focus:outline-none focus:border-indigo-500 bg-gray-800 text-white mb-4"
      />
    </div>
  );
}

export default SearchBar;
