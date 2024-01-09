import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function RandomMovie() {
  const API_URL = "http://localhost:3001";

  const [randomMovies, setRandomMovies] = useState([]);
  const [currentPageMap, setCurrentPageMap] = useState({});
  const actorsPerPage = 5;

  const handleGetRandomMovies = async () => {
    try {
      const response = await fetch(`${API_URL}/api/movies/random-movies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);

      // Initialize currentPage for each movie to 1
      const initialCurrentPageMap = {};
      data.forEach((movie) => {
        initialCurrentPageMap[movie.id] = 1;
      });

      setCurrentPageMap(initialCurrentPageMap);
      setRandomMovies(data);
    } catch (error) {
      console.error("Failed to fetch random movies", error);
    }
  };

  const handlePageChange = (movieId, newPage) => {
    setCurrentPageMap((prev) => ({
      ...prev,
      [movieId]: newPage,
    }));
  };

  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5 mt-2">
      <h2 className="text-center mb-4">Random movie generator</h2>
      <Button
        variant="primary"
        onClick={handleGetRandomMovies}
        className="mb-3"
      >
        Get Random Movies
      </Button>

      {randomMovies.length > 0 && (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
          {randomMovies.map((movie) => (
            <div key={movie.id} className="col mb-4">
              <Card className="h-100 w-100">
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {movie.year}
                  </Card.Subtitle>
                  <hr />
                  <Card.Text className="font-weight-bold">Cast: </Card.Text>

                  <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                    {movie.cast
                      ?.slice(
                        (currentPageMap[movie.id] - 1) * actorsPerPage,
                        currentPageMap[movie.id] * actorsPerPage
                      )
                      .map((actor) => (
                        <li key={actor}>{actor}</li>
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

                  <hr />
                  <Card.Text>Genres:</Card.Text>

                  <ul>
                    {movie.genres?.map((genre) => (
                      <li key={genre}>{genre}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RandomMovie;
