import { Person } from "../../types/person";
import { CharactersItem } from "../CharacterItem/CharacterItem";
import styles from "./CharacterList.module.css";
import { SkeletonItem } from "../CharacterItem/SkeletomItem";

type Props = {
  characters: Person[];
  loading: boolean;
};

export const CharactersList = ({ characters, loading }: Props) => {
  return (
    <div className={styles.characterList}>
      {characters.map((character) => (
        <CharactersItem key={character.id} character={character} /> // Render each character item 
      ))}

      {/* Show skeleton items when loading */}
      {loading && (
        <>
        {/* Placeholders for loading character data */}
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
          <SkeletonItem />
        </>
      )}
    </div>
  );
};
