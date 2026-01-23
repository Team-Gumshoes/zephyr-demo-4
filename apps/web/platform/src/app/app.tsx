import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import '../styles.css';
import TripPlannerPage from './features/trip-planner/TripPlannerPage';
import FlightsPage from './features/flights/FlightsPage';
import React, { Suspense } from 'react';

const Landing = React.lazy(() => import('landing/Module'));

const TransportPage = React.lazy(() => import('transport/Module'));

const HotelsPage = React.lazy(() => import('hotels/Module'));
// const Button = React.lazy(() => import('hotels/Button'));
// landing = 4201
// chat = 4202
// itineraries = 4203
// explore = 4204
// login = 4205

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/landing" element={<Landing />} />
          <Route index element={<Navigate to="/landing" replace />} />
          <Route path="chat" element={<TripPlannerPage />} />
          <Route path="itineraries" element={<FlightsPage />} />
          <Route path="explore" element={<HotelsPage />} />
          <Route path="login" element={<TransportPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
