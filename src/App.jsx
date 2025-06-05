import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Navbar from "./layout/Navbar";
import Home from "./component/Home";
function AppContent() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <Navbar />
      <div className=" p-4 overflow-auto">
        <Routes>
          {/* <Route path="/" element={<VisiterHome />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
