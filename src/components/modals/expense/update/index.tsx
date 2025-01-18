import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
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
    <Dialog open={!!data} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Transaction</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </DialogDescription>
        </DialogHeader>
        <Form {...formOptions}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fields />
            <DialogFooter>
              <Button type="submit" disabled={isMutating}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
