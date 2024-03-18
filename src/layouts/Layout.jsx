import styles from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>Crypto APP</h1>
        <p>
          <a href="#">AmooQ</a> | React.js Full Course
        </p>
      </header>
      {children}
      <footer className={styles.footer}>
        <p>Made with ♥</p>
      </footer>
    </>
  );
};

export default Layout;
