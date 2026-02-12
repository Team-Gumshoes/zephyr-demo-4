// OLD export type Flight = {
//   id: string;
//   cost: string;
//   airlineLogo?: string;
//   airline: string;
//   departureTime: string;
//   arrivalTime: string;
//   duration: string;
//   departureAirport: string;
//   arrivalAirport: string;
//   date?: string;
// };

import { FlightResults, FlightSegment } from '@allorai/shared-types';
import { formatTime } from '../../utils/formatData';

function SegmentRow({ segment }: { segment: FlightSegment }) {
  return (
    <div className="flex items-center gap-4">
      {/* Flight Time and Airline */}
      <div className="flex flex-col min-w-[160px]">
        <span className="font-medium text-[#050315] text-base leading-6">
          {formatTime(segment.departure.time)} - {formatTime(segment.arrival.time)}
        </span>
        <span className="font-normal text-[#050315] text-base leading-6">{segment.airline}</span>
      </div>

      {/* Flight Path Visual */}
      <div className="flex items-center gap-1">
        <div className="size-2 rounded-full bg-[#F5A623]" />
        <div className="w-16 h-0.5 bg-[#F5A623]" />
        <div className="size-2 rounded-full bg-[#F5A623]" />
      </div>

      {/* Flight Length and Airports */}
      <div className="flex flex-col">
        <span className="font-medium text-[#050315] text-base leading-6">{segment.duration}</span>
        <span className="font-normal text-[#050315] text-base leading-6">
          {segment.departure.airport} - {segment.arrival.airport}
        </span>
      </div>
    </div>
  );
}

const FlightChip = ({ flight }: { flight: FlightResults }) => {
  const leg = flight.legs[0];
  if (!leg) return null;

  const { segments } = leg;
  const isMultiSegment = segments.length > 1;

  return (
    <div className="bg-[rgba(251,251,254,0.75)] border border-black flex items-center justify-between p-6 rounded-[20px] w-full">
      {/* Cost */}
      <div className="font-semibold text-[#050315] text-base whitespace-nowrap mr-4">
        ${flight.price.toLocaleString()} {flight.currency}
      </div>

      {/* Right side: segments */}
      <div className="flex flex-col gap-2">
        {segments.map((segment, i) => (
          <div key={i} className="flex items-center gap-4">
            {/* Leg label for multi-segment */}
            {isMultiSegment && (
              <span className="text-xs font-medium text-[#050315]/60 w-[60px] shrink-0">
                Leg {i + 1}
              </span>
            )}
            <SegmentRow segment={segment} />
          </div>
        ))}

        {/* Total duration for multi-segment */}
        {isMultiSegment && (
          <div className="flex items-center gap-2 pt-1 border-t border-black/10">
            <span className="text-xs font-normal text-[#050315]/60">Total: {leg.legDuration}</span>
            <span className="text-xs font-normal text-[#050315]/60">
              · {segments.length - 1} stop
              {segments.length - 1 > 1 ? 's' : ''} (
              {segments
                .slice(1)
                .map((s) => s.departure.airport)
                .join(', ')}
              )
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightChip;
