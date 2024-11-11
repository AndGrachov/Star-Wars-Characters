import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { render, screen } from "@testing-library/react";
import App from "./App";
import { characters } from "./utils/mockData";

describe("renders title", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("should exist", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(characters));

    render(<App />);
    const titleElement = await screen.findByTestId("mainTitle"); // Waits for the element to appear
    expect(titleElement).toBeInTheDocument(); // Checks existence
  });

  it("should have correct title", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(characters));

    render(<App />);
    const titleElement = await screen.findByTestId("mainTitle"); // Waits for the element to appear
    expect(titleElement.textContent).toBe("Star wars  characters");
  });
});

describe("renders characters list", () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  it("renders characters when fetch is successful", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(characters));

    render(<App />);

    // Wait for the characters to be rendered
    const items = await screen.findAllByTestId("character");
    expect(items).toHaveLength(2);
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
    expect(screen.getByText("Obi-Wan Kenobi")).toBeInTheDocument();
  });

  it("renders error message when fetch is rejected", async () => {
    fetchMock.mockReject(new Error(""));

    render(<App />);

    // Wait for the error message to be rendered
    const errorMessage = await screen.findByTestId("errorMessage");
    expect(errorMessage).toBeInTheDocument();
  });
});
