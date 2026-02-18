import { useParams } from "react-router-dom";

function Watch() {
  const { id } = useParams();

  return (
    <div style={{ maxWidth: "1000px", margin: "auto" }}>
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${id}`}
        title="video"
        allowFullScreen
        style={{ borderRadius: "12px" }}
      ></iframe>
    </div>
  );
}


export default Watch;
