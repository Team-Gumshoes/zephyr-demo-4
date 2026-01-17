import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import '../styles.css';
import TripPlannerPage from './features/trip-planner/TripPlannerPage';
import FlightsPage from './features/flights/FlightsPage';
import React, { Suspense } from 'react';

const TransportPage = React.lazy(() => import('transport/Module'));

const HotelsPage = React.lazy(() => import('hotels/Module'));
// const Button = React.lazy(() => import('hotels/Button'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/trip-planner" replace />} />
          <Route path="trip-planner" element={<TripPlannerPage />} />
          <Route path="flights" element={<FlightsPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="transport" element={<TransportPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
