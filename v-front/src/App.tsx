import React from 'react';
import './App.css';


// Components
import Map from './components/Map';
import ErrorBoundary from './components/ErrorBoundary';


function App() {

  return (
      <div className="app">
        <ErrorBoundary>
            <Map></Map>
        </ErrorBoundary>
      </div>
  );
}

export default App;
