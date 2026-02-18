import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        YouTube Clone
      </Link>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      <div>
        <Link to="/upload">Upload</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}

export default Navbar;
