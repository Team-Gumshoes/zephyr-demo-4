import clsx from 'clsx';

function Avatar({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        'flex items-center justify-center flex-shrink-0',
        'w-[50px] h-[50px] rounded-full',
        'bg-[#3358ae]',
        className
      )}
    >
      <span className="text-3xl font-semibold text-white tracking-[-1px]">A</span>
    </div>
  );
}

type AlloraErrorMessageProps = {
  className?: string;
  onModifySearch?: () => void;
};

export default function AlloraErrorMessage({
  className,
  onModifySearch,
}: AlloraErrorMessageProps) {
  return (
    <div className={clsx('flex gap-6 items-end', className)}>
      {/* Avatar */}
      <Avatar />

      {/* Error Message Box */}
      <div className="flex flex-col gap-6 items-start overflow-hidden p-4 rounded-[20px] flex-shrink-0 w-[294px] bg-[#3358ae]">
        {/* Error Details */}
        <div className="flex flex-col gap-4 items-start w-full text-white">
          <div className="flex flex-col gap-2 items-start w-full">
            <h3 className="text-base font-semibold leading-6">No Results Found</h3>
            <p className="text-xs font-normal leading-4 tracking-[0.18px]">
              I couldn't find any results matching your search criteria.
            </p>
          </div>

          {/* Suggestions */}
          <div className="flex flex-col gap-2 items-start w-full">
            <p className="text-sm font-medium leading-[21px] tracking-[0.07px]">
              Try these Suggestions:
            </p>
            <ul className="list-disc ml-[18px] text-xs font-normal leading-4 tracking-[0.18px] space-y-0">
              <li>Try adjusting your dates</li>
              <li>Expand your search radius</li>
              <li>Check for flexible destinations</li>
              <li>Consider nearby airports</li>
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
    </div>
  );
}
