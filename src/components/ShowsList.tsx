import { Link } from 'react-router-dom';

function ShowsList({ showsList }: { showsList: ShowResult[] }) {
  return (
    <div className="shows-list">
      {showsList.map((show) => (
        <Link
          className="shows-list__item"
          key={show.show.id}
          to={`/series/${show.show.id}`}
        >
          <img
            src={
              show.show.image
                ? show.show.image.medium
                : '/img/placeholderPoster.svg'
            }
            alt={show.show.name}
          />
          <h3>{show.show.name}</h3>
        </Link>
      ))}
    </div>
  );
}

export default ShowsList;
