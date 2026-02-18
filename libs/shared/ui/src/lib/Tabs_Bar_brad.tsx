import clsx from 'clsx';
import { useState } from 'react';

const forkSpoonIcon = 'http://localhost:3845/assets/1b946b49de440bbecb16842ad84f64be2d7a5be4.svg';
const stadiumIcon = 'http://localhost:3845/assets/e27d0845ad63b470b68a57de5f6db1c89674ea09.svg';
const forestIcon = 'http://localhost:3845/assets/b71ca95b903eb8679d11ba79ad14dc1f25c0e9a0.svg';
const arOnYouIcon = 'http://localhost:3845/assets/0e52229fd75a25fbcc2d6cde77dc0ae5dfc47397.svg';

type Tab = {
  id: string;
  label: string;
  icon: string;
  count?: number;
};

type TabsBarProps = {
  className?: string;
  activeTabId?: string;
  tabs?: Tab[];
  onTabChange?: (tabId: string) => void;
};

const defaultTabs: Tab[] = [
  { id: 'restaurants', label: 'Label', icon: forkSpoonIcon, count: 1 },
  { id: 'activities', label: 'Label', icon: stadiumIcon, count: 1 },
  { id: 'nature', label: 'Label', icon: forestIcon, count: 1 },
  { id: 'attractions', label: 'Label', icon: arOnYouIcon, count: 1 },
];

export default function TabsBar({
  className,
  activeTabId = 'restaurants',
  tabs = defaultTabs,
  onTabChange,
}: TabsBarProps) {
  const [active, setActive] = useState(activeTabId);

  const handleTabClick = (tabId: string) => {
    setActive(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-2 p-2 rounded-lg bg-[#75cfcc]',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = active === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={clsx(
              'flex items-center gap-2 px-2.5 py-1.5 rounded-lg min-h-8 min-w-8',
              'transition-all duration-200',
              isActive
                ? 'bg-[#fbfbfe] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.25)] cursor-pointer'
                : 'bg-transparent hover:bg-[rgba(255,255,255,0.1)]'
            )}
          >
            <img
              alt={tab.label}
              src={tab.icon}
              className="w-4 h-4 flex-shrink-0"
            />
            <span
              className={clsx(
                'text-sm font-semibold tracking-wide whitespace-nowrap',
                isActive ? 'text-black' : 'text-black'
              )}
            >
              {tab.label}
            </span>
            {tab.count !== undefined && (
              <div
                className={clsx(
                  'flex items-center justify-center px-1 py-0.5 rounded-full min-w-4 h-4',
                  'text-xs font-semibold tracking-wider',
                  isActive
                    ? 'bg-[#75cfcc] text-[#020617]'
                    : 'bg-[#fbfbfe] text-[#020617]'
                )}
              >
                {tab.count}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
