import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from './components/Layout'
import '../styles.css';
import TripPlannerPage from './features/trip-planner/TripPlannerPage'
import FlightsPage from './features/flights/FlightsPage';
import React from 'react';

const HotelsPage = React.lazy(() => import('hotels/Module'));
// const Button = React.lazy(() => import('hotels/Button'));

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/trip-planner" replace />} />
          <Route path="trip-planner" element={<TripPlannerPage />} />
          <Route path="flights" element={<FlightsPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          {/* 
          <Route path="transport" element={<TransportPage />} /> */}
        </Route>
      </Routes>
  );
}

export default App;
