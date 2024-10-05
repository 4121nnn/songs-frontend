
import './App.css'
import Songs from "./component/Songs.jsx";
import Lyrics from "./component/Lyrics.jsx";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import SongForm from "./component/SongForm.jsx";

function App() {

  return (
      <Router>
          <div className="flex justify-center font-semibold bg-amber-400 text-neutral-950">
              Тестовое задание для компании Effective Mobile от кандидата Нуршат Кадырбаев
          </div>
          <div className="max-w-4xl m-auto flex flex-col justify-center bg-neutral-900">
              <p className="flex justify-center text-3xl bold gradient-text w-full">
                  Онлайн-библиотека песен
              </p>

              <Routes>
                  <Route path="/" element={<Songs/>}/>
                  <Route path="/info" element={<Lyrics/>}/>
                  <Route path="/add" element={<SongForm/>}/>
                  <Route path="/edit/:id" element={<SongForm/>}/>
              </Routes>
          </div>
      </Router>
  )
}

export default App
