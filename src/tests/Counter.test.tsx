import { render, screen, fireEvent } from '@testing-library/react';
import Counter from '../apps/Counter';

test('renders counter with initial value and responds to button clicks', () => {
  render(<Counter />);

  // Check initial count value
  expect(screen.getByText('0')).toBeInTheDocument();

  // Click the increase button
  fireEvent.click(screen.getByText('Increase'));

  // Check the updated count value
  expect(screen.getByText('1')).toBeInTheDocument();

  // Click the decrease button
  fireEvent.click(screen.getByText('Decrease'));

  // Check the updated count value
  expect(screen.getByText('0')).toBeInTheDocument();
});
