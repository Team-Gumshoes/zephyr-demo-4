interface PageBackgroundProps {
  children: React.ReactNode;
}

export function PageBackground({ children }: PageBackgroundProps) {
  return (
    <div className="bg-landing relative min-h-screen text-white">
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default PageBackground;
