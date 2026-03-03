type ErrorStateProps = {
  message: string;
};

export function NotLoggedInState() {
  return (
    <div className="max-w-4xl mx-auto p-8 flex justify-center mb-12">
      <p className="text-gray-500">Please log in to view your trips.</p>
    </div>
  );
}

export function LoadingTripsState() {
  return (
    <div className="max-w-4xl mx-auto p-8 flex justify-center mb-12">
      <p className="text-gray-500">Loading your trips...</p>
    </div>
  );
}

export function ErrorTripsState({ message }: ErrorStateProps) {
  return (
    <div className="max-w-4xl mx-auto p-8 flex justify-center mb-12">
      <p className="text-red-500">{message}</p>
    </div>
  );
}

export function EmptyTripsState() {
  return (
    <div className="max-w-4xl mx-auto p-8 flex justify-center mb-12">
      <p className="text-gray-500">You have no saved trips yet.</p>
    </div>
  );
}
