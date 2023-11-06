import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchResult from "./components/SearchResult";

function App() {
  const [results, setResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/search/${query}`);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };
  return (
    <>
      <h1>React App</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResult results={results} />
    </>
  );
}

export default App;
