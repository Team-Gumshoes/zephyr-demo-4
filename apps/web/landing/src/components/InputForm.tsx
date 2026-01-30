import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CheckboxOption {
  label: string;
  checked: boolean;
}

function CalendarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
    >
      <path
        d="M29.0417 23.9167C29.4947 23.9167 29.9293 23.7367 30.2496 23.4163C30.57 23.0959 30.75 22.6614 30.75 22.2083C30.75 21.7553 30.57 21.3207 30.2496 21.0004C29.9293 20.68 29.4947 20.5 29.0417 20.5C28.5886 20.5 28.1541 20.68 27.8337 21.0004C27.5133 21.3207 27.3333 21.7553 27.3333 22.2083C27.3333 22.6614 27.5133 23.0959 27.8337 23.4163C28.1541 23.7367 28.5886 23.9167 29.0417 23.9167ZM29.0417 30.75C29.4947 30.75 29.9293 30.57 30.2496 30.2496C30.57 29.9293 30.75 29.4947 30.75 29.0417C30.75 28.5886 30.57 28.1541 30.2496 27.8337C29.9293 27.5133 29.4947 27.3333 29.0417 27.3333C28.5886 27.3333 28.1541 27.5133 27.8337 27.8337C27.5133 28.1541 27.3333 28.5886 27.3333 29.0417C27.3333 29.4947 27.5133 29.9293 27.8337 30.2496C28.1541 30.57 28.5886 30.75 29.0417 30.75ZM22.2083 22.2083C22.2083 22.6614 22.0283 23.0959 21.708 23.4163C21.3876 23.7367 20.9531 23.9167 20.5 23.9167C20.0469 23.9167 19.6124 23.7367 19.292 23.4163C18.9717 23.0959 18.7917 22.6614 18.7917 22.2083C18.7917 21.7553 18.9717 21.3207 19.292 21.0004C19.6124 20.68 20.0469 20.5 20.5 20.5C20.9531 20.5 21.3876 20.68 21.708 21.0004C22.0283 21.3207 22.2083 21.7553 22.2083 22.2083ZM22.2083 29.0417C22.2083 29.4947 22.0283 29.9293 21.708 30.2496C21.3876 30.57 20.9531 30.75 20.5 30.75C20.0469 30.75 19.6124 30.57 19.292 30.2496C18.9717 29.9293 18.7917 29.4947 18.7917 29.0417C18.7917 28.5886 18.9717 28.1541 19.292 27.8337C19.6124 27.5133 20.0469 27.3333 20.5 27.3333C20.9531 27.3333 21.3876 27.5133 21.708 27.8337C22.0283 28.1541 22.2083 28.5886 22.2083 29.0417ZM11.9583 23.9167C12.4114 23.9167 12.8459 23.7367 13.1663 23.4163C13.4867 23.0959 13.6667 22.6614 13.6667 22.2083C13.6667 21.7553 13.4867 21.3207 13.1663 21.0004C12.8459 20.68 12.4114 20.5 11.9583 20.5C11.5053 20.5 11.0707 20.68 10.7504 21.0004C10.43 21.3207 10.25 21.7553 10.25 22.2083C10.25 22.6614 10.43 23.0959 10.7504 23.4163C11.0707 23.7367 11.5053 23.9167 11.9583 23.9167ZM11.9583 30.75C12.4114 30.75 12.8459 30.57 13.1663 30.2496C13.4867 29.9293 13.6667 29.4947 13.6667 29.0417C13.6667 28.5886 13.4867 28.1541 13.1663 27.8337C12.8459 27.5133 12.4114 27.3333 11.9583 27.3333C11.5053 27.3333 11.0707 27.5133 10.7504 27.8337C10.43 28.1541 10.25 28.5886 10.25 29.0417C10.25 29.4947 10.43 29.9293 10.7504 30.2496C11.0707 30.57 11.5053 30.75 11.9583 30.75Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9584 2.9895C12.2982 2.9895 12.6241 3.12449 12.8643 3.36477C13.1046 3.60505 13.2396 3.93094 13.2396 4.27075V5.57421C14.3705 5.552 15.6159 5.552 16.986 5.552H24.0124C25.3841 5.552 26.6295 5.552 27.7604 5.57421V4.27075C27.7604 3.93094 27.8954 3.60505 28.1357 3.36477C28.376 3.12449 28.7019 2.9895 29.0417 2.9895C29.3815 2.9895 29.7074 3.12449 29.9477 3.36477C30.188 3.60505 30.3229 3.93094 30.3229 4.27075V5.68354C30.7671 5.71771 31.1879 5.76099 31.5854 5.81338C33.5876 6.08329 35.2088 6.65046 36.4883 7.92829C37.7661 9.20784 38.3333 10.829 38.6032 12.8312C38.8646 14.7787 38.8646 17.2643 38.8646 20.4043V24.0123C38.8646 27.1522 38.8646 29.6395 38.6032 31.5853C38.3333 33.5875 37.7661 35.2087 36.4883 36.4882C35.2088 37.766 33.5876 38.3332 31.5854 38.6031C29.6379 38.8645 27.1523 38.8645 24.0124 38.8645H16.9894C13.8495 38.8645 11.3621 38.8645 9.41635 38.6031C7.41419 38.3332 5.79298 37.766 4.51344 36.4882C3.2356 35.2087 2.66844 33.5875 2.39852 31.5853C2.13715 29.6378 2.13715 27.1522 2.13715 24.0123V20.4043C2.13715 17.2643 2.13715 14.777 2.39852 12.8312C2.66844 10.829 3.2356 9.20784 4.51344 7.92829C5.79298 6.65046 7.41419 6.08329 9.41635 5.81338C9.81497 5.76099 10.2358 5.71771 10.6788 5.68354V4.27075C10.6788 3.93124 10.8136 3.60561 11.0535 3.36537C11.2934 3.12514 11.6188 2.98995 11.9584 2.9895ZM9.7546 8.35367C8.03773 8.58429 7.0469 9.01821 6.32427 9.74084C5.60165 10.4635 5.16773 11.4543 4.9371 13.1712C4.89838 13.4616 4.86535 13.7685 4.83802 14.092H36.162C36.1347 13.7685 36.1017 13.461 36.0629 13.1695C35.8323 11.4526 35.3984 10.4618 34.6758 9.73913C33.9531 9.0165 32.9623 8.58259 31.2437 8.35196C29.4893 8.11621 27.1745 8.11279 23.9167 8.11279H17.0834C13.8256 8.11279 11.5125 8.11792 9.7546 8.35367ZM4.69794 20.4999C4.69794 19.041 4.69794 17.7717 4.72015 16.6562H36.2799C36.3021 17.7717 36.3021 19.041 36.3021 20.4999V23.9166C36.3021 27.1744 36.2987 29.4892 36.0629 31.2453C35.8323 32.9622 35.3984 33.953 34.6758 34.6757C33.9531 35.3983 32.9623 35.8322 31.2437 36.0628C29.4893 36.2986 27.1745 36.302 23.9167 36.302H17.0834C13.8256 36.302 11.5125 36.2986 9.7546 36.0628C8.03773 35.8322 7.0469 35.3983 6.32427 34.6757C5.60165 33.953 5.16773 32.9622 4.9371 31.2436C4.70135 29.4892 4.69794 27.1744 4.69794 23.9166V20.4999Z"
        fill="black"
      />
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
  const navigate = useNavigate();
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
      prev.map((opt, i) =>
        i === index ? { ...opt, checked: !opt.checked } : opt,
      ),
    );
  };

  const toggleTransportOption = (index: number) => {
    setTransportOptions((prev) =>
      prev.map((opt, i) =>
        i === index ? { ...opt, checked: !opt.checked } : opt,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set('fromCity', fromCity);
    params.set('toCity', toCity);
    params.set('departureDate', departureDate);
    params.set('arrivalDate', arrivalDate);
    params.set(
      'budgetIncludes',
      budgetOptions
        .filter((o) => o.checked)
        .map((o) => o.label)
        .join(',')
    );
    params.set(
      'transportation',
      transportOptions
        .filter((o) => o.checked)
        .map((o) => o.label)
        .join(',')
    );
    if (specialPreferences) {
      params.set('preferences', specialPreferences);
    }

    navigate(`/chat?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#CCD5EB] flex flex-col gap-6 p-8 rounded-[20px] w-full"
    >
      <h2 className="text-2xl font-semibold text-black tracking-tight leading-[1.2]">
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
            className="flex-1 h-10 bg-white text-black rounded-lg px-3"
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
            className="flex-1 h-10 bg-white text-black rounded-lg px-3"
          />
        </div>
      </div>

      {/* Date Picker Row */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-14 w-full">
        <div className="flex flex-1 items-center gap-4">
          <CalendarIcon />
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            placeholder="MM/DD/YYYY"
            className="flex-1 h-10 bg-white rounded-lg px-3 text-xs font-medium text-[#555] tracking-[0.5px]"
          />
        </div>
        <div className="flex flex-1 items-center gap-4">
          <CalendarIcon />
          <input
            type="date"
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
        className="w-full min-h-[32px] bg-[#002E9A] text-white text-sm font-semibold rounded-full py-1.5 px-3 tracking-[0.07px] leading-[21px]"
      >
        Thank you, please help me plan this trip.
      </button>
    </form>
  );
}

export default InputForm;
