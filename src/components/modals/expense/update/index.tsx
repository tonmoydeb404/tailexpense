import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useEditExpense } from "~/db/hooks/expense";
import type { IExpense } from "~/types/expense";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

type Props = {
  data: IExpense | null;
  onClose: () => void;
};

export const ExpenseUpdateModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useEditExpense();

  const defaultValues: SchemaType = useMemo(
    () => ({
      amount: data?.amount
        ? data.amount / 100
        : (undefined as unknown as number),
      category: data?.category || "",
      date: data?.date ? new Date(data.date) : new Date(),
      title: data?.title || "",
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
          ...values,
          date: values.date.toISOString(),
          amount: values.amount * 100,
        },
      },
      {
        onSuccess: () => {
          toast.success("Transaction updated!");
          reset();
          onClose();
        },
        onError: () => {
          toast.error("Transaction update failed");
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
      title="Update Transaction"
      description="Complete the form to update a new transaction."
      contentProps={{ className: "md:max-w-[425px]" }}
      open={!!data}
      onOpenChange={() => onClose()}
      footer={
        <Button type="submit" disabled={isMutating}>
          Create
        </Button>
      }
    >
      <Form {...formOptions}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Fields />
        </form>
      </Form>
    </ResponsiveModal>
  );
};
