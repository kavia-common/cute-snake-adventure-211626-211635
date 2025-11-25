import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title and grid', () => {
  render(<App />);
  expect(screen.getByText(/Cute Snake Adventure/i)).toBeInTheDocument();
  expect(screen.getByRole('grid', { name: /Snake game grid/i })).toBeInTheDocument();
});
