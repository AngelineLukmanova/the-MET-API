import React, { useState } from 'react';
import Gallery from './Gallery';
import Navbar from './Navbar';
import './App.css';
import { SearchProvider } from './context/search.context';
import { SpinnerProvider } from './context/spinner.context';

function App() {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="App">
      <SearchProvider >
        <SpinnerProvider>
          <Navbar />
          <Gallery spinner={isLoading} showSpinner={setLoading} />
        </SpinnerProvider>
      </SearchProvider>
    </div>
  );
}

export default App;




