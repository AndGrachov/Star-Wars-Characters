import { useEffect, useRef } from "react";
import styles from './ModalWindow.module.css'

type Props = {
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
}

export const ModalWindow = ({ isOpen, onClose, children }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null); // Reference to the modal element

  // Effect to handle clicks outside of the modal to close it
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the click was outside of the modal
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close the modal if clicked outside
      }
    };

    // Add event listener if the modal is open
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    // Cleanup function to remove event listener when component unmounts or isOpen changes
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]); // Dependencies for useEffect

  // Return null if the modal is not open
  if (!isOpen) {
    return null;
  }

  return (
    <div data-testid='modalWindow' className={styles.container}>
      <div
        ref={modalRef}
        className={styles.content}
      >
        <button
          onClick={onClose}
          className={styles.closeButton}
          data-testid='closeModalButton'
        >
          ×
        </button>
        {children} {/* Render children content inside modal */}
      </div>
    </div>
  );
};
