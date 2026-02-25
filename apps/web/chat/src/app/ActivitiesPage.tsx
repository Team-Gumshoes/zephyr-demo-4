import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ActivitiesForm from '../components/forms/ActivitiesForm';
import { Activity, TripData } from '@allorai/shared-types';

const ActivitiesPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [activityOptions, setActivityOptions] = useState<Activity[]>(state?.activityOptions ?? []);

  const tripData: TripData = state?.tripData ?? {};

  const togglePin = (activityId: string) =>
    setActivityOptions((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, pinned: !a.pinned } : a)),
    );

  return (
    <div className="max-w-7xl mx-auto">
      <ActivitiesForm
        {...tripData}
        activityOptions={activityOptions}
        togglePin={togglePin}
        onReviewAndSave={() => navigate('/itineraries')}
        onModifyDetails={() => navigate('/landing')}
      />
    </div>
  );
};

export default ActivitiesPage;
