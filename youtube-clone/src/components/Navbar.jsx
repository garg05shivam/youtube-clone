import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div className={styles.navbar}>
      <Link to="/">YouTube Clone</Link>
    </div>
  );
}

export default Navbar;
