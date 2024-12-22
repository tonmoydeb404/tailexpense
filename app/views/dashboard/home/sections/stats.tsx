import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { formatCurrency } from "~/utils/currency";

type Props = {};

const StatsSection = (props: Props) => {
  return (
    <div className="mb-10">
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Stats
      </h3>
      <div className="grid grid-cols-3 w-full gap-3">
        <Item title="budget" amount={28500 * 100} />
        <Item title="balance" amount={15180 * 100} />
        <Item title="expenses" amount={10312 * 100} />
      </div>
    </div>
  );
};

export default StatsSection;

// ----------------------------------------------------------------------

type ItemProps = {
  title: string;
  amount: number;
};
const Item = (props: ItemProps) => {
  const { amount, title } = props;
  return (
    <Card>
      <CardHeader className="p-4">
        <span className="uppercase text-sm text-muted-foreground font-semibold">
          {title}
        </span>
        <h1 className="text-2xl font-bold">
          {formatCurrency(amount / 100, "BDT")}
        </h1>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <Badge variant={"outline"}>+3.15%</Badge>
          <span className="text-muted-foreground text-sm">
            than a month ago
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
