import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import PrivateRoute from './context/PrivateRoute';
import AdminRoute from './context/AdminRoute';
import styles from './styles/styles.module.css'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/home/Home';
import Upload from './pages/upload/Upload';
import Theatre from './pages/theatre/Theatre';
import Login from './pages/login/Login';
import SignUp from './pages/sign_up/SignUp';
import Trailer from './pages/trailer/Trailer';
import Account from './pages/account/Account';
import Film from './pages/film/Film';
import Shop from './pages/shop/Shop';
import Live from './pages/live/Live';
import User from './pages/user/User';
import WatchList from './pages/watch_list/WatchList';
import History from './pages/account/history/History';
import Ticket from './pages/account/ticket/Ticket';
import Work from './pages/account/work/Work';
import EditFilm from './pages/edit_film/EditFilm';
import Admin from './pages/admin/Admin';
import { useTranslation } from 'react-i18next';
import './i18n';


function App() {

  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };


  return (
    <AuthProvider>
      <Router>
        <div className={styles.app}>
          <Header />
          <div className={styles.main}>
            <Routes>
              <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path='/upload' element={<PrivateRoute><Upload /></PrivateRoute>} />
              <Route path='/trailer' element={<PrivateRoute><Trailer /></PrivateRoute>} />
              <Route path='/film/:filmId' element={<PrivateRoute><Film /></PrivateRoute>} />
              <Route path='/edit/:filmId' element={<PrivateRoute><EditFilm /></PrivateRoute>} />
              <Route path='/theatre' element={<PrivateRoute><Theatre /></PrivateRoute>} />
              <Route path='/live/:filmId' element={<PrivateRoute><Live /></PrivateRoute>} />
              <Route path='/shop' element={<PrivateRoute><Shop /></PrivateRoute>} />
              <Route path='/user/:userId' element={<PrivateRoute><User /></PrivateRoute>} />
              <Route path='/watchlist' element={<PrivateRoute><WatchList /></PrivateRoute>} />
              <Route path='/account' element={<PrivateRoute><Account /></PrivateRoute>} />
              <Route path='/account/history' element={<PrivateRoute><History /></PrivateRoute>} />
              <Route path='/account/ticket' element={<PrivateRoute><Ticket /></PrivateRoute>} />
              <Route path='/account/work' element={<PrivateRoute><Work /></PrivateRoute>} />
              <Route path='/account/admin' element={<AdminRoute><Admin /></AdminRoute>} />
              <Route path='/login' element={<Login />} />
              <Route path='/sign_up' element={<SignUp />} />
            </Routes>
            <Footer changeLanguage={changeLanguage} />
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
