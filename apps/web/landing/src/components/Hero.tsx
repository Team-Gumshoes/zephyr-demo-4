import { Card } from './Card';

interface HeroProps {
  title: string;
  subtitle: string;
  features?: { title: string; description: string }[];
}

export function Hero({ title, subtitle, features }: HeroProps) {
  const defaultFeatures = [
    { title: 'Feature', description: 'Description' },
    { title: 'Feature', description: 'Description' },
    { title: 'Feature', description: 'Description' },
  ];

  const featureList = features ?? defaultFeatures;

  return (
    <section className="flex flex-col items-center gap-10">
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
            title={feature.title}
            description={feature.description}
            className="flex-1 bg-white"
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
