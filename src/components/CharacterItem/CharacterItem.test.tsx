import { fireEvent, render, screen } from "@testing-library/react";
import { CharactersItem } from "./CharacterItem";
import { character } from "../../utils/mockData";
import fetchMock from 'jest-fetch-mock';


describe("renders character item", () => {

  // Test case to check if the character item exists in the document
  it("should exist",  () => {
    // Rendering the CharactersItem component with mock data
    render(<CharactersItem character={character} />);
    const characterItem = screen.getByTestId("character");
    expect(characterItem).toBeInTheDocument();
  });

  // Test case to verify that the character has the correct information displayed
  it("should has correct info", async () => {
    render(<CharactersItem character={character} />);
     // Finding various elements by their test IDs
    const characterName = screen.getByTestId("characterName"); 
    const characterHeight = screen.getByTestId("characterHeight"); 
    const characterMass = screen.getByTestId("characterMass"); 
    const characterHair = screen.getByTestId("characterHair"); 
    const characterSkin = screen.getByTestId("characterSkin");
    const characterEye = screen.getByTestId("characterEye");
    const characterBirth = screen.getByTestId("characterBirth");
    const characterGender = screen.getByTestId("characterGender");
    
     // Asserting that each piece of information matches expected values
    expect(characterName.textContent).toBe("Luke Skywalker");
    expect(characterHeight.textContent).toBe("Height: 172");
    expect(characterMass.textContent).toBe("Mass: 77");
    expect(characterHair.textContent).toBe("Hair Color: blond");
    expect(characterSkin.textContent).toBe("Skin Color: fair");
    expect(characterEye.textContent).toBe("Eye Color: blue");
    expect(characterBirth.textContent).toBe("Birth Year: 19BBY");
    expect(characterGender.textContent).toBe("Gender: male");
  });

  // Test case to check if the modal window shows and closes correctly
  it("should show and close modal window",  () => {
    // Clear previous mock responses
    fetchMock.mockClear();

    // Mocking fetch responses for API calls
    fetchMock.mockResponses(
    [JSON.stringify({ results: [] }), { status: 200 }],
    [JSON.stringify({ results: [] }), { status: 200 }]
    );

    render(<CharactersItem character={character} />);
    const characterItem = screen.getByTestId("character");

    // Simulating a click event on the character item
    fireEvent.click(characterItem);

    const modalWindow = screen.getByTestId('modalWindow');
    const closeModalButton = screen.getByTestId('closeModalButton');

    // Asserting that the modal window is displayed
    expect(modalWindow).toBeInTheDocument();

    // Simulating a click event on the close button
    fireEvent.click(closeModalButton);

    // Asserting that the modal window is no longer displayed
    expect(modalWindow).not.toBeInTheDocument();
  });
});
