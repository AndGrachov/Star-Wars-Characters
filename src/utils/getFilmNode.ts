import { Position } from "@xyflow/react"
import { Film } from "../types/film"
import { filmNodeSize } from "./consts/nodeSizes"

// Function to create an film node object for React Flow
export const getFilmNode = (filmData: Film, index: number, filmsStart: number) => {
    return {
        id: `e${filmData.id}`,
          type: "FilmNode",
          position: { x: 300, y: -filmsStart + (index * filmNodeSize) },
          data: { filmInfo: filmData },
          sourcePosition: Position.Right,
          targetPosition: Position.Left,
    }
}