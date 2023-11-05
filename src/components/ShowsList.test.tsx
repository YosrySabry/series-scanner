import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import ShowsList from './ShowsList';

const shows = [
  {
    show: {
      id: 1,
      name: 'Test Show 1',
      image: { medium: '/img/testImage1.svg' },
    },
  },
];

describe('ShowsList component', () => {
  test('renders ShowsList with given shows', () => {
    render(
      <Router>
        <ShowsList showsList={shows} />
      </Router>
    );

    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(shows.length);

    shows.forEach((show, index) => {
      expect(linkElements[index]).toHaveAttribute(
        'href',
        `/series/${show.show.id}`
      );
      const showNameElements = screen.getAllByText(show.show.name);
      expect(showNameElements[index]).toBeInTheDocument();
      const showImageElements = screen.getAllByAltText(show.show.name);
      expect(showImageElements[index]).toHaveAttribute(
        'src',
        show.show.image.medium
      );
    });
  });
});
