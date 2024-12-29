import { addYears, format, setMonth, subYears } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface MonthPickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  className?: string;
}

export function MonthPicker({
  date,
  onDateChange,
  className,
}: MonthPickerProps) {
  const handlePrevYear = () => onDateChange(subYears(date, 1));
  const handleNextYear = () => onDateChange(addYears(date, 1));

  const handleMonthSelect = (month: number) => {
    onDateChange(setMonth(date, month));
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className={cn("w-full max-w-sm mx-auto", className)}>
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevYear}
          aria-label="Previous year"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="text-lg font-semibold">{format(date, "yyyy")}</div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextYear}
          aria-label="Next year"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <Button
            key={month}
            variant={date.getMonth() === index ? "default" : "secondary"}
            className="w-full"
            size="sm"
            onClick={() => handleMonthSelect(index)}
          >
            {month}
          </Button>
        ))}
      </div>
    </div>
  );
}
