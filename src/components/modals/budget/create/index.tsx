import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
  DialogTrigger,
} from "~/components/ui/dialog";
import { Form } from "~/components/ui/form";
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
    <Dialog open={modal} onOpenChange={setModal}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Budget</DialogTitle>
          <DialogDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  );
};
