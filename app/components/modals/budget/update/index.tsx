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
import { useEditBudget } from "~/db/hooks";
import type { IBudget } from "~/types/budget";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

type Props = {
  data: IBudget | null;
  onClose: () => void;
};

export const BudgetUpdateModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useEditBudget();

  const defaultValues: SchemaType = useMemo(
    () => ({
      amount: data?.amount ? data.amount / 100 : ("" as unknown as number),
      month: data?.month,
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
        updates: { amount: values.amount * 100 },
      },
      {
        onSuccess: () => {
          toast.success("Budget updated!");
          reset();
          onClose();
        },
        onError: () => {
          toast.error("Budget update failed");
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
          <DialogTitle>Update Budget</DialogTitle>
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
