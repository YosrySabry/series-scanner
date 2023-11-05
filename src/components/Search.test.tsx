import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Search from './Search';

// Mock the fetch API
global.fetch = jest.fn(() => Promise.resolve(new Response(JSON.stringify([]))));

// Mock the react-router-dom hooks
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ state: null }),
}));

describe('Search component', () => {
  test('updates on input change', () => {
    render(<Search />);
    const input = screen.getByLabelText(
      'Search input for TV series'
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'test' } });
    expect(input.value).toBe('test');
  });

  test('fetches data from API on input change', async () => {
    render(<Search />);
    const input = screen.getByLabelText('Search input for TV series');

    fireEvent.change(input, { target: { value: 'test' } });

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
  });

  test('displays error message on fetch error', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject({
        ok: false,
        status: 500,
      })
    );

    render(<Search />);
    const input = screen.getByLabelText('Search input for TV series');
    fireEvent.change(input, { target: { value: 'test' } });

    const errorMessage = await screen.findByText('An unknown error occurred.');
    expect(errorMessage).toBeInTheDocument();
  });
});
