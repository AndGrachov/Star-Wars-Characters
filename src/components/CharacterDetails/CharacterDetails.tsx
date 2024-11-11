import { Edge, Node, Position, ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Person } from "../../types/person";
import { useCallback, useEffect, useState } from "react";
import { getFilms, getStarships } from "../../api/api";
import { Film } from "../../types/film";
import { Starship } from "../../types/starship";
import { CharacterNode } from "../nodes/CharacterNode/CharacterNode";
import { FilmNode } from "../nodes/FilmNode/FilmNode";
import { StarshipNode } from "../nodes/StarshipNode/StarshipNode";
import styles from "./CharacterDetails.module.css";
import { getFilmNode } from "../../utils/getFilmNode";
import { getStarshipNode } from "../../utils/getStarshipNode";
import { getEdge } from "../../utils/getEdge";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ErrorMessage } from "../ErrorMessage/ErrorMessage";
import { filmNodeSize, starshipNodeSize } from "../../utils/consts/nodeSizes";

type Props = {
  character: Person;
};

// Define custom node types for React Flow
const nodeTypes = {
  CharacterNode: CharacterNode,
  FilmNode: FilmNode,
  StarshipNode: StarshipNode,
};

const initialViewport = { x: 0, y: 0, zoom: 0.75 };

export const CharacterDetails = ({ character }: Props) => {
  const initialNodes: Node[] = [
    {
      id: "1",
      type: "CharacterNode",
      position: { x: 0, y: -100 },
      data: { characterInfo: character },
      sourcePosition: Position.Right,
    },
  ];

  // State to manage nodes and edges in the graph
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState<Edge[]>([]);

  // State for viewport management (position and zoom level)
  const [viewport, setViewport] = useState(initialViewport);

  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Function to initialize nodes and edges based on character data
  const init = useCallback(() => {
    const filmNodes: Node[] = [];
    const starshipsNodes: Node[] = [];
    const newEdges: Edge[] = [];

    // Fetch films and starships related to the character
    const requests = [getFilms(character.id), getStarships(character.id)];

    Promise.all(requests)
      .then((response) => {
        const films = response[0].results as Film[];
        const starships = response[1].results as Starship[];

        // Calculate the starting position for films based on the total size of film nodes
        const filmsStart = (filmNodeSize * films.length) / 2;

        // Calculate the starting position for starships based on the total size of starship nodes
        const starshipsStart = (starshipNodeSize * starships.length) / 2;

        // Create nodes for each film and establish edges
        films.forEach((filmData, index) => {
          filmNodes.push(getFilmNode(filmData, index, filmsStart));

          newEdges.push(getEdge("1", `e${filmData.id}`));

          // Connect film to starship if applicable
          starships.forEach((starshipData) => {
            if (filmData.starships.includes(starshipData.id)) {
              newEdges.push(getEdge(`e${filmData.id}`, `s${starshipData.id}`));
            }
          });
        });

        // Create nodes for each starship
        starships.forEach((starshipData, index) => {
          starshipsNodes.push(
            getStarshipNode(starshipData, index, starshipsStart)
          );
        });

        // Update state with new nodes and edges
        setNodes((prevNodes) => [
          ...prevNodes,
          ...filmNodes,
          ...starshipsNodes,
        ]);
        setEdges((prevEdges) => [...prevEdges, ...newEdges]);
      })
      .catch(() => setHasError(true))
      .finally(() => setLoading(false));
  }, [character.id, setNodes, setEdges]);

  // Function to update viewport based on window size
  const updateViewport = () => {
    const width = window.innerWidth;

    if (width <= 768) {
      // Mobile breakpoint
      setViewport({
        x: 10,
        y: 360,
        zoom: 0.5, // Adjust zoom level for mobile
      });
    } else {
      // Desktop
      setViewport({
        x: 50,
        y: 360,
        zoom: 0.75, // Default zoom level for desktop
      });
    }
  };

  useEffect(() => {
    init();
  }, [init, hasError]);

  // Set up event listener for resize events
  useEffect(() => {
    updateViewport(); // Set initial viewport
    window.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  return (
    <>
      {hasError && (
        // If an error exists, render the ErrorMessage component
        <ErrorMessage setHasError={setHasError} setLoading={setLoading} />
      )}

      {!hasError && loading && (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div data-testid="modalLoader">
            {" "}
            {/*Container for testing purposes.*/}
            <Skeleton height={700} />{" "}
            {/* Skeleton component to indicate loading state*/}
          </div>
        </SkeletonTheme>
      )}

      {/* Render the main content if there is no error and loading is false */}
      {!hasError && !loading && (
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          viewport={viewport}
          onViewportChange={setViewport}
          className={styles.graphsWindow}
        />
      )}
    </>
  );
};
