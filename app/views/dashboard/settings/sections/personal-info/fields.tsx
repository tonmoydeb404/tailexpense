import { RHFComboField, RHFTextField } from "~/components/common/rhf";
import { Label } from "~/components/ui/label";
import countries from "~/data/countries.json";

type Props = {};

const Fields = (props: Props) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-2 mb-4 sm:mb-3">
        <Label className="inline-block font-normal min-w-[110px]">
          Your Name:{" "}
        </Label>
        <RHFTextField name="name" className="flex-1" />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-2 mb-4 sm:mb-5">
        <Label className="inline-block font-normal min-w-[110px]">
          Your Country:{" "}
        </Label>
        <RHFComboField
          options={countries
            .filter((item) => item.currency)
            .map((item) => ({ label: item.name, value: item.name }))}
          name="currency"
          placeholder="Search Country"
          emptyPlaceholder="Country not found"
          queryPlaceholder="Search for country"
        />
      </div>
    </>
  );
};

export default Fields;
