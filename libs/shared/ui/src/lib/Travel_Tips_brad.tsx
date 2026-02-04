import clsx from 'clsx';

const lightbulbIcon = 'http://localhost:3845/assets/d238fe5982a904504d021e46964dddd4df092d90.svg';

type TravelTipsProps = {
  className?: string;
  title?: string;
  tips?: Array<{
    heading: string;
    content: string;
  }>;
};

function Lightbulb() {
  return (
    <div className="flex items-center justify-center px-1.5 py-0.5 rounded-[10px] flex-shrink-0 w-8 h-8 bg-[#75cfcc]">
      <img alt="Lightbulb" className="w-3 h-[18px]" src={lightbulbIcon} />
    </div>
  );
}

export default function TravelTips({
  className,
  title = 'Travel Tips',
  tips = [
    {
      heading: 'Transportation:',
      content:
        ' The Little Tokyo/Arts District Station (A and E Lines) is the most convenient way to arrive, dropping you off directly in the heart of the neighborhood. If you must drive, the parking structures at Japanese Village Plaza and Weller Court are reliable, though they can be expensive without validation.',
    },
    {
      heading: 'When to Visit:',
      content:
        ' Weekends are bustling and offer a lively atmosphere, but if you want to avoid hour-long waits for ramen and udon, aim for a weekday lunch. August is particularly special due to the Nisei Week Japanese Festival, which features parades, martial arts, and cultural exhibits.',
    },
    {
      heading: 'Safety and Proximity:',
      content:
        ' Little Tokyo is adjacent to Skid Row. While the main shopping and dining areas are generally safe and well-trafficked, be mindful of your surroundings, especially if walking south or east after dark.',
    },
  ],
}: TravelTipsProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-end p-4 rounded-[10px]',
        'bg-[#fbfbfe] border-2 border-black border-solid',
        'shadow-[0px_4px_4px_rgba(0,0,0,0.25)]',
        'w-[273px]',
        className
      )}
    >
      <div className="flex flex-col gap-3.5 items-start w-full">
        {/* Header */}
        <div className="flex gap-2 items-center w-full">
          <Lightbulb />
          <h3 className="flex-1 text-base font-semibold leading-6 text-black">
            {title}
          </h3>
        </div>

        {/* Tips Content */}
        <div className="flex flex-col gap-0 text-xs font-normal leading-4 text-black tracking-[0.18px] w-full">
          {tips.map((tip, index) => (
            <p key={index} className={clsx('mb-3', index === tips.length - 1 && 'mb-0')}>
              <span className="font-semibold tracking-[0.18px]">{tip.heading}</span>
              <span className="leading-4">{tip.content}</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
