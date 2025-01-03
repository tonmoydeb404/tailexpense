import { format, startOfMonth } from "date-fns";
import { LucideCalendar } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useAppContext } from "~/contexts/app";
import { MonthPicker } from "./month-picker";

type Props = {};

const AppDatePicker = (props: Props) => {
  const { date, updateDate } = useAppContext();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="max-md:p-0 max-md:size-10">
          <LucideCalendar />
          <span className="max-md:hidden">{format(date, "MMMM yyy")}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <MonthPicker
          date={new Date(date)}
          onDateChange={(value) =>
            updateDate(startOfMonth(value).toISOString())
          }
        />
      </PopoverContent>
    </Popover>
  );
};

export default AppDatePicker;
