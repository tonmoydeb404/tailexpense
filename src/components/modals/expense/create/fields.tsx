import {
  RHFDateField,
  RHFNumberField,
  RHFTextField,
} from "~/components/common/rhf";
import CategoryField from "../common/category-field";

type Props = {};

const Fields = (_props: Props) => {
  return (
    <div className="mb-10 space-y-3">
      <RHFTextField name="title" label="Title" />
      <RHFNumberField name="amount" label="Amount" />
      <CategoryField />
      <RHFDateField name="date" label="Date" />
    </div>
  );
};

export default Fields;
