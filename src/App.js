import './App.css';
//component
import Search from "./Search/Search";
import Nav from './Nav/Nav';

function App() {
  return (
    <div className="container">
      <Nav>LiveWeather</Nav>
      <Search/>
    </div>
  );
}

export default App;
//react accessible accordion
//react select async paginate