import { useEffect, useState } from "react";
import { getTrending } from "../data/youtube";
import { Link } from "react-router-dom";
import styles from "./page.module.css";

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getTrending().then(setVideos);
  }, []);

  return (
    <div className={styles.grid}>
      {videos.map((v) => (
        <div key={v.id} className={styles.card}>
          <Link to={`/watch/${v.id}`}>
            <img src={v.snippet.thumbnails.high.url} />
          </Link>
          <h4>{v.snippet.title}</h4>
          <p>{v.snippet.channelTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default Home;
