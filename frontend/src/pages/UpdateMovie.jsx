import { useState } from "react";
import Button from "react-bootstrap/Button";

function UpdateMovie() {
  const API_URL = "http://localhost:3001";
  const [title, setTitle] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [year, setYear] = useState("");
  const [cast, setCast] = useState("");
  const [genres, setGenres] = useState("");
  const [success, setSuccess] = useState();

  const handleUpdateMovie = async () => {
    try {
      const response = await fetch(`${API_URL}/api/movie`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          newTitle,
          year,
          cast: cast.split(",").map((actor) => actor.trim()),
          genres: genres.split(",").map((genre) => genre.trim()),
        }),
      });

      const data = await response.json();
      console.log(data);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to delete movie:", error);
      setSuccess(false);
    }
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center">
      <div className="text-center p-4">
        <h2 className="text-center mb-4">Update a Movie</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="d-flex gap-2 mb-3 justify-content-center align-items-center">
            <label htmlFor="currentTitle" className="form-label w-50">
              Current Title:
            </label>
            <input
              type="text"
              id="currentTitle"
              className="form-control forminput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 mb-3 justify-content-center align-items-center">
            <label htmlFor="newTitle" className="form-label w-50">
              New Title (optional):
            </label>
            <input
              type="text"
              id="newTitle"
              className="form-control forminput"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2 mb-3 justify-content-center align-items-center">
            <label htmlFor="year" className="form-label w-50">
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
            <label htmlFor="cast" className="form-label w-50">
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
          <div className="d-flex gap-2 mb-3 justify-content-center align-items-center">
            <label htmlFor="genres" className="form-label w-50">
              Genres:
            </label>
            <input
              type="text"
              id="genres"
              className="form-control forminput"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
            />
          </div>
          <Button variant="primary" onClick={handleUpdateMovie}>
            Update Movie
          </Button>
        </form>
      </div>
      {success === true && (
        <p className="text-success">Movie updated succesfully</p>
      )}
      {success === false && (
        <p className="text-danger">Failed to update movie</p>
      )}
    </div>
  );
}

export default UpdateMovie;
