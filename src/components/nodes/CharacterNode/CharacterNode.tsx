import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import { Person } from "../../../types/person";
import { getImageURL } from "../../../utils/getImageUrl";
import styles from "./CharacterNode.module.css";

type Props = {
  data: { characterInfo: Person };
};

export const CharacterNode = memo(({ data }: Props) => {
  const { characterInfo } = data;

  return (
    <div className={styles.container}>
      <Handle
        type="source" // Indicates that this handle is a source for connections
        position={Position.Right} // Positioning the handle on the right side of the node
      />
      <div className={styles.nameField}>{characterInfo.name}</div>
      <img
        className={styles.image}
        src={getImageURL(characterInfo.id)}
        alt={characterInfo.name}
      />
    </div>
  );
});
