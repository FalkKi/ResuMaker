import './preloader.css';
import React from 'react';

const Preloader: React.FC = () => {
   return (
      <div className="loader">
         <div className="inner one"></div>
         <div className="inner two"></div>
         <div className="inner three"></div>
      </div>
   )
};
export default Preloader;