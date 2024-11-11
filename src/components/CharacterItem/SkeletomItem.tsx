import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./CharacterItem.module.css";

export const SkeletonItem = () => {
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div className={styles.characterItem} data-testid="skeletonLoader">
        <Skeleton className={styles.characterImage} />

        <fieldset className="item-body">
          <legend data-testid="characterName" className={styles.itemTitle}>
            Name
          </legend>
          <div className={styles.itemInfo}>
            <p data-testid="characterHeight">
              <Skeleton width={180} height={15} />
            </p>
            <p data-testid="characterMass">
              <Skeleton width={180} height={15} />
            </p>
            <p data-testid="characterHair">
              <Skeleton width={180} height={15} />
            </p>
            <p data-testid="characterSkin">
              <Skeleton width={180} height={15} />
            </p>
            <p data-testid="characterEye">
              <Skeleton width={180} height={15} />
            </p>
            <p data-testid="characterBirth">
              <Skeleton width={180} height={15} />
            </p>
            <p data-testid="characterGender">
              <Skeleton width={180} height={15} />
            </p>
          </div>
        </fieldset>
      </div>
    </SkeletonTheme>
  );
};
