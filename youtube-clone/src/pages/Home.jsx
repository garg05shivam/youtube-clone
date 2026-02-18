import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrending } from "../data/youtube";
import { formatPublishedDate, formatViews } from "../utils/videoFormatters";
import styles from "./page.module.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [prevToken, setPrevToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function applyVideoPage(data) {
    setVideos(data.videos);
    setNextToken(data.nextPageToken ?? null);
    setPrevToken(data.prevPageToken ?? null);
  }

  async function loadVideos(token = "") {
    setIsLoading(true);
    setError("");
    try {
      const data = await getTrending(token);
      applyVideoPage(data);
    } catch (err) {
      setError(err?.message ?? "Unable to fetch videos right now.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;
    getTrending()
      .then((data) => {
        if (!isMounted) return;
        applyVideoPage(data);
        setError("");
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message ?? "Unable to fetch videos right now.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
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
      ) : (
        <div className={styles.grid}>
          {videos.map((video) => (
            <div
              key={video.id}
              className={styles.card}
              onClick={() => navigate(`/watch/${video.id}`)}
            >
              <img src={video.thumbnail} alt={video.title} />
              <h4>{video.title}</h4>
              <p>{video.channel}</p>
              <div className={styles.metaRow}>
                <span>{formatViews(video.viewCount)}</span>
                <span>{formatPublishedDate(video.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={() => loadVideos(prevToken)}
          disabled={!prevToken || isLoading}
        >
          &lt; Prev
        </button>

        <button
          className={styles.pageButton}
          onClick={() => loadVideos(nextToken)}
          disabled={!nextToken || isLoading}
        >
          Next &gt;
        </button>
      </div>
    </>
  );
}

export default Home;
