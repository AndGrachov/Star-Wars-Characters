import { useEffect, useState } from "react";
import "./App.css";
import { getCharacters } from "./api/api";
import { Person } from "./types/person";
import { CharactersList } from "./components/CharacterList/CharactersList";
import { ErrorMessage } from "./components/ErrorMessage/ErrorMessage";
import { Header } from "./components/Header/Header";

function App() {
  // State variables to manage character data, loading status, error handling, and pagination
  const [characters, setCharacters] = useState<Person[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Scroll handler to detect when the user has scrolled near the bottom of the page
  const scrollHandler = (event: Event) => {
    const target = event.target as Document;
    const { documentElement } = target;

    // Check if the user has scrolled near the bottom and if more characters are available to load
    if (
      documentElement.scrollHeight -
        (documentElement.scrollTop + window.innerHeight) <
        100 &&
      characters.length < totalCount
    ) {
      // Set loading to true to fetch more characters
      setLoading(true);
    }
  };

  // Effect to add and clean up scroll event listener
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  });

  // Effect to fetch characters when loading is true
  useEffect(() => {
    if (loading) {
      getCharacters(page)
        .then((dataFromServer) => {
          setCharacters((prevCharacters) => [
            ...prevCharacters,
            ...dataFromServer.results,
          ]);
          setTotalCount(dataFromServer.count);
          setPage((prevPage) => prevPage + 1);
        })
        .catch(() => setHasError(true))
        .finally(() => setLoading(false));
    }
  }, [page, loading]);

  return (
    <div className="App">
      <Header />
      {hasError ? (  // Check if there is an error state
        // If there is an error, render the ErrorMessage component
        <ErrorMessage setHasError={setHasError} setLoading={setLoading} />
      ) : (
        // If there is no error, render the CharactersList component
        <CharactersList characters={characters} loading={loading} />
      )}
    </div>
  );
}

export default App;
