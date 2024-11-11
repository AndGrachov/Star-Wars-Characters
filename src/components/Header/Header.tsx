import styles from './Header.module.css'

export const Header = () => {
  return (
    <header>
      <h1
        data-testid="mainTitle"
        className={styles.title}
      >
        Star wars <br /> characters
      </h1>
    </header>
  );
};
