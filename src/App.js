import Home from "./components/Home";
import Login from "./components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css'
import { GlobalContext } from './context/GlobalState';
import { useContext } from "react";
import Course from "./components/Course";
import AddCourse from "./components/AddCourse";

function App() {
  const {isLogin} = useContext(GlobalContext)

  return (
      <Router>
        <Routes>
          <Route path="/" element={true ? <Home /> : <Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/course/:id" element={<Course />} />
        </Routes>
      </Router>

  );
}

export default App;
