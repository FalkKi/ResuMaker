import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/Header/Header';
import FinalCV from './components/FinalCV/FinalCV';
import PersonalDataContainer from './components/PersonalData/PersonalDataContainer';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { useEffect } from 'react';
import { fetchLogin } from './requests/cvRequests';
import { useAppSelector, useAppDispatch } from './redux/store';


function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLogin());
    if (!window.localStorage.getItem('token')) {
      navigate('/home')
    };
  }, []);
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<PersonalDataContainer />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/showCv" element={<FinalCV />} />
        <Route path="/showCv/:id" element={<FinalCV />} />
      </Routes>
    </>
  );
};

export default App;
