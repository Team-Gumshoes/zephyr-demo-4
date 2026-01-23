import { Route, Navigate, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import '../styles.css';
import TripPlannerPage from './features/trip-planner/TripPlannerPage';
import FlightsPage from './features/flights/FlightsPage';
import React, { Suspense } from 'react';

const ExplorePage = React.lazy(() => import('explore/Module'));

const LandingPage = React.lazy(() => import('landing/Module'));

const ChatPage = React.lazy(() => import('chat/Module'));

const ItinerariesPage = React.lazy(() => import('itineraries/Module'));
// const Button = React.lazy(() => import('itineraries/Button'));

// landing = 4201
// chat = 4202
// itineraries = 4203
// explore = 4204
// login = keep it in the platform

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route index element={<Navigate to="/landing" replace />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="itineraries" element={<ItinerariesPage />} />
          <Route path="explore" element={<FlightsPage />} />
          <Route path="login" element={<TripPlannerPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
