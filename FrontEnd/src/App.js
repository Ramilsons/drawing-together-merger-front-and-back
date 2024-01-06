import { useState, useEffect } from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

import socket from './socket';
import sketch from './sketch';


function App() {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.emit('mouse', {teste: 1});

    setIsConnected(true);
  }, []);

  useEffect(() => {
    console.log(isConnected);
  }, [isConnected]);

  return (
    <div className="App bg-black">
      <ReactP5Wrapper sketch={sketch} />
    </div>
  );
}

export default App;
