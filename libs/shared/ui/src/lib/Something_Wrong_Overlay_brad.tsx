import clsx from 'clsx';

const errorIcon = 'http://localhost:3845/assets/d0b6c1491bf8b233a4fe341ecabee3c05e1db992.svg';

type SomethingWrongOverlayProps = {
  className?: string;
  title?: string;
  description?: string;
  suggestions?: string[];
  onTryAgain?: () => void;
};

export default function SomethingWrongOverlay({
  className,
  title = 'Something Went Wrong',
  description = "We're having trouble connecting to our servers. Please try again in a moment.",
  suggestions = [
    'Check your internet connection',
    'Refresh the page',
    'Try again in a few minutes',
  ],
  onTryAgain,
}: SomethingWrongOverlayProps) {
  return (
    <div
      className={clsx(
        'flex flex-col gap-6 items-center overflow-hidden px-16 py-10 rounded-[20px]',
        'bg-[#fbfbfe]',
        'w-[422px]',
        className
      )}
    >
      {/* Error Details */}
      <div className="flex flex-col gap-4 items-center w-full">
        {/* Error Icon */}
        <div className="flex items-center justify-center p-0.5 rounded-[40px] flex-shrink-0 w-16 h-16 bg-[#75cfcc]">
          <img alt="Error" className="w-9 h-9" src={errorIcon} />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-semibold leading-[28.8px] tracking-[-1px] text-center text-black">
          {title}
        </h2>

        {/* Description */}
        <p className="text-xs font-normal leading-4 text-center text-black tracking-[0.18px]">
          {description}
        </p>
      </div>

      {/* Suggestions */}
      <div className="flex flex-col gap-2 items-start w-full text-black">
        <h3 className="text-sm font-semibold leading-normal tracking-[0.07px]">
          Try these Suggestions:
        </h3>
        <ul className="list-disc ml-[18px] text-xs font-normal leading-4 tracking-[0.18px]">
          {suggestions.map((suggestion, index) => (
            <li key={index} className={clsx('mb-0', index === suggestions.length - 1 && 'mb-0')}>
              {suggestion}
            </li>
          ))}
        </ul>
      </div>

      {/* Button */}
      <div className="flex items-center justify-center w-full">
        <button
          onClick={onTryAgain}
          className={clsx(
            'flex items-center justify-center h-10 px-3 py-1.5 rounded-full',
            'bg-[#002e9a] text-white',
            'text-sm font-semibold leading-[21px] tracking-[0.07px] text-center',
            'hover:opacity-90 transition-opacity cursor-pointer',
            'w-[140px]'
          )}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
