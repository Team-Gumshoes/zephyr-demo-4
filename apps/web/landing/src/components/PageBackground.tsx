interface PageBackgroundProps {
  children: React.ReactNode;
}

export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="relative min-h-screen bg-[#d9d9d9]">
      {/* Dark ellipse/mountain shape */}
      <div className="absolute bottom-0 left-0 right-0 h-[400px] overflow-hidden pointer-events-none">
        <svg
          viewBox="0 0 1440 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-auto"
          preserveAspectRatio="xMidYMax slice"
        >
          <ellipse
            cx="720"
            cy="600"
            rx="900"
            ry="400"
            fill="#555555"
          />
        </svg>
      </div>
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PageBackground;
