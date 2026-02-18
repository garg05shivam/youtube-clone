import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchVideos } from "../data/youtube";
import styles from "./page.module.css";

function Search() {
  const { query } = useParams();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    searchVideos(query).then(setVideos);
  }, [query]);

  return (
    <div className={styles.grid}>
      {videos.map((v) => (
        <div key={v.id.videoId} className={styles.card}>
          <Link to={`/watch/${v.id.videoId}`}>
            <img src={v.snippet.thumbnails.high.url} />
          </Link>
          <h4>{v.snippet.title}</h4>
          <p>{v.snippet.channelTitle}</p>
        </div>
      ))}
    </div>
  );
}

export default Search;
