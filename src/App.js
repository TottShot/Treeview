import './App.css';
import API from "./api";
import Sidebar from './Sidebar';

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div>
      <header className="App-header">
        <p>
          Welcome to Cirdan, a new DnD viewer.
          For, feel free to sign up to be part of a beta.
        </p>
        <API />
      </header>
      </div>
    </div>
  );
}

export default App;
