import { Activity } from '@allorai/shared-types';

type ViewDetailsProps = {
  activity: Activity;
};

export const ViewDetails = ({ activity }: ViewDetailsProps) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-6 font-semibold text-xl text-black">
        <span>Los Angeles, CA</span>
        <span>Est. Cost: {activity.estimatedCost}</span>
      </div>

      {/* Description */}
      <p className="text-base font-normal leading-6 text-black">{activity.description}</p>

      {/* Photos */}
      {activity.imageUrl && (
        <div className="flex gap-6">
          {activity.imageUrl.map((image, i) => (
            <div key={i} className="h-[147px] w-[218px] overflow-hidden rounded-xl">
              <img
                src={image}
                alt={`${activity.title} ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Contact info */}
      <div className="flex flex-wrap gap-11 text-black">
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Address</h4>
          <p className="text-base font-medium leading-6">
            12345 Goofy Ln
            <br />
            Los Angeles, CA 12456
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Website</h4>
          <p className="text-base font-medium leading-6">www.website.com</p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Phone</h4>
          <p className="text-base font-medium leading-6">888-888-8888</p>
        </div>
      </div>
    </div>
  );
};
