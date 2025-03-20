
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Charity from './component/Charity';
import AddCharity from './component/AddCharity';
import About from './component/About';
import Contact from './component/Contact'
function Mainpage() {
  return (
    <Router>
      <div className="Mainpage">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/charity" element={<Charity />} />
          <Route path="/add-charity" element={<AddCharity />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Mainpage;