import { RHFColorField, RHFTextField } from "~/components/common/rhf";

type Props = {};

const Fields = (props: Props) => {
  return (
    <div className="mb-10 space-y-3">
      <RHFTextField name="name" label="Name" />
      <RHFColorField name="color" label="Color" />
    </div>
  );
};

export default Fields;
