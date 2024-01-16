// components/DeleteMovie.js

import { useState } from "react";
import Button from "react-bootstrap/Button";

function DeleteMovie() {
  const API_URL = "http://localhost:3001";
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [success, setSuccess] = useState();

  const handleDeleteMovieByNameAndYear = async () => {
    try {
      const response = await fetch(`${API_URL}/api/movie`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, year }),
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
        <h2>Delete Movie</h2>
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
          <Button variant="danger" onClick={handleDeleteMovieByNameAndYear}>
            Delete Movie by Name and Year
          </Button>
        </form>
      </div>
      {success === true && (
        <p className="text-success">Movie deleted succesfully</p>
      )}
      {success === false && (
        <p className="text-danger">Failed to delete movie</p>
      )}
    </div>
  );
}

export default DeleteMovie;
