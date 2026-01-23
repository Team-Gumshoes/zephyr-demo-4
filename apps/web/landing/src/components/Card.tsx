interface CardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

function DefaultIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="18" fill="#050315" />
      <line x1="10" y1="30" x2="30" y2="10" stroke="white" strokeWidth="2" />
      <line x1="10" y1="24" x2="24" y2="10" stroke="white" strokeWidth="2" />
      <line x1="10" y1="18" x2="18" y2="10" stroke="white" strokeWidth="2" />
      <line x1="16" y1="30" x2="30" y2="16" stroke="white" strokeWidth="2" />
      <line x1="22" y1="30" x2="30" y2="22" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export function Card({ icon, title, description, className = '' }: CardProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 p-[30px] border border-black rounded-2xl ${className}`}
    >
      <div className="w-10 h-10 shrink-0">{icon ?? <DefaultIcon />}</div>
      <p className="text-base font-semibold text-[#050315] text-center leading-[1.4]">
        {title}
      </p>
      <p className="text-base font-normal text-[#050315] text-center leading-[1.4]">
        {description}
      </p>
    </div>
  );
}

export default Card;
