import clsx from 'clsx';

const airlineLogoIcon = 'http://localhost:3845/assets/265f6e13bfb9809d94f15e2b96fd385f0bcb3a06.svg';

type FlightOptionProps = {
  className?: string;
  cost?: string;
  flightTime?: string;
  airline?: string;
  duration?: string;
  airports?: string;
};

function Cost({ cost = '$ X,XXX' }: { cost?: string }) {
  return (
    <div className="h-6 font-semibold text-base leading-6 text-[#050315] whitespace-nowrap w-16">
      {cost}
    </div>
  );
}

function AirlineLogo() {
  return (
    <div className="flex items-center justify-center w-8 h-8 border-2 border-[#050315] rounded flex-shrink-0">
      <img alt="Airline" src={airlineLogoIcon} className="w-5 h-5" />
    </div>
  );
}

function FlightDetails({
  flightTime = '00:00 AM - 00:00 PM',
  airline = 'Airline',
}: {
  flightTime?: string;
  airline?: string;
}) {
  return (
    <div className="flex flex-col gap-0">
      <div className="h-6 font-medium text-base leading-6 text-[#050315] whitespace-nowrap">
        {flightTime}
      </div>
      <div className="h-6 font-normal text-base leading-6 text-[#050315] whitespace-nowrap">
        {airline}
      </div>
    </div>
  );
}

function FlightDurationAndAirports({
  duration = '0 hr 00 min',
  airports = 'XYZ - LAX',
}: {
  duration?: string;
  airports?: string;
}) {
  return (
    <div className="flex flex-col gap-0">
      <div className="h-6 font-medium text-base leading-6 text-[#050315] whitespace-nowrap">
        {duration}
      </div>
      <div className="h-6 font-normal text-base leading-6 text-[#050315] whitespace-nowrap">
        {airports}
      </div>
    </div>
  );
}

export default function FlightOption({
  className,
  cost = '$ X,XXX',
  flightTime = '00:00 AM - 00:00 PM',
  airline = 'Airline',
  duration = '0 hr 00 min',
  airports = 'XYZ - LAX',
}: FlightOptionProps) {
  return (
    <div
      className={clsx(
        'flex gap-12 items-center p-6 rounded-[20px]',
        'bg-[rgba(251,251,254,0.75)] border border-black border-solid',
        className
      )}
    >
      <Cost cost={cost} />
      <AirlineLogo />
      <FlightDetails flightTime={flightTime} airline={airline} />
      <FlightDurationAndAirports duration={duration} airports={airports} />
    </div>
  );
}
