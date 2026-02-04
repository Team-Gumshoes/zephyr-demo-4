import clsx from 'clsx';

type BudgetItem = {
  label: string;
  amount: string;
};

type BudgetOverviewProps = {
  className?: string;
  title?: string;
  flights?: string;
  hotels?: string;
  transportation?: string;
  experiences?: string;
  totalBudget?: string;
  items?: BudgetItem[];
};

export default function BudgetOverview({
  className,
  title = 'Budget Overview',
  flights = '$0',
  hotels = '$0',
  transportation = '$0',
  experiences = '$0',
  totalBudget = '$0',
  items,
}: BudgetOverviewProps) {
  // Use provided items or default items
  const budgetItems = items || [
    { label: 'Flights', amount: flights },
    { label: 'Hotels', amount: hotels },
    { label: 'Transportation', amount: transportation },
    { label: 'Experiences', amount: experiences },
  ];

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 items-start p-4 rounded-[10px]',
        'bg-[#fbfbfe] border-2 border-black border-solid',
        'shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
        'w-[272px]',
        className
      )}
    >
      {/* Title */}
      <h3 className="text-base font-semibold leading-6 text-[#002e9a] w-full">
        {title}
      </h3>

      {/* Budget Details */}
      <div className="flex flex-col gap-3 items-start text-xs font-semibold leading-4 text-black tracking-[0.18px] w-full text-center whitespace-nowrap">
        {/* Budget Items */}
        {budgetItems.map((item, index) => (
          <div key={index} className="flex items-center justify-between w-60">
            <div className="leading-4">{item.label}</div>
            <div className="leading-4">{item.amount}</div>
          </div>
        ))}

        {/* Divider and Total */}
        <div className="border-t border-black w-60 pt-3 flex items-center justify-between">
          <div className="leading-4">Est. Total Budget</div>
          <div className="leading-4">{totalBudget}</div>
        </div>
      </div>
    </div>
  );
}
