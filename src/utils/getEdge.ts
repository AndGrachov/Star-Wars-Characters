// Function to create an edge object for React Flow
export const getEdge = (source: string, target: string) => {
  return {
    id: `${source}-${target}`,
    source: source,
    target: target,
    animated: true,
    style: { stroke: "crimson" },
  };
};
