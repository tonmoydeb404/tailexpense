import { TrendingDown, TrendingUp } from "lucide-react";
import moment from "moment";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/lib/utils";
import type { ITransaction } from "~/types/transaction";
import { formatCurrency } from "~/utils/currency";

const items: ITransaction[] = [
  {
    _id: "1",
    title: "Salary",
    type: "INCOME",
    amount: 500000, // Stored as lowest grade (e.g., cents/paisa)
    category: "INCOME",
    date: "2024-12-01T08:30:00Z", // ISO date format
  },
  {
    _id: "2",
    title: "Groceries",
    type: "EXPENSE",
    amount: 7500, // Stored as lowest grade
    category: "Food",
    date: "2024-12-02T10:00:00Z",
  },
  {
    _id: "3",
    title: "Freelance Payment",
    type: "INCOME",
    amount: 200000, // Stored as lowest grade
    category: "Freelance",
    date: "2024-12-03T15:45:00Z",
  },
  {
    _id: "4",
    title: "Electricity Bill",
    type: "EXPENSE",
    amount: 12000, // Stored as lowest grade
    category: "Utilities",
    date: "2024-12-05T18:00:00Z",
  },
  {
    _id: "5",
    title: "Movie Tickets",
    type: "EXPENSE",
    amount: 1500, // Stored as lowest grade
    category: "Entertainment",
    date: "2024-12-06T20:00:00Z",
  },
  {
    _id: "6",
    title: "Gift",
    type: "INCOME",
    amount: 10000, // Stored as lowest grade
    category: "Gift",
    date: "2024-12-07T12:00:00Z",
  },
];

type Props = {};

const RecentSection = (props: Props) => {
  return (
    <div>
      <h3 className="text-sm uppercase mb-3 font-medium text-muted-foreground">
        Recent
      </h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Item data={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default RecentSection;

// ----------------------------------------------------------------------

type ItemProps = {
  data: ITransaction;
};
const Item = (props: ItemProps) => {
  const { data } = props;

  return (
    <Card>
      <CardContent className="py-3 px-4 flex flex-row">
        <div
          className={cn(
            "self-center border p-1.5 rounded mr-4",
            data.type === "EXPENSE" ? "text-red-500" : "",
            data.type === "INCOME" ? "text-green-500" : ""
          )}
        >
          {data.type === "EXPENSE" && <TrendingDown />}
          {data.type === "INCOME" && <TrendingUp />}
        </div>

        <div className="flex-1">
          <h2 className="text-base font-medium">{data.title || "Untitled"}</h2>
          <span className="text-sm text-muted-foreground">
            {moment(data.date).format("DD MMM YYYY")}
          </span>
        </div>

        <h3 className="text-lg font-bold">
          {formatCurrency(data.amount / 100, "BDT")}
        </h3>
      </CardContent>
    </Card>
  );
};
