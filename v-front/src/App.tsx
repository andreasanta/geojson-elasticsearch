import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import './App.css';


// Components
import Map from './components/Map';

// Main store and actions
import { loadAllRamps } from './store/actions';

function App() {

  console.log(loadAllRamps);

  const dispatch = useDispatch();

  useEffect(() => {
      //@ts-ignore
      dispatch(loadAllRamps());

    
  },[]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
      <div className="app">
        <Map></Map>
      </div>
  );
}

export default App;
