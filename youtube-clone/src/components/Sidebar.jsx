import { Link } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Link to="/">Home</Link>
      <Link to="/upload">Upload</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Sidebar;
