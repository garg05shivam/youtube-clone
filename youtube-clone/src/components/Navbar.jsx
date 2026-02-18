import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";

const SEARCH_HISTORY_KEY = "streamnest_history";

function Navbar() {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
    } catch {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
      return [];
    }
  });
  const navigate = useNavigate();

  function persistHistory(nextHistory) {
    setHistory(nextHistory);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(nextHistory));
  }

  function saveQuery(term) {
    const trimmed = term.trim();
    if (!trimmed) return;
    const nextHistory = [trimmed, ...history.filter((item) => item !== trimmed)].slice(0, 5);
    persistHistory(nextHistory);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      saveQuery(query);
      navigate(`/search/${query.trim()}`);
    }
  };

  function handleHistoryClick(term) {
    setQuery(term);
    navigate(`/search/${term}`);
  }

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        StreamNest
      </Link>

      <div className={styles.searchArea}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search videos, creators, topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button type="button" className={styles.clearButton} onClick={() => setQuery("")}>
              Clear
            </button>
          )}
          <button type="submit">Search</button>
        </form>

        {history.length > 0 && (
          <div className={styles.historyRow}>
            {history.map((item) => (
              <button
                key={item}
                type="button"
                className={styles.historyChip}
                onClick={() => handleHistoryClick(item)}
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              className={styles.historyReset}
              onClick={() => persistHistory([])}
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      <nav className={styles.actions}>
        <NavLink to="/upload" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
          Upload
        </NavLink>
        <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
          Profile
        </NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
