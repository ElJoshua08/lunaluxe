import { NumberTicker } from '@/components/ui/number-ticker';

export const TotalCustomers = ({
  totalCustomers = 0,
}: {
  totalCustomers: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-x-8 px-32 relative ">
      <span className="inline-flex relative items-center justify-center font-italianno">
        <span className="text-[250px] absolute -top-[50px] -left-[50px] text-primary">
          +
        </span>
        <NumberTicker
          value={totalCustomers}
          className="text-[300px] text-secondary tracking-tighter"
        />
      </span>
      <p>Happy customers.</p>
    </div>
  );
};
