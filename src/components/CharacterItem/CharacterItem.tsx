import { useState } from "react";
import { Person } from "../../types/person";
import { getImageURL } from "../../utils/getImageUrl";
import styles from "./CharacterItem.module.css";
import { ModalWindow } from "../ModalWindow/ModalWindow";
import { CharacterDetails } from "../CharacterDetails/CharacterDetails";


type Props = {
  character: Person;
};

export const CharactersItem = ({ character }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);

    // Disable scrolling on the body element to prevent background scrolling when the modal is open
    document.body.style.overflow = 'hidden';
  }

  // Function to close the modal 
  const closeModal = () => {
    setIsModalOpen(false);

    // Re-enable scrolling on the body element when the modal is closed
    document.body.style.overflow = 'auto';
  } 

  return (
    <>
      <div data-testid='character' className={styles.characterItem} onClick={openModal}>
        <img
          src={getImageURL(character.id)}
          className={styles.characterImage}
          alt={character.name}
        />
        <fieldset className="item-body">
          <legend data-testid='characterName' className={styles.itemTitle}>{character.name}</legend>
          <div className={styles.itemInfo}>
            {/* Display various character attributes */}
            <p data-testid='characterHeight'>Height: {character.height}</p>
            <p data-testid='characterMass'>Mass: {character.mass}</p>
            <p data-testid='characterHair'>Hair Color: {character.hair_color}</p>
            <p data-testid='characterSkin'>Skin Color: {character.skin_color}</p>
            <p data-testid='characterEye'>Eye Color: {character.eye_color}</p>
            <p data-testid='characterBirth'>Birth Year: {character.birth_year}</p>
            <p data-testid='characterGender'>Gender: {character.gender}</p>
          </div>
        </fieldset>
      </div>

      {/* Modal window to display character details when opened */}
      <ModalWindow onClose={closeModal} isOpen={isModalOpen}>
        <CharacterDetails character={character} /> {/* Pass content for Modal window */}
      </ModalWindow>
    </>
  );
};
