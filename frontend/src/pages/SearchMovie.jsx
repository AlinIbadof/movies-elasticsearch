import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

function SearchMovie() {
  const API_URL = "http://localhost:3001";

  const navigate = useNavigate();

  const [movie, setMovie] = useState();

  const actorsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const lastActorIndex = currentPage * actorsPerPage;
  const firstActorIndex = lastActorIndex - actorsPerPage;
  const currentActors = movie?.cast?.slice(firstActorIndex, lastActorIndex);

  const handleSearchMovie = async (searchText) => {
    try {
      const response = await fetch(
        `${API_URL}/api/movie/?searchText=${searchText}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setMovie(data);
    } catch (error) {
      console.error("Failed to fetch search results", error);
    }
  };

  const handleActorClick = (actor) => {
    navigate(`/search-actor/${encodeURIComponent(actor)}`);
  };

  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5 pt-5">
      <div className="mb-2 text-center">
        <h2 className="mb-4">Search for a movie</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const searchText = event.target.search.value;
            handleSearchMovie(searchText);
          }}
        >
          <input type="text" name="search" />
          <Button variant="primary" type="submit" className="ms-1 mt-1">
            Search
          </Button>
        </form>
      </div>

      {movie && Object.keys(movie).length > 0 ? (
        <div className="container d-flex justify-content-center">
          <Card className="m-2" style={{ height: "465px", width: "325px" }}>
            <Card.Body>
              <Card.Title style={{ height: "50px" }}>
                <strong>{movie.title}</strong>
                <span className="ps-1 text-muted small">{movie.year}</span>
              </Card.Title>
              <hr />
              <Card.Text className="font-weight-bold">Cast: </Card.Text>

              <div style={{ height: "150px" }}>
                <ul
                  style={{
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {currentActors?.map((actor, index) => (
                    <li key={`${movie.id}-${index}-${actor}`}>
                      <a
                        href={`/${actor}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleActorClick(actor);
                        }}
                      >
                        {actor}
                      </a>
                    </li>
                  ))}
                </ul>

                {movie.cast && movie.cast.length > actorsPerPage && (
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="link"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="link"
                      disabled={lastActorIndex >= movie.cast.length}
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>

              <hr />

              <Card.Text>Genres:</Card.Text>

              <ul>
                {movie?.genres?.map((genre) => (
                  <li key={genre}>{genre}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </div>
      ) : (
        movie !== undefined && (
          <p>No movie found. Please try a different search.</p>
        )
      )}
    </div>
  );
}

export default SearchMovie;
