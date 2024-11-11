import { render, screen } from "@testing-library/react";
import { CharactersList } from "./CharactersList";


describe("renders loader", () => {

    // Test case to verify that loaders are rendered correctly based on loading state
    it("should render loaders only when loading is true",  () => {
    const { rerender } = render(<CharactersList characters={[]} loading={true} />);
      const skeletonLoader = screen.getAllByTestId("skeletonLoader");

       // Asserting that each skeleton loader is present in the document
      skeletonLoader.forEach(loader => {
        expect(loader).toBeInTheDocument();
      });

      // Asserting that exactly 5 skeleton loaders are rendered
      expect(skeletonLoader).toHaveLength(5);

      // Rerendering the CharactersList component with loading set to false
      rerender(<CharactersList characters={[]} loading={false} />);

      // Asserting that no skeleton loaders are present in the document after loading is false
      skeletonLoader.forEach(loader => {
        expect(loader).not.toBeInTheDocument();
      });
    });
  
  });