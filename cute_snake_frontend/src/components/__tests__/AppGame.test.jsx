import { render, screen } from '@testing-library/react';
import App from '../../App';

test('renders Cute Snake title and grid', () => {
  render(<App />);
  expect(screen.getByText(/Cute Snake Adventure/i)).toBeInTheDocument();
  const grid = screen.getByRole('grid', { name: /Snake game grid/i });
  expect(grid).toBeInTheDocument();
});
