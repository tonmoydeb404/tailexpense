import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { Form } from "~/components/ui/form";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useAddCategory } from "~/db/hooks";
import { generateRandomColor } from "~/utils/color";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

export const CategoryCreateModal = () => {
  const [modal, setModal] = useState(false);
  const { trigger, isMutating } = useAddCategory();

  const defaultValues: SchemaType = {
    name: "",
    color: generateRandomColor(),
  };

  const formOptions = useForm({ defaultValues, resolver: zodResolver(Schema) });
  const { handleSubmit, reset } = formOptions;

  const onSubmit: SubmitHandler<SchemaType> = async (values) => {
    await trigger(
      {
        ...values,
      },
      {
        onSuccess: () => {
          toast.success("Category created!");
          reset(defaultValues);
          setModal(false);
        },
        onError: () => {
          toast.error("Category creation failed");
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
        title="New Category"
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
