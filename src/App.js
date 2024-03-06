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
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}
export default App;
