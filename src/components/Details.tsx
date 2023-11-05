import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Details() {
  const { id } = useParams<{ id: string }>();
  const [show, setShow] = useState<Show | null>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const API_URL = 'https://api.tvmaze.com/shows/';
  const TIMEOUT_ERROR =
    'The request took too long - please check your internet connection.';
  const UNKNOWN_ERROR = 'An unknown error occurred.';

  useEffect(() => {
    if (id) {
      const controller = new AbortController();
      const { signal } = controller;
      const timer = setTimeout(() => controller.abort(), 5000);

      fetch(`${API_URL}${id}`, { signal })
        .then((response) => response.json())
        .then((data) => {
          clearTimeout(timer);
          setShow(data);
        })
        .catch((error) => {
          if (error instanceof Error) {
            setError(
              error.name === 'AbortError' ? TIMEOUT_ERROR : error.message
            );
          } else {
            setError(UNKNOWN_ERROR);
          }
        });
    }
  }, [id]);

  const getPremieredYear = (premiered: string) => premiered.split('-')[0];
  const getShowImage = (image: string) => image || '/img/placeholderPoster.svg';

  if (!show) {
    return <div className="show-details__message">Loading...</div>;
  }

  if (error) {
    return <div className="show-details__message">{error}</div>;
  }

  return (
    <>
      <div className="show-details-navigation canvas">
        <button onClick={() => navigate(-1)}>{'< '} Back to search</button>
      </div>

      <div className="show-details canvas color-light">
        <div className="show-details__left">
          <img src={getShowImage(show.image?.medium)} alt={show.name} />
        </div>

        <div className="show-details__right">
          <h2>{show.name}</h2>

          {show.genres && show.genres.length > 0 && (
            <div className="show-details__genres">
              {show.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
          )}

          {show.premiered && <span>{getPremieredYear(show.premiered)}</span>}

          {/* Safe to setInnerHtml for this case, no need to sanitize it */}
          {show.summary && (
            <p dangerouslySetInnerHTML={{ __html: show.summary }}></p>
          )}
        </div>
      </div>
    </>
  );
}

export default Details;
