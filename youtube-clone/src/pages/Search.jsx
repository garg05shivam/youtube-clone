import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchVideos } from "../data/youtube";
import { formatPublishedDate } from "../utils/videoFormatters";
import styles from "./page.module.css";

function Search() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [prevToken, setPrevToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadSearch(token = "") {
    setIsLoading(true);
    setError("");
    try {
      const data = await searchVideos(query, token);
      setVideos(data.videos);
      setNextToken(data.nextPageToken ?? null);
      setPrevToken(data.prevPageToken ?? null);
    } catch (err) {
      setError(err?.message ?? "Unable to fetch search results.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;
    Promise.resolve()
      .then(() => {
        if (isMounted) {
          setIsLoading(true);
          setError("");
        }
        return searchVideos(query);
      })
      .then((data) => {
        if (!isMounted) return;
        setVideos(data.videos);
        setNextToken(data.nextPageToken ?? null);
        setPrevToken(data.prevPageToken ?? null);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message ?? "Unable to fetch search results.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <>
      <h2 className={styles.pageHeading}>Results for "{query}"</h2>
      {error && <p className={styles.errorBanner}>{error}</p>}

      {isLoading ? (
        <div className={styles.grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className={`${styles.card} ${styles.skeletonCard}`}>
              <div className={styles.skeletonThumb} />
              <div className={styles.skeletonLine} />
              <div className={`${styles.skeletonLine} ${styles.shortLine}`} />
            </div>
          ))}
        </div>
      ) : videos.length === 0 ? (
        <p className={styles.emptyState}>No results found. Try a different keyword.</p>
      ) : (
        <div className={styles.grid}>
          {videos.map((video) => (
            <div key={video.id} className={styles.card}>
              <Link to={`/watch/${video.id}`}>
                <img src={video.thumbnail} alt={video.title} />
              </Link>
              <h4>{video.title}</h4>
              <p>{video.channel}</p>
              <div className={styles.metaRow}>
                <span>Search result</span>
                <span>{formatPublishedDate(video.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => loadSearch(prevToken)}
          disabled={!prevToken || isLoading}
        >
          &lt; Prev
        </button>
        <button
          className={styles.pageButton}
          onClick={() => loadSearch(nextToken)}
          disabled={!nextToken || isLoading}
        >
          Next &gt;
        </button>
      </div>
    </>
  );
}

export default Search;
