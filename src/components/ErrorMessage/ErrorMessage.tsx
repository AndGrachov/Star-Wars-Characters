import styles from './ErrorMessage.module.css'

type Props = {
  setHasError: (state: boolean) => void;
  setLoading: (state: boolean) => void;
}

export const ErrorMessage = ({ setHasError, setLoading }: Props) => {
  return (
    <div data-testid='errorMessage' className={styles.container}>
      <h1 className={styles.message}>Something went wrong.</h1>

      {/* Button to reload the application or fetch data again */}
      <button className={styles.reloadButton} onClick={() => {
        // Resetting the error state and setting loading to true when clicked
        setHasError(false)
        setLoading(true)}}>
        Reload
      </button>
    </div>
  );
};
