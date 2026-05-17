import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DevTrack app title', () => {
  render(<App />);
  const titleElement = screen.getByText(/DevTrack/i);
  expect(titleElement).toBeInTheDocument();
});
