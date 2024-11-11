import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';
import { beforeEach } from 'node:test';

fetchMock.enableMocks();


beforeEach(() => {
    fetchMock.resetMocks(); // Reset mocks before each test
});

class ResizeObserver { // mocking observer for React Flow tests
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;