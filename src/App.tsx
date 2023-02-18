import React from 'react';
import styles from './app.module.css';
import Home from './components/Home/Home';
import { useEffect } from "react";
import { fetchCVs } from './requests/cvRequests';
import { useAppDispatch, useAppSelector } from './redux/store';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import FinalCV from './components/FinalCV/FinalCV';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showCv" element={<FinalCV />} />
      </Routes>
    </>
  );
};

export default App;
