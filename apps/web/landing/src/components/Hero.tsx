import {
  Card,
  SmartPlanningIcon,
  FlexibleOptionsIcon,
  StepByStepIcon,
} from './Card';

interface HeroProps {
  title: string;
  subtitle: string;
  features?: { title: string; description: string; icon: React.ReactNode }[];
}

export function Hero({ title, subtitle, features }: HeroProps) {
  const defaultFeatures = [
    {
      title: 'Smart Planning',
      description:
        'Allora AI considers your budget, preferences, and travel style',
      icon: <SmartPlanningIcon />,
    },
    {
      title: 'Flexible Options',
      description:
        'View and select the exact activities for your best travel experience',
      icon: <FlexibleOptionsIcon />,
    },
    {
      title: 'Step by Step',
      description:
        'Plan your trip step by step. Allora guides decision-making with expertise',
      icon: <StepByStepIcon />,
    },
  ];

  const featureList = features ?? defaultFeatures;

  return (
    <section className="flex flex-col items-center gap-10 mt-[48px]">
      <h1 className="text-5xl md:text-7xl font-bold leading-[1.2] tracking-tight text-center">
        {title}
      </h1>
      <p className="text-2xl md:text-[32px] font-normal leading-[1.2] text-center">
        {subtitle}
      </p>
      <div className="flex flex-col md:flex-row gap-5 w-full max-w-[800px]">
        {featureList.map((feature, index) => (
          <Card
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            className="flex-1"
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
