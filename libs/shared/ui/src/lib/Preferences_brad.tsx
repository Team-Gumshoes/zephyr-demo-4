import { useState } from 'react';
import clsx from 'clsx';

const checkboxIcon = 'http://localhost:3845/assets/52f90c09d3de2b25a2e6f393d70ed0f69d953c69.svg';

type CheckboxProps = {
  className?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

function Checkbox({ className, checked = false, onChange }: CheckboxProps) {
  return (
    <label className={clsx('flex items-center cursor-pointer', className)}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="sr-only"
      />
      <div className="relative w-5 h-5 border-2 border-black rounded flex items-center justify-center hover:bg-gray-100 transition-colors">
        {checked && (
          <img alt="checked" className="w-full h-full" src={checkboxIcon} />
        )}
      </div>
    </label>
  );
}

type OptionProps = {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
};

function Option({ label, checked = false, onChange }: OptionProps) {
  return (
    <div className="flex gap-2.5 items-center">
      <Checkbox checked={checked} onChange={onChange} />
      <span className="text-base font-normal text-black leading-6">{label}</span>
    </div>
  );
}

export default function Preferences({ className }: { className?: string }) {
  const [preferences, setPreferences] = useState({
    budgetFocused1: false,
    budgetFocused2: false,
    budgetFocused3: false,
  });

  const handleChange = (key: keyof typeof preferences, value: boolean) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={clsx('flex flex-col gap-1 w-[275px]', className)}>
      <h3 className="text-base font-semibold text-black leading-6 mb-1">Flight Preferences</h3>
      <Option
        label="Budget-focused (layovers likely)"
        checked={preferences.budgetFocused1}
        onChange={(value) => handleChange('budgetFocused1', value)}
      />
      <Option
        label="Budget-focused (layovers likely)"
        checked={preferences.budgetFocused2}
        onChange={(value) => handleChange('budgetFocused2', value)}
      />
      <Option
        label="Budget-focused (layovers likely)"
        checked={preferences.budgetFocused3}
        onChange={(value) => handleChange('budgetFocused3', value)}
      />
    </div>
  );
}
