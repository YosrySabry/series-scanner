import { render, screen } from '@testing-library/react';
import SeriesScanner from './SeriesScanner';

describe('SeriesScanner component', () => {
  test('renders without crashing', () => {
    render(<SeriesScanner />);
    const linkElement = screen.getByText(/Series Scanner/i);
    expect(linkElement).toBeInTheDocument();
  });
});
