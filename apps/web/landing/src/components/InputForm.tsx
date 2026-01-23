import { useState } from 'react';

interface CheckboxOption {
  label: string;
  checked: boolean;
}

function CalendarIcon() {
  return (
    <svg
      width="33"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-center gap-1.5 cursor-pointer">
      <div
        onClick={onChange}
        className={`w-[21px] h-[21px] border-2 border-black rounded flex items-center justify-center ${
          checked ? 'bg-white' : 'bg-white'
        }`}
      >
        {checked && (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 12L10 17L19 7"
              stroke="black"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <span className="text-xs font-medium text-black tracking-[0.5px]">
        {label}
      </span>
    </label>
  );
}

export function InputForm() {
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [specialPreferences, setSpecialPreferences] = useState('');

  const [budgetOptions, setBudgetOptions] = useState<CheckboxOption[]>([
    { label: 'Flights', checked: true },
    { label: 'Lodging', checked: true },
    { label: 'Dining', checked: true },
    { label: 'Activities', checked: true },
  ]);

  const [transportOptions, setTransportOptions] = useState<CheckboxOption[]>([
    { label: 'Ride-Share', checked: false },
    { label: 'Public Transportation', checked: false },
    { label: 'Rental Car', checked: false },
    { label: 'None/Not Needed', checked: true },
  ]);

  const toggleBudgetOption = (index: number) => {
    setBudgetOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, checked: !opt.checked } : opt))
    );
  };

  const toggleTransportOption = (index: number) => {
    setTransportOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, checked: !opt.checked } : opt))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      fromCity,
      toCity,
      departureDate,
      arrivalDate,
      budgetOptions: budgetOptions.filter((o) => o.checked).map((o) => o.label),
      transportOptions: transportOptions.filter((o) => o.checked).map((o) => o.label),
      specialPreferences,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#989898] flex flex-col gap-6 p-8 rounded-[20px] w-full"
    >
      <h2 className="text-2xl font-semibold text-white tracking-tight leading-[1.2]">
        Hey Allora, can you help me plan a trip with the following?
      </h2>

      {/* Cities Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-14 w-full">
        <div className="flex flex-1 items-center gap-4">
          <label className="text-xs font-medium text-black tracking-[0.5px]">
            From:
          </label>
          <input
            type="text"
            value={fromCity}
            onChange={(e) => setFromCity(e.target.value)}
            className="flex-1 h-10 bg-white rounded-lg px-3"
          />
        </div>
        <div className="flex flex-1 items-center gap-4">
          <label className="text-xs font-medium text-black tracking-[0.5px]">
            To:
          </label>
          <input
            type="text"
            value={toCity}
            onChange={(e) => setToCity(e.target.value)}
            className="flex-1 h-10 bg-white rounded-lg px-3"
          />
        </div>
      </div>

      {/* Date Picker Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-14 w-full">
        <div className="flex flex-1 items-center gap-4">
          <CalendarIcon />
          <input
            type="text"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            placeholder="MM/DD/YYYY"
            className="flex-1 h-10 bg-white rounded-lg px-3 text-xs font-medium text-[#555] tracking-[0.5px]"
          />
        </div>
        <div className="flex flex-1 items-center gap-4">
          <CalendarIcon />
          <input
            type="text"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            placeholder="MM/DD/YYYY"
            className="flex-1 h-10 bg-white rounded-lg px-3 text-xs font-medium text-[#555] tracking-[0.5px]"
          />
        </div>
      </div>

      {/* Budget Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-xs font-medium text-[#050315] tracking-[0.5px] py-1">
          Budget includes:
        </span>
        <div className="flex flex-wrap items-center gap-6">
          {budgetOptions.map((option, index) => (
            <Checkbox
              key={option.label}
              label={option.label}
              checked={option.checked}
              onChange={() => toggleBudgetOption(index)}
            />
          ))}
        </div>
      </div>

      {/* Ground Transportation Row */}
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-xs font-medium text-[#050315] tracking-[0.5px] py-1">
          Ground Transportation:
        </span>
        <div className="flex flex-wrap items-center gap-6">
          {transportOptions.map((option, index) => (
            <Checkbox
              key={option.label}
              label={option.label}
              checked={option.checked}
              onChange={() => toggleTransportOption(index)}
            />
          ))}
        </div>
      </div>

      {/* Special Preferences */}
      <div className="flex flex-col gap-2 w-full">
        <label className="text-xs font-medium text-black tracking-[0.5px]">
          Special Preferences or Needs: (Ex: Reward Memberships, Specific
          Experiences or Activities, or things to avoid)
        </label>
        <textarea
          value={specialPreferences}
          onChange={(e) => setSpecialPreferences(e.target.value)}
          placeholder="Placeholder text"
          className="w-full min-h-[80px] bg-white rounded-lg p-2.5 text-xs font-medium text-[#555] tracking-[0.5px] resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full min-h-[32px] bg-black text-white text-sm font-semibold rounded-full py-1.5 px-3 tracking-[0.07px] leading-[21px]"
      >
        Thank you, please help me plan this trip.
      </button>
    </form>
  );
}

export default InputForm;
