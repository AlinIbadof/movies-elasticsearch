import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useParams, useNavigate } from "react-router-dom";

function SearchActor() {
  const API_URL = "http://localhost:3001";

  const { actor: urlActor } = useParams();
  const navigate = useNavigate();

  const [moviesWithActor, setMoviesWithActor] = useState([]);
  const [currentPageMap, setCurrentPageMap] = useState({});
  const actorsPerPage = 5;
  const [actorName, setActorName] = useState(urlActor ? urlActor : "");

  const MOVIES = 20;

  const handleSearchActor = async (actorName) => {
    try {
      const response = await fetch(
        `${API_URL}/api/search-actor/?actorName=${actorName}&size=${MOVIES}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);

      const initialCurrentPageMap = {};
      data.forEach((movie) => {
        initialCurrentPageMap[movie.id] = 1;
      });

      setCurrentPageMap(initialCurrentPageMap);
      setMoviesWithActor(data);
    } catch (error) {
      console.error("Failed to fetch actor search results", error);
    }
  };

  const handlePageChange = (movieId, newPage) => {
    setCurrentPageMap((prev) => ({
      ...prev,
      [movieId]: newPage,
    }));
  };

  const handleActorClick = (actor) => {
    navigate(`/search-actor/${encodeURIComponent(actor)}`);
    setActorName(actor);
  };

  useEffect(() => {
    if (urlActor) {
      handleSearchActor(urlActor);
    }
  }, [urlActor, actorName]);

  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5 pt-5">
      <div className="mb-2 text-center">
        <h2 className="mb-4">Search for a specific actor</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const searchText = event.target.search.value;
            handleSearchActor(searchText);
          }}
        >
          <input
            type="text"
            name="search"
            value={actorName}
            onChange={(e) => setActorName(e.target.value)}
          />
          <Button variant="primary" type="submit" className="ms-1 mt-1">
            Search
          </Button>
        </form>
      </div>

      {moviesWithActor.length > 0 && (
        <div style={{ overflowY: "auto", height: "50vh" }}>
          <div className="d-flex flex-wrap justify-content-center overflow-auto">
            {moviesWithActor.map((movie) => (
              <Card
                key={movie.id}
                className="m-2"
                style={{ height: "425px", width: "325px" }}
              >
                <Card.Body>
                  <Card.Title style={{ height: "50px" }}>
                    <strong>{movie.title}</strong>
                    <span className="ps-1 text-muted small">{movie.year}</span>
                  </Card.Title>
                  <hr />

                  <div style={{ height: "150px" }}>
                    <ul
                      style={{
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {movie.cast
                        ?.slice(
                          (currentPageMap[movie.id] - 1) * actorsPerPage,
                          currentPageMap[movie.id] * actorsPerPage
                        )
                        .map((actor, index) => (
                          <li key={`${movie.id}-${index}-${actor}`}>
                            {actor === actorName ? (
                              <strong>{actor}</strong>
                            ) : (
                              <a
                                href={`/${actor}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleActorClick(actor);
                                }}
                              >
                                {actor}
                              </a>
                            )}
                          </li>
                        ))}
                    </ul>

                    {movie.cast && movie.cast.length > actorsPerPage && (
                      <div className="d-flex justify-content-center">
                        <Button
                          variant="link"
                          disabled={currentPageMap[movie.id] === 1}
                          onClick={() =>
                            handlePageChange(
                              movie.id,
                              currentPageMap[movie.id] - 1
                            )
                          }
                        >
                          Previous
                        </Button>
                        <Button
                          variant="link"
                          disabled={
                            currentPageMap[movie.id] * actorsPerPage >=
                            movie.cast.length
                          }
                          onClick={() =>
                            handlePageChange(
                              movie.id,
                              currentPageMap[movie.id] + 1
                            )
                          }
                        >
                          Next
                        </Button>
                      </div>
                    )}
                  </div>

                  <hr />

                  <Card.Text>Genres:</Card.Text>

                  <ul>
                    {movie.genres?.map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchActor;
