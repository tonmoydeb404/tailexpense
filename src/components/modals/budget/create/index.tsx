import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useAddBudget } from "~/db/hooks";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

const defaultValues: SchemaType = {
  month: new Date(new Date().setHours(0, 0, 0, 0)),
  amount: "" as unknown as number,
};

export const BudgetCreateModal = () => {
  const [modal, setModal] = useState(false);
  const { trigger, isMutating } = useAddBudget();
  const formOptions = useForm({ defaultValues, resolver: zodResolver(Schema) });
  const { handleSubmit, reset } = formOptions;

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    await trigger(
      {
        amount: values.amount * 100,
        month: values.month.toISOString(),
      },
      {
        onSuccess: () => {
          toast.success("Budget created!");
          reset(defaultValues);
          setModal(false);
        },
        onError: () => {
          toast.error("Budget creation failed");
        },
      }
    );
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setModal(true)}>
        Add New
      </Button>
      <ResponsiveModal
        title="New Budget"
        description=""
        contentProps={{ className: "md:max-w-[425px]" }}
        open={modal}
        onOpenChange={setModal}
      >
        <Form {...formOptions}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fields />
            <div className="text-right">
              <Button
                type="submit"
                disabled={isMutating}
                className="w-full md:w-auto"
              >
                Create
              </Button>
            </div>
          </form>
        </Form>
      </ResponsiveModal>
    </>
  );
};
