import Home from "./pages/Home";
import RandomMovie from "./pages/RandomMovie";
import SearchMovie from "./pages/SearchMovie";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/random-movie" element={<RandomMovie />} />
            <Route path="/search-movie" element={<SearchMovie />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
