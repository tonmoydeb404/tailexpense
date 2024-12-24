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
import { useEditTransaction } from "~/db/hooks/transaction";
import type { ITransaction } from "~/types/transaction";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

type Props = {
  data: ITransaction | null;
  onClose: () => void;
};

export const TransactionUpdateModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useEditTransaction();

  const defaultValues: SchemaType = useMemo(
    () => ({
      amount: data?.amount
        ? data.amount / 100
        : (undefined as unknown as number),
      category: data?.category || "",
      date: data?.date ? new Date(data.date) : new Date(),
      title: data?.title || "",
      type: data?.type || "EXPENSE",
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
