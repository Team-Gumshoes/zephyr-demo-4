import { Routes, Route } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import ActivitiesPage from './pages/ActivitiesPage';
import ItinerariesPage from './pages/ItinerariesPage';

// #3358ae - dark (primary)
// #99abd7 - light (secondary)
// #97dbd9 - teal (accent)

function App() {
  return (
    <Routes>
      <Route index element={<ChatPage />} />
      <Route path="activities" element={<ActivitiesPage />} />
      <Route path="itineraries" element={<ItinerariesPage />} />
    </Routes>
  );
}

export default App;
