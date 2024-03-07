import {
  BrowserRouter as Router
  , Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import './App.css';
import About from "./Components/About";
import Home from "./Components/Home";
import NoteState from "./Contexts/NotesContexts/NoteState";
import Alert from "./Components/Alert";
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert/>
          <div className="conatainer">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
