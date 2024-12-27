import { RHFDateField, RHFNumberField } from "~/components/common/rhf";

type Props = {};

const Fields = (props: Props) => {
  return (
    <div className="mb-10 space-y-3">
      <RHFDateField name="month" label="Month" disabled />
      <RHFNumberField name="amount" label="Amount" />
    </div>
  );
};

export default Fields;
