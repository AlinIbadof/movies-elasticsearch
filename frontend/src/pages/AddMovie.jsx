import { useState } from "react";
import Button from "react-bootstrap/Button";

function AddMovie() {
  const API_URL = "http://localhost:3001";
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [cast, setCast] = useState("");
  const [genres, setGenres] = useState("");
  const [success, setSuccess] = useState();

  const handleAddMovie = async () => {
    try {
      const response = await fetch(`${API_URL}/api/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          year: parseInt(year, 10),
          cast: cast.split(",").map((actor) => actor.trim()),
          genres: genres.split(",").map((genre) => genre.trim()),
        }),
      });

      const data = await response.json();
      console.log(data);

      setSuccess(true);
      // Handle success or display error message
    } catch (error) {
      console.error("Failed to add movie:", error);
      setSuccess(false);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <div className="text-center p-4">
        <h2>Add a Movie</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex gap-2 mb-3 justify-content-center align-items-center">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="form-control forminput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 mb-3 justify-content-center align-items-center">
            <label htmlFor="year" className="form-label">
              Year:
            </label>
            <input
              type="number"
              id="year"
              className="form-control forminput"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 mb-3 justify-content-center align-items-center">
            <label htmlFor="cast" className="form-label">
              Cast:
            </label>
            <input
              type="text"
              id="cast"
              className="form-control forminput"
              value={cast}
              onChange={(e) => setCast(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 mb-3 align-items-center">
            <label htmlFor="genres" className="form-label">
              Genre:
            </label>
            <input
              type="text"
              id="genres"
              className="form-control forminput"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleAddMovie}>
            Add Movie
          </Button>
        </form>
      </div>
      {success === true && (
        <p className="text-success">Movie added succesfully</p>
      )}
      {success === false && <p className="text-danger">Failed to add movie</p>}
    </div>
  );
}

export default AddMovie;
