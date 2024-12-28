import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { months, yearGenerator } from "./data";

type Props = {
  value: Date;
  onChange: (value: Date) => void;
  disabled?: boolean;
};

const Field = (props: Props) => {
  const { value, onChange, disabled } = props;
  const month = value.getMonth() + 1;
  const year = value.getFullYear();

  const onMonthChange = (v: number) => {
    onChange(new Date(value.setMonth(v - 1)));
  };

  const onYearChange = (v: number) => {
    onChange(new Date(value.setFullYear(v)));
  };
  return (
    <div className="flex items-center gap-2">
      <Select
        value={String(month)}
        onValueChange={(value) => onMonthChange(Number(value))}
        disabled={disabled}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((item) => (
            <SelectItem value={String(item.index)}>{item.month}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={String(year)}
        onValueChange={(value) => onYearChange(Number(value))}
        disabled={disabled}
      >
        <SelectTrigger className="flex-1">
          <SelectValue placeholder="Select Year" />
        </SelectTrigger>
        <SelectContent>
          {[...yearGenerator(2000)].map((item) => (
            <SelectItem value={String(item)}>{item}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default Field;
