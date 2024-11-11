import { render, screen, waitFor } from "@testing-library/react";
import { CharacterDetails } from "./CharacterDetails";
import { character, film, starship } from "../../utils/mockData";
import fetchMock from 'jest-fetch-mock';

describe("renders character details", () => {
  // Test case to check if film and starship information is displayed correctly
  it("should show info about films and starships", async () => {
    // Clear any previous mock responses
    fetchMock.mockClear();

    // Mocking the fetch responses for film and starship data
    fetchMock.mockResponses(
      [JSON.stringify({ results: [film] }), { status: 200 }],
      [JSON.stringify({ results: [starship] }), { status: 200 }]
    );

    render(<CharacterDetails character={character} />);

    // Finding the film title and starship name in the rendered output
    const filmTitle = await screen.findByText("X-wing");
    const starshipName = await screen.findByText("A New Hope");

    // Assertions to check if the elements are present in the document
    expect(filmTitle).toBeInTheDocument();
    expect(starshipName).toBeInTheDocument();
  });

  it("renders error message when fetch is rejected", async () => {
    fetchMock.mockReject(new Error(""));

    render(<CharacterDetails character={character} />);

    // Wait for the error message to be rendered
    const errorMessage = await screen.findByTestId("errorMessage");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should render loaders only when loading data", async () => {
    fetchMock.mockClear();

    // Mocking the fetch responses for film and starship data
    fetchMock.mockResponses(
      [JSON.stringify({ results: [film] }), { status: 200 }],
      [JSON.stringify({ results: [starship] }), { status: 200 }]
    );
    
    render(<CharacterDetails character={character} />);
    const modalLoader = screen.getByTestId("modalLoader");

    // Assert that the modal loader is present in the document at this point
    expect(modalLoader).toBeInTheDocument();

    // Wait for the loader to be removed from the document
    await waitFor(() => {
      // Assert that the modal loader is no longer in the document after loading completes
      expect(modalLoader).not.toBeInTheDocument();
    });
  });
});
