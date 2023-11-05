import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const useBrowserHistory = (setSearchTerm: (searchTerm: string) => void, setResults: (results: ShowResult[]) => void) => {
    const navigate = useNavigate();
    const location = useLocation();

    // This effect handles the browser back/forward navigation.
    // If the location state exists, it sets the search term and results from the state.
    useEffect(() => {
        const locationState = location.state as
            | { searchTerm: string; results: ShowResult[] }
            | undefined;

        if (locationState) {
            setSearchTerm(locationState.searchTerm);
            setResults(locationState.results);
        }
    }, [location.state, setSearchTerm, setResults]);

    // This effect clears the browser history when the page is reloaded.
    useEffect(() => {
        const handleUnload = () => {
            navigate('.', { state: null });
        };

        window.addEventListener('beforeunload', handleUnload);

        return () => {
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [navigate]);
};

export default useBrowserHistory;