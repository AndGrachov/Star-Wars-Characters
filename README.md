# Star Wars Characters

[DEMO](https://andgrachov.github.io/Star-Wars-Characters/)

## Description

The goal of this project is to create a web application that allows users to explore a list of Star Wars characters and view information about the spaceships and films associated with each character. The application is built using **ReactJS** for the frontend and utilizes **React Flow** to visualize the information in a graph format.
### Features

- **Characters List**: Fetches and displays a list with infinite scroll of all Star Wars heroes.
  
- **Character Details**: Upon clicking a specific character, users are presented with information visualized as a graph. The main node represents the selected hero, with connections leading to:
  - **Films**: The movies in which the hero appears.
  - **Spaceships**: The spaceships that the hero has traveled on.

### Technologies Used

This project utilizes a variety of technologies and libraries to build a robust web application:

- **ReactJS**: The core library for building user interfaces.
- **React Flow**: For visualizing data in a node-based graph format.
- **TypeScript**: A superset of JavaScript that adds static typing, improving code quality and maintainability.
- **Vite**: A modern build tool that provides a fast development environment and optimized production builds.
- **Testing Libraries**: For testing components and ensuring application reliability:
  - `jest`: A delightful JavaScript testing framework.
  - `@testing-library/react`: Provides utilities for testing React components.
  - `@testing-library/jest-dom`: Custom matchers for Jest to test the state of the DOM.
- **Other Utilities**:
  - `react-loading-skeleton`: A library for creating skeleton screens while loading content.

## Installation

To get started with this project, clone the repository.

Then install the necessary dependencies and run the project locally, use the following commands:
```bash
- npm install
- npm run dev
```
## Testing
To run the tests for this project, use the following command:
```bash
- npm test
```
