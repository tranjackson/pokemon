import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Pokemons from './pages/Pokemons';
import PokeDetails from './pages/PokeDetails';

function App() {

  const url = '/';

  return (
    <div className="App">
      <div className="bg-primary bg-image-header">
        <div className="p-5 bg-custom text-white rounded">
          <h1>Pokedex Directory</h1>
          <p className="custom-text">Check out our TOP 150 Pokemon!</p>
        </div>
      </div>
      <main>
        <Routes>
          <Route path={url} element={<Pokemons />} />
          <Route path={`${url}pokemon/:id`} element={<PokeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
