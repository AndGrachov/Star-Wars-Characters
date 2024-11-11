import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import styles from "./FilmNode.module.css";
import { Film } from "../../../types/film";

type Props = {
  data: { filmInfo: Film };
};

export const FilmNode = memo(({ data }: Props) => {
  const { filmInfo } = data;

  return (
    <div className={styles.container}>
      <Handle type="target" position={Position.Left} /> {/* Handle for incoming connections on the left */}
      <Handle type="source" position={Position.Right} /> {/* Handle for outgoing connections on the right */}

      <div className={styles.title}>{filmInfo.title}</div>

      <div className={styles.description}>
        <p>Direcor: {filmInfo.director}</p>
        <p>Release day: {filmInfo.release_date}</p>
      </div>
    </div>
  );
});
