import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTrending } from "../data/youtube";
import styles from "./page.module.css";

function Home() {
  const [videos, setVideos] = useState([]);
  const [nextToken, setNextToken] = useState(null);
  const [prevToken, setPrevToken] = useState(null);
  const navigate = useNavigate();

  async function loadVideos(token = "") {
    const data = await getTrending(token);
    setVideos(data.videos);
    setNextToken(data.nextPageToken);
    setPrevToken(data.prevPageToken);
  }

  useEffect(() => {
    loadVideos();
  }, []);

  return (
    <>
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
          </div>
        ))}
      </div>

      <div style={{ textAlign: "center", margin: "20px" }}>
        {prevToken && (
          <button onClick={() => loadVideos(prevToken)}>⬅ Prev</button>
        )}

        {nextToken && (
          <button
            onClick={() => loadVideos(nextToken)}
            style={{ marginLeft: "20px" }}
          >
            Next ➡
          </button>
        )}
      </div>
    </>
  );
}

export default Home;
