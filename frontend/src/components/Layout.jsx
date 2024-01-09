import PropTypes from "prop-types";
import Footer from "./Footer";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main
        className="flex-grow-1 d-flex border border-primary shadow m-2"
        style={{ height: "100%" }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
