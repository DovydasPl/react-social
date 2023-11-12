import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Main } from './pages/main/index';
import { Login } from './pages/Login';
import { Navbar } from './components/navbar/index';
import { CreatePost } from './pages/create-post';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/login' element={<Login />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
