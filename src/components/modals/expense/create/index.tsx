import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { DialogFooter } from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useAddExpense } from "~/db/hooks/expense";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

const defaultValues: SchemaType = {
  amount: undefined as unknown as number,
  category: "",
  date: new Date(),
  title: "",
};

export const ExpenseCreateModal = () => {
  const [modal, setModal] = useState(false);
  const { trigger, isMutating } = useAddExpense();
  const formOptions = useForm({ defaultValues, resolver: zodResolver(Schema) });
  const { handleSubmit, reset } = formOptions;

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    await trigger(
      {
        ...values,
        date: values.date.toISOString(),
        amount: values.amount * 100,
      },
      {
        onSuccess: () => {
          toast.success("Transaction created!");
          reset(defaultValues);
          setModal(false);
        },
        onError: () => {
          toast.error("Transaction creation failed");
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
        title="New Transaction"
        description="Complete the form to create a new transaction."
        contentProps={{ className: "md:max-w-[425px]" }}
        open={modal}
        onOpenChange={setModal}
      >
        <Form {...formOptions}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fields />
            <DialogFooter>
              <Button type="submit" disabled={isMutating}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </ResponsiveModal>
    </>
  );
};
