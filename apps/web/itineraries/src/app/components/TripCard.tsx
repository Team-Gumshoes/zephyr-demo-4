import { useState } from 'react';
import { BedDouble, Calendar, DollarSign, FileText, Pencil, Plane, Share2, Trash } from 'lucide-react';
import { Dialogue } from '@allorai/shared-ui';
import { TripSummary } from '../lib/tripService';

type TripCardProps = {
  trip: TripSummary;
};

function TripDetails({ trip }: { trip: TripSummary }) {
  const originIata = trip.departure_flight?.legs?.[0]?.originAirport?.iata;
  return (
    <div className="space-y-4">
      {trip.hotel?.imageUrl && (
        <img
          src={trip.hotel.imageUrl}
          alt={trip.hotel.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      )}
      <div className="space-y-3">
        {(trip.departure_date || trip.return_date) && (
          <div className="flex items-center gap-2 text-gray-700">
            <Calendar size={16} className="shrink-0" />
            <span>
              {trip.departure_date} – {trip.return_date}
            </span>
          </div>
        )}
        {trip.budget != null && (
          <div className="flex items-center gap-2 text-gray-700">
            <DollarSign size={16} className="shrink-0" />
            <span>${trip.budget.toLocaleString()}</span>
          </div>
        )}
        {trip.hotel?.name && (
          <div className="flex items-center gap-2 text-gray-700">
            <BedDouble size={16} className="shrink-0" />
            <span>{trip.hotel.name}</span>
          </div>
        )}
        {originIata && (
          <div className="flex items-center gap-2 text-gray-700">
            <Plane size={16} className="shrink-0" />
            <span>Departing from {originIata}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export function TripCard({ trip }: TripCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <li
        className="border rounded-lg shadow-md overflow-hidden max-w-96 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setIsOpen(true)}
      >
        {trip.hotel?.imageUrl && (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={trip.hotel.imageUrl}
              alt={trip.hotel.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}
        <div className="p-4">
          <p className="text-lg font-semibold">
            {trip.city ?? trip.destination ?? 'Unknown destination'}
          </p>
          {(trip.departure_date || trip.return_date) && (
            <p className="text-sm text-gray-600">
              {trip.departure_date} – {trip.return_date}
            </p>
          )}
          {trip.budget != null && <p className="text-sm text-gray-600">Budget: ${trip.budget}</p>}
          <div className="flex justify-end gap-2">
            <div
              className="w-10 h-10 flex justify-center items-center bg-primary text-white rounded-full pr-1 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Share2 size={24} />
            </div>
            <div
              className="w-10 h-10 flex justify-center items-center bg-primary text-white rounded-full pb-0.5 shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Pencil size={24} />
            </div>
            <div
              className="w-10 h-10 flex justify-center items-center bg-primary text-white rounded-full shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <FileText size={24} />
            </div>
            <div
              className="w-10 h-10 flex justify-center items-center bg-primary text-white rounded-full shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <Trash size={24} />
            </div>
          </div>
        </div>
      </li>

      <Dialogue
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={trip.city ?? trip.destination ?? 'Trip Details'}
        className="max-w-lg"
      >
        <TripDetails trip={trip} />
      </Dialogue>
    </>
  );
}
