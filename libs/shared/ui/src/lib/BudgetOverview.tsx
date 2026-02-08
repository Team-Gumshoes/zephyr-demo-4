import clsx from 'clsx';

type BudgetLineItem = {
  label: string;
  amount: number;
};

type BudgetOverviewProps = {
  items: BudgetLineItem[];
  className?: string;
};

const formatCurrency = (amount: number) =>
  `$${amount.toLocaleString()}`;

export const BudgetOverview = ({ items, className = '' }: BudgetOverviewProps) => {
  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div
      className={clsx(
        'flex flex-col gap-2 rounded-[10px] border-2 border-black bg-[#fbfbfe] p-4 shadow-md',
        className,
      )}
    >
      <h3 className="text-base font-semibold leading-6 text-[#002e9a]">
        Budget Overview
      </h3>

      <div className="flex flex-col gap-3 text-xs font-semibold tracking-wide text-black">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex w-[240px] items-center justify-between"
          >
            <span className="leading-4">{item.label}</span>
            <span className="leading-4">{formatCurrency(item.amount)}</span>
          </div>
        ))}

        <div className="flex w-[240px] items-center justify-between border-t border-black pt-3">
          <span className="leading-4">Est. Total Budget</span>
          <span className="leading-4">{formatCurrency(total)}</span>
        </div>
      </div>
    </div>
  );
};

export default BudgetOverview;
