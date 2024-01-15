import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5">
      <h2 className="text-center mb-4">
        Welcome. What would you like to do today?
      </h2>

      <div className="d-flex flex-column flex-md-row justify-content-center gap-2 w-100">
        <Button variant="primary col-md-3 col-sm-12">
          <Link className="linkstyle" to="/search-movie">
            Search for a movie
          </Link>
        </Button>
        <Button variant="primary col-md-3 col-sm-12">
          <Link className="linkstyle" to="/random-movie">
            Looking for some random movies?
          </Link>
        </Button>
        <Button variant="primary col-md-3 col-sm-12">
          <Link className="linkstyle" to="/search-actor">
            Movies with specific actor
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
