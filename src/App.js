import * as React from "react";
import './App.css';
import { Content } from './components/Content';
import { Sidebar } from './components/Sidebar';
import { SectionProvider } from './contexts/SectionContext';

function App() {
  return (
    <div className="App">
      <SectionProvider>
        <Sidebar />
        <main className="App-header">
          <Content />
        </main>
      </SectionProvider>
    </div>
  );
}

export default App;
