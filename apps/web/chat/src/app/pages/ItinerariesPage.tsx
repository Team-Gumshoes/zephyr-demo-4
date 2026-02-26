import { useNavigate } from 'react-router-dom';
import { useTripStore } from '../../store/useTripStore';
import ItineraryForm from '../../components/forms/ItineraryForm';

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
