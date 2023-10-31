import './App.css';

import { Search } from './components/Search';
import { BooksList } from './components/books/BooksList'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Search />
        <BooksList />
      </header>
    </div>
  );
}

export default App;
