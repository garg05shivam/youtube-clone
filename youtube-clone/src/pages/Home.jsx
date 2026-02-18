import { useEffect, useState } from "react";
import { getTrendingVideos } from "../data/youtube";
import { Link } from "react-router-dom";
import styles from "./page.module.css";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTrendingVideos();
        setVideos(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    load();
  }, []);

  return (
    <div className={styles.grid}>
      {videos.map((video) => (
        <div key={video.id} className={styles.card}>
          <Link to={`/watch/${video.id}`}>
            <img
              src={video.snippet.thumbnails.high.url}
              className={styles.thumbnail}
              alt=""
            />
          </Link>
          <div className={styles.info}>
            <h4>{video.snippet.title}</h4>
            <p>{video.snippet.channelTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;
