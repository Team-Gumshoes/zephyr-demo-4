import clsx from 'clsx';

const deleteIcon = 'http://localhost:3845/assets/4ba44a8ec8eb0b9c033030270202383679fc4f97.svg';

type EventOverlayProps = {
  className?: string;
  title?: string;
  tripName?: string;
  onKeepExploring?: () => void;
  onViewPlans?: () => void;
};

export default function EventOverlay({
  className,
  title = 'Event',
  tripName = 'Little Tokyo',
  onKeepExploring,
  onViewPlans,
}: EventOverlayProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-10 items-center justify-center overflow-hidden px-20 py-14 rounded-xl',
        'bg-[#fbfbfe]',
        className
      )}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-32 h-32 rounded-2xl bg-[#52c3bf] flex-shrink-0">
        <img alt="Delete" className="w-20 h-20" src={deleteIcon} />
      </div>

      {/* Title */}
      <h1 className="text-5xl font-semibold leading-[48px] tracking-[-1.5px] text-center">
        {title}
      </h1>

      {/* Description Text */}
      <p className="text-base font-medium leading-6 text-center max-w-[418px] text-black">
        Your <span className="font-semibold">{tripName}</span> trip is officially in the books. We've
        saved your plans to <span className="font-semibold">Plans</span> for you to access anytime.
      </p>

      {/* Buttons */}
      <div className="flex gap-2.5 items-start w-full">
        <button
          onClick={onKeepExploring}
          className={clsx(
            'flex items-center justify-center h-14 px-3 py-1.5 rounded-full flex-shrink-0 w-[217px]',
            'bg-[#fbfbfe] border-2 border-[#002e9a] border-solid',
            'text-sm font-semibold text-[#002e9a] leading-[21px] tracking-[0.07px] text-center',
            'hover:bg-[#f0f0f6] transition-colors cursor-pointer'
          )}
        >
          Keep Exploring
        </button>
        <button
          onClick={onViewPlans}
          className={clsx(
            'flex items-center justify-center h-14 px-3 py-1.5 rounded-full flex-shrink-0 w-[217px]',
            'bg-[#002e9a]',
            'text-sm font-semibold text-white leading-[21px] tracking-[0.07px] text-center',
            'hover:opacity-90 transition-opacity cursor-pointer'
          )}
        >
          View Plans
        </button>
      </div>
    </div>
  );
}
