import { memo } from "react";
import { Handle, Position } from "@xyflow/react";
import styles from "./StarshipNode.module.css";
import { Starship } from "../../../types/starship";

type Props = {
  data: { starshipInfo: Starship };
};

export const StarshipNode = memo(({ data }: Props) => {
  const { starshipInfo } = data;

  return (
    <div className={styles.container}>
      <Handle type="target" position={Position.Left} /> {/* Handle for incoming connections on the left */}

      <div className={styles.title}>{starshipInfo.name}</div>

      <div className={styles.description}>
        <p>Model: {starshipInfo.model}</p>
        <p>Starship class: {starshipInfo.starship_class}</p>
        <p>Cost in credits: {starshipInfo.cost_in_credits}</p>
      </div>
    </div>
  );
});
