import { RHFComboField, RHFTextField } from "~/components/common/rhf";
import { Label } from "~/components/ui/label";
import countries from "~/data/countries.json";

type Props = {};

const Fields = (props: Props) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-2 mb-4 sm:mb-3">
        <Label className="inline-block font-normal min-w-[110px]">Name: </Label>
        <RHFTextField name="name" className="flex-1" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-2 mb-4 sm:mb-5">
        <Label className="inline-block font-normal min-w-[110px]">
          Currency:{" "}
        </Label>
        <RHFComboField
          options={countries
            .filter((item) => typeof item.currency === "string")
            .reduce(
              (prev, curr) =>
                prev.includes(curr.currency) ? prev : [...prev, curr.currency],
              [] as string[]
            )
            .map((item) => ({ label: item, value: item }))}
          name="currency"
          placeholder="Search Currency"
          emptyPlaceholder="Currency not found"
          queryPlaceholder="Search for currency"
        />
      </div>
    </>
  );
};

export default Fields;
