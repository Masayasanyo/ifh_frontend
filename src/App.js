import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import styles from './styles/styles.module.css'
import Header from './components/header/Header';
import Home from './pages/home/Home';
import Upload from './pages/upload/Upload';
import Theatre from './pages/theatre/Theatre';
import Login from './pages/login/Login';
import SignUp from './pages/sign_up/SignUp';
import Trailer from './pages/trailer/Trailer';
import Account from './pages/account/Account';
import Movie from './pages/movie/Movie';
import Shop from './pages/shop/Shop';
import Live from './pages/live/Live';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className={styles.container}>
          <Header />
          <div className={styles.main}>
            <Routes>
              <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path='/upload' element={<PrivateRoute><Upload /></PrivateRoute>} />
              <Route path='/trailer' element={<PrivateRoute><Trailer /></PrivateRoute>} />
              <Route path='/movie' element={<PrivateRoute><Movie /></PrivateRoute>} />
              <Route path='/theatre' element={<PrivateRoute><Theatre /></PrivateRoute>} />
              <Route path='/live' element={<PrivateRoute><Live /></PrivateRoute>} />
              <Route path='/shop' element={<PrivateRoute><Shop /></PrivateRoute>} />
              <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign_up' element={<SignUp />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
