import { RHFDateField, RHFNumberField } from "~/components/common/rhf";

type Props = {};

const Fields = (props: Props) => {
  return (
    <div className="mb-10 space-y-3">
      <RHFNumberField name="amount" label="Amount" />
      <RHFDateField name="date" label="Date" />
    </div>
  );
};

export default Fields;
