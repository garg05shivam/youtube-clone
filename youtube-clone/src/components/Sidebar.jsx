import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <p className={styles.title}>Discover</p>
      <NavLink to="/" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
        Home
      </NavLink>
      <NavLink to="/upload" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
        Upload
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => (isActive ? styles.activeLink : "")}>
        Profile
      </NavLink>
    </aside>
  );
}

export default Sidebar;
