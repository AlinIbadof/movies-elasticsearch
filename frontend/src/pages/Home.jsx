import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

function Home() {
  return (
    <div className="container-fluid text-primary h-auto d-flex flex-column justify-content-center align-items-center px-5">
      <h2 className="text-center mb-4">
        Welcome. What would you like to do today?
      </h2>

      <div className="d-flex">
        <Button variant="primary" className="me-3">
          <Link className="linkstyle" to="/search-movie">
            Search for a movie
          </Link>
        </Button>
        <Button variant="primary">
          <Link className="linkstyle" to="/random-movie">
            Get random movies
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Home;
