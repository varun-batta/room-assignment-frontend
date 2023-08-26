import React, {useState} from 'react';

import Home from './home';
import Login from './login';

function App() {
  const [auth, setAuth] = useState({
    token: "",
    name: "",
  });

  if (!auth.token) {
    return <Login setAuth={setAuth} />
  }
  
  return (
    <Home name={auth.name} />
  );
}

export default App;
