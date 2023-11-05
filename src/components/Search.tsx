import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useBrowserHistory from '../hooks/useBrowserHistory';
import ShowsList from './ShowsList';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<ShowResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const API_URL = 'https://api.tvmaze.com/search/shows?q=';
  const TIMEOUT_ERROR =
    'The request took too long - please check your internet connection.';
  const UNKNOWN_ERROR = 'An unknown error occurred.';
  const NO_RESULTS = 'No results found.';

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();
    const { signal } = controller;
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(`${API_URL}${searchTerm}`, { signal });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.length === 0) {
        setError(NO_RESULTS);
      } else {
        setResults(data);
        navigate('.', { state: { searchTerm, results: data } });
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.name === 'AbortError' ? TIMEOUT_ERROR : error.message);
      } else {
        setError(UNKNOWN_ERROR);
      }
    } finally {
      setLoading(false);
    }
  }, [searchTerm, navigate]);

  // Effect to fetch the data when the search term changes
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const locationState = location.state;

    if (searchTerm.length < 3) return;

    if (locationState?.searchTerm === searchTerm) {
      setResults(locationState.results);
    } else {
      timeoutId = setTimeout(() => fetchData(), 500);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchTerm, fetchData, location.state, navigate, results]);

  // Effect to clear the results when the search term is cleared
  useEffect(() => {
    if (!searchTerm) {
      setResults([]);
    }
  }, [searchTerm]);

  // Hook to handle the browser history
  useBrowserHistory(setSearchTerm, setResults);

  return (
    <div className="search-page canvas color-light">
      <SearchForm searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {loading ? (
        <div className="search-page__message">Searching...</div>
      ) : error ? (
        <div className="search-page__message">{error}</div>
      ) : (
        <ShowsList showsList={results} />
      )}
    </div>
  );
}

// SearchForm component for the search input and clear button
export const SearchForm = ({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
}) => {
  return (
    <div className="search-page__form">
      <form role="search" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter a TV series name..."
          aria-label="Search input for TV series"
        />
      </form>

      <button onClick={() => setSearchTerm('')}>Clear</button>
    </div>
  );
};

export default Search;
