import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrending } from "../data/youtube";
import { formatPublishedDate, formatViews } from "../utils/videoFormatters";
import styles from "./watch.module.css";

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recommended, setRecommended] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    Promise.resolve()
      .then(() => {
        if (isMounted) {
          setIsLoading(true);
          setError("");
        }
        return getTrending();
      })
      .then((data) => {
        if (!isMounted) return;
        if (data && Array.isArray(data.videos)) {
          setRecommended(data.videos);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err?.message ?? "Unable to load recommendations.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  return (
    <div className={styles.container}>
      <div className={styles.videoSection}>
        <iframe
          className={styles.videoFrame}
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video"
          allowFullScreen
        />
      </div>

      <div className={styles.suggestionSection}>
        <p className={styles.suggestionTitle}>Up Next</p>
        {error && <p className={styles.inlineError}>{error}</p>}
        {isLoading ? (
          <div className={styles.skeletonStack}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.suggestionSkeleton} />
            ))}
          </div>
        ) : (
          recommended.map((video) => (
            <div
              key={video.id}
              className={styles.suggestionCard}
              onClick={() => navigate(`/watch/${video.id}`)}
            >
              <img src={video.thumbnail} alt={video.title} />
              <div className={styles.suggestionMeta}>
                <h4>{video.title}</h4>
                <p>{video.channel}</p>
                <div className={styles.suggestionStats}>
                  <span>{formatViews(video.viewCount)}</span>
                  <span>{formatPublishedDate(video.publishedAt)}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Watch;
