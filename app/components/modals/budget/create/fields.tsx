import { RHFMonthField, RHFNumberField } from "~/components/common/rhf";

type Props = {};

const Fields = (props: Props) => {
  return (
    <div className="mb-10 space-y-3">
      <RHFMonthField name="month" label="Month" />
      <RHFNumberField name="amount" label="Amount" />
    </div>
  );
};

export default Fields;
