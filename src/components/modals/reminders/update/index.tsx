import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useEditExpenseReminder } from "~/db/hooks";
import { IExpenseReminder } from "~/types/expense";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

type Props = {
  data: IExpenseReminder | null;
  onClose: () => void;
};

export const ReminderUpdateModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useEditExpenseReminder();

  const defaultValues: SchemaType = useMemo(
    () => ({
      amount: data?.amount ? data.amount / 100 : ("" as unknown as number),
      date: data?.date
        ? new Date(new Date(data.date).setHours(0, 0, 0, 0))
        : new Date(),
      category: data?.category ?? null,
      isRecurring: data?.isRecurring || false,
      title: data?.title ?? "",
    }),
    [data]
  );

  const formOptions = useForm({ defaultValues, resolver: zodResolver(Schema) });
  const { handleSubmit, reset } = formOptions;

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    if (!data) return;

    await trigger(
      {
        id: data._id,
        updates: {
          amount: values.amount ? values.amount * 100 : undefined,
          date: values.date ? values.date.toISOString() : undefined,
          category: values.category,
          isRecurring: values.isRecurring,
          title: values.title,
        },
      },
      {
        onSuccess: () => {
          toast.success("Reminder updated!");
          reset();
          onClose();
        },
        onError: () => {
          toast.error("Reminder update failed");
        },
      }
    );
  };

  useEffect(() => {
    reset(defaultValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValues]);

  return (
    <ResponsiveModal
      title="Update Reminder"
      description=""
      contentProps={{ className: "md:max-w-[425px]" }}
      open={!!data}
      onOpenChange={onClose}
    >
      <Form {...formOptions}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fields />
          <div className="text-right">
            <Button
              className="w-full md:w-auto"
              type="submit"
              disabled={isMutating}
            >
              Update
            </Button>
          </div>
        </form>
      </Form>
    </ResponsiveModal>
  );
};
