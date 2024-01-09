import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SearchMovie() {
  const API_URL = "http://localhost:3001";

  const [movie, setMovie] = useState();

  const actorsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const lastActorIndex = currentPage * actorsPerPage;
  const firstActorIndex = lastActorIndex - actorsPerPage;
  const currentActors = movie?.cast?.slice(firstActorIndex, lastActorIndex);

  const handleSearchMovie = async (searchText) => {
    try {
      const response = await fetch(
        `${API_URL}/api/movies/?searchText=${searchText}`,
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

  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5 pt-5">
      <div className="mb-2">
        <h2 className="text-center mb-4">Search for a movie</h2>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const searchText = event.target.search.value;
            handleSearchMovie(searchText);
          }}
        >
          <input type="text" name="search" />
          <Button variant="primary" type="submit" className="ms-1">
            Search
          </Button>
        </form>
      </div>

      {movie && Object.keys(movie).length > 0 ? (
        <div className="container d-flex justify-content-center">
          <Card className="mt-2 col-12 col-md-8 col-lg-6">
            <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {movie.year}
              </Card.Subtitle>
              <hr />
              <Card.Text className="font-weight-bold">Cast: </Card.Text>

              <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>
                {currentActors?.map((actor) => (
                  <li key={actor}>{actor}</li>
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
        <p>No movie found. Please try a different search.</p>
      )}
    </div>
  );
}

export default SearchMovie;
