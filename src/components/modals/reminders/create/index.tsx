import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useAddExpenseReminder } from "~/db/hooks";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

const defaultValues: SchemaType = {
  date: new Date(new Date().setHours(0, 0, 0, 0)),
  amount: "" as unknown as number,
  category: null,
  isRecurring: false,
  title: "",
};

export const ReminderCreateModal = () => {
  const [modal, setModal] = useState(false);
  const { trigger, isMutating } = useAddExpenseReminder();
  const formOptions = useForm({ defaultValues, resolver: zodResolver(Schema) });
  const { handleSubmit, reset } = formOptions;

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    await trigger(
      {
        amount: values.amount * 100,
        date: values.date.toISOString(),
        category: values.category,
        isRecurring: values.isRecurring,
        title: values.title,
      },
      {
        onSuccess: () => {
          toast.success("Reminder created!");
          reset(defaultValues);
          setModal(false);
        },
        onError: () => {
          toast.error("Reminder creation failed");
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
        title="New Reminder"
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
