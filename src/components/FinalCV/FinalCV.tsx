import React from 'react';
import { useAppDispatch, useAppSelector } from './../../redux/store';
import { fetchCVs } from './../../requests/cvRequests';
import { useEffect } from 'react';

const FinalCV: React.FC = () => {
   const dispatch = useAppDispatch();
   const data = useAppSelector(state => state.setCVs.cvInfo);
   useEffect(() => {
      dispatch(fetchCVs());
   }, []);
   console.log(data);
   return (
      <div>hi</div>
   )
}

export default FinalCV;