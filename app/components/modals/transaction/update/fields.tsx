import {
  RHFDateField,
  RHFNumberField,
  RHFTextField,
} from "~/components/common/rhf";

type Props = {};

const Fields = (props: Props) => {
  return (
    <div className="mb-10 space-y-3">
      <RHFTextField name="title" label="Title" />
      <RHFNumberField name="amount" label="Amount" />
      <RHFTextField name="category" label="Category" />
      <RHFDateField name="date" label="Date" />
    </div>
  );
};

export default Fields;
