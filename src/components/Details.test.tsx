import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from './Details';

const mockData = {
  id: 1,
  name: 'Show Name',
  image: {
    medium: 'medium.jpg',
    original: 'original.jpg',
  },
  summary: 'Show summary',
  genres: ['Genre1', 'Genre2'],
  premiered: '2022-01-01',
};

describe('Details component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Fetches and displays the show details', async () => {
    jest
      .spyOn(global, 'fetch')
      .mockResolvedValue(new Response(JSON.stringify(mockData)));

    render(
      <MemoryRouter initialEntries={['/series/1']}>
        <Routes>
          <Route path="/series/:id" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );

    const name = await screen.findByText('Show Name');
    const summary = await screen.findByText('Show summary');
    const genre = await screen.findByText('Genre1');
    const premiered = await screen.findByText('2022');

    expect(name).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(genre).toBeInTheDocument();
    expect(premiered).toBeInTheDocument();
  });
});
