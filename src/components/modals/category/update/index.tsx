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
import { useEditCategory } from "~/db/hooks";
import type { ICategory } from "~/types/category";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

type Props = {
  data: ICategory | null;
  onClose: () => void;
};

export const CategoryUpdateModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useEditCategory();

  const defaultValues: SchemaType = useMemo(
    () => ({
      name: data?.name || "",
      color: data?.color || "",
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
        },
      },
      {
        onSuccess: () => {
          toast.success("Category updated!");
          reset();
          onClose();
        },
        onError: () => {
          toast.error("Category update failed");
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
          <DialogTitle>Update Category</DialogTitle>
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
