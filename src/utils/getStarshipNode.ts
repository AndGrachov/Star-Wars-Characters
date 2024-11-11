import { Starship } from "./../types/starship";
import { Position } from "@xyflow/react";
import { starshipNodeSize } from "./consts/nodeSizes";

// Function to create an starship node object for React Flow
export const getStarshipNode = (starshipData: Starship, index: number, starshipsStart: number) => {
  return {
    id: `s${starshipData.id}`,
    type: "StarshipNode",
    position: { x: 600, y: -starshipsStart + (index * starshipNodeSize) },
    data: { starshipInfo: starshipData },
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
  };
};
