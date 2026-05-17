import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the login screen initially', () => {
  render(<App />);
  const welcomeText = screen.getByText(/Welcome Back/i);
  expect(welcomeText).toBeInTheDocument();
});
