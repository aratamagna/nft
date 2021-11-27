import logo from './logo.svg';
import './App.css';
import React, {useEffect, useState} from 'react';

import { init, mintToken } from './Web3Client'

function App() {
  const [minted, setMinted] = useState(false);

  const mint = () => {
    mintToken().then( tx => {
      console.log(tx)
    }).catch(e => {
      console.log(e)
    })
  }

  useEffect(() => {
    init();
  }, []);
  return (
    <div className="App">
      {!minted
      ? <button onClick={() => mint()}>Mint!</button>
      : <p>Token minted!</p>
      }
    </div>
  );
}

export default App;
