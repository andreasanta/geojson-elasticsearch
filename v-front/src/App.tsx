import React from 'react';
import { RadialChart } from 'react-vis';
import './App.css';


// Components
import Map from './components/Map';
import ErrorBoundary from './components/ErrorBoundary';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';


function App() {

  return (
      <div className="app">
        <ErrorBoundary>
            <Map>
                <div className="charts">
                  <BarChart title="Materials" selector="materials" />
                  <PieChart title="Areas" selector="areas" />
                </div>

            </Map>
        </ErrorBoundary>
      </div>
  );
}

export default App;
