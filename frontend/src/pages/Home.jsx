import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5">
      <h2 className="text-center mb-4">
        Welcome. What would you like to do today?
      </h2>

      <div className="row row-cols-1 row-cols-md-3 gap-4 w-100 justify-content-center">
        <Button variant="primary col">
          <Link className="linkstyle" to="/search-movie">
            Search for a movie
          </Link>
        </Button>
        <Button variant="primary col">
          <Link className="linkstyle" to="/random-movie">
            Looking for some random movies?
          </Link>
        </Button>
        <Button variant="primary col">
          <Link className="linkstyle" to="/search-actor">
            Movies with a specific actor
          </Link>
        </Button>
        <Button variant="primary col">
          <Link className="linkstyle" to="/add-movie">
            Add a movie
          </Link>
        </Button>
        <Button variant="primary col">
          <Link className="linkstyle" to="/update-movie">
            Update a movie
          </Link>
        </Button>
        <Button variant="primary col">
          <Link className="linkstyle" to="/delete-movie">
            Delete a movie
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
