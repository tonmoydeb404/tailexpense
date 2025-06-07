import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { useAppContext } from "~/contexts/app";
import { formatCurrency } from "~/utils/currency";

type Props = {
  title: string;
  amount: number;
  increment: number;
};

const StatCard = (props: Props) => {
  const { amount, title, increment } = props;
  const { currency } = useAppContext();
  return (
    <Card>
      <CardHeader className="p-4">
        <span className="uppercase text-sm text-muted-foreground font-semibold">
          {title}
        </span>
        <h1 className="text-2xl font-bold">
          {formatCurrency(amount / 100, currency)}
        </h1>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <Badge variant={"outline-solid"}>{increment.toFixed(2)}%</Badge>
          <span className="text-muted-foreground text-sm">
            than a month ago
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
