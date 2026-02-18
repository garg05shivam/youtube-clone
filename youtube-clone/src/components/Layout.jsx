import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.main}>
        <Sidebar />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
