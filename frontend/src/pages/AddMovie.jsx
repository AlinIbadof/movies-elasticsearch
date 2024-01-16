import { useState } from "react";
import Button from "react-bootstrap/Button";

function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [cast, setCast] = useState("");
  const [genres, setGenres] = useState("");

  const handleAddMovie = async () => {
    try {
      const response = await fetch("http://localhost:3001/api", {
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

      // Handle success or display error message
    } catch (error) {
      console.error("Failed to add movie:", error);
    }
  };

  return (
    <div className="">
      <h2>Add a Movie</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Year:
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </label>
        <br />
        <label>
          Cast:
          <input
            type="text"
            value={cast}
            onChange={(e) => setCast(e.target.value)}
          />
        </label>
        <br />
        <label>
          Genres:
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
        </label>
        <br />
        <Button variant="primary" onClick={handleAddMovie}>
          Add Movie
        </Button>
      </form>
    </div>
  );
}

export default AddMovie;
