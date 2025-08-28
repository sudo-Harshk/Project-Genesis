import Particles from './components/Particles';
import Header from './components/Header';
import React, { useState } from 'react';
import StackMenus from './components/StackMenus';
import TechLogos from './components/TechLogos';

function App() {
  const [frontend, setFrontend] = useState('React');
  const [backend, setBackend] = useState('Node.js');
  const [database, setDatabase] = useState('PostgreSQL');
  return (
    <>
      <Header />
      <StackMenus
        frontend={frontend}
        backend={backend}
        database={database}
        onFrontendChange={setFrontend}
        onBackendChange={setBackend}
        onDatabaseChange={setDatabase}
        onGenerate={() => {
          console.log('Generate with', { frontend, backend, database });
        }}
      />
      <TechLogos frontend={frontend} backend={backend} database={database} />
      <Particles count={14} />
    </>
  );
}

export default App;