import React from 'react';
import ReactDOM from 'react-dom/client';

import SeriesScanner from './SeriesScanner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <SeriesScanner />
  </React.StrictMode>
);
