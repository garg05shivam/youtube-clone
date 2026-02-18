import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTrending } from "../data/youtube";
import styles from "./Watch.module.css";

function Watch() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    async function loadVideos() {
      const data = await getTrending();

      // IMPORTANT: getTrending now returns { videos, nextPageToken }
      if (data && Array.isArray(data.videos)) {
        setRecommended(data.videos);
      }
    }

    loadVideos();
  }, []);

  return (
    <div className={styles.container}>

      {/* LEFT VIDEO */}
      <div className={styles.videoSection}>
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video"
          allowFullScreen
        ></iframe>
      </div>

      {/* RIGHT SUGGESTIONS */}
      <div className={styles.suggestionSection}>
        {recommended.map((video) => (
          <div
            key={video.id}
            className={styles.suggestionCard}
            onClick={() => navigate(`/watch/${video.id}`)}
          >
            <img src={video.thumbnail} alt={video.title} />
            <div>
              <h4>{video.title}</h4>
              <p>{video.channel}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Watch;
