import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './styles/index.scss';
import Search from './components/Search';
import Details from './components/Details';

function SeriesScanner() {
  return (
    <>
      <Router>
        <div className="series-scanner">
          <header className="series-scanner__header">
            <h1>Series Scanner</h1>
          </header>
        </div>

        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/series/:id" element={<Details />} />
        </Routes>
      </Router>
    </>
  );
}

export default SeriesScanner;
