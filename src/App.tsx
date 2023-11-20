import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Feed } from './pages/feed/index';
import { Login } from './pages/login/index';
import { Navbar } from './components/navbar/index';
import { CreatePost } from './pages/create-post';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PrivateRoute } from './utils/PrivateRoute';
import { Register } from './pages/register';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Navbar />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/feed' element={<Feed />} />
              <Route path='/create-post' element={<CreatePost />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
