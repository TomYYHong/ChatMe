import './App.css'
import Header from './header/header';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RomePage from './pages/roomPage';


const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" Component={RomePage} />
      </Routes>
    </Router>
  );
};

export default App;
