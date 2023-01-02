import { useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import ErrorBoundary from './components/ErrorBoundary';
import Favorite from './components/Favorite';
import Home from './components/Home';
import Footer from './components/Footer';
import { addToLocalStorage, getFromLocalStorage } from "./helpers/localStorage";
export const AppContext = createContext();


function App() {

  const [chosen, setChosen] = useState({ country: 'Israel', city: 'Tel Aviv', key: '215854' });
  const [favKeys, setFav] = useState(getFromLocalStorage('favorites') || []);
  const [keyList, setKeyList] = useState([]) //list of cities from search
  const [fiveDays, setFiveDay] = useState([])
  console.log(`end of app ${chosen.key}`)
  console.log(`end of app fav ${favKeys[0]}`)
  return (
    <AppContext.Provider value={
      {
        keyList, setKeyList,
        chosen, setChosen,
        fiveDays, setFiveDay,
        favKeys, setFav
      }
    }>
      <div className="App" style={{ backgroundImage: "url('https://images.pexels.com/photos/12486830/pexels-photo-12486830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')", backgroundSize: "cover", minHeight: "100vh" }}>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ErrorBoundary><Home /></ErrorBoundary>} />
          <Route exact path="/favorites" element={<ErrorBoundary><div><Favorite /></div></ErrorBoundary>} />
        </Routes>
        <Footer />
      </div>
    </AppContext.Provider>

  );

}

export default App;
