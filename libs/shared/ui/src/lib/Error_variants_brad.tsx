import clsx from 'clsx';

type ErrorVariantsProps = {
  className?: string;
  errorType?: 'no_results' | 'invalid_parameters';
  onModifySearch?: () => void;
};

export default function ErrorVariants({
  className,
  errorType = 'no_results',
  onModifySearch,
}: ErrorVariantsProps) {
  const isInvalidParameters = errorType === 'invalid_parameters';
  const isNoResults = errorType === 'no_results';

  const errorContent = isNoResults
    ? {
        title: 'No Results Found',
        description: "I couldn't find any results matching your search criteria.",
        suggestions: [
          'Try adjusting your dates',
          'Expand your search radius',
          'Check for flexible destinations',
          'Consider nearby airports',
        ],
      }
    : {
        title: 'Invalid Search Parameters',
        description: 'There was an issue with your search request. Please check your inputs and try again.',
        suggestions: [
          'Verify your departure and arrival dates',
          'Ensure destination is spelled correctly',
          'Check that dates are in the future',
          'Try selecting from suggested locations',
        ],
      };

  return (
    <div
      className={clsx(
        'flex flex-col gap-6 items-start overflow-hidden p-4 relative rounded-[20px] w-[294px]',
        'bg-[#3358ae]',
        className
      )}
    >
      {/* Error Content */}
      <div className="flex flex-col gap-4 items-start w-full text-white">
        {/* Error Details */}
        <div className="flex flex-col gap-2 items-start w-full">
          <h3 className="text-base font-semibold leading-6">{errorContent.title}</h3>
          <p className="text-xs font-normal leading-4 tracking-[0.18px]">
            {errorContent.description}
          </p>
        </div>

        {/* Suggestions */}
        <div className="flex flex-col gap-2 items-start w-full">
          <p className="text-sm font-medium leading-[21px] tracking-[0.07px]">
            Try these Suggestions:
          </p>
          <ul className="list-disc ml-[18px] text-xs font-normal leading-4 tracking-[0.18px] space-y-0">
            {errorContent.suggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Button */}
      <div className="flex items-center justify-center w-full">
        <button
          onClick={onModifySearch}
          className={clsx(
            'px-3 py-1.5 h-10 rounded-full',
            'bg-black text-white',
            'font-semibold text-sm leading-[21px]',
            'hover:opacity-90 transition-opacity',
            'cursor-pointer'
          )}
        >
          Modify Search
        </button>
      </div>
    </div>
  );
}
