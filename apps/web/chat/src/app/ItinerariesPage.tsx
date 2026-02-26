import { useNavigate } from 'react-router-dom';
import ItineraryForm from '../components/forms/ItineraryForm';
import { useTripStore } from '../store/useTripStore';

const ItinerariesPage = () => {
  const navigate = useNavigate();
  const { activityOptions, tripData } = useTripStore();

  return (
    <div className="max-w-7xl mx-auto">
      <ItineraryForm
        {...tripData}
        activityOptions={activityOptions}
        onSaveTrip={() => {
          // TODO: wire to save API
        }}
        onNewTrip={() => navigate('/landing')}
      />
    </div>
  );
};

export default ItinerariesPage;
