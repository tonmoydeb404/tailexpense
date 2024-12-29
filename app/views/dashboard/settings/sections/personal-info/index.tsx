import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Form } from "~/components/ui/form";
import { useAppContext } from "~/contexts/app-context";
import Fields from "./fields";
import { Schema, type SchemaType } from "./schema";

type Props = {};

const PersonalInfoSection = (props: Props) => {
  const { currency, name, saveData } = useAppContext();

  const defaultValues = useMemo<SchemaType>(
    () => ({
      name: name || "",
      currency: currency || "",
    }),
    [name, currency]
  );
  const formOptions = useForm({ defaultValues, resolver: zodResolver(Schema) });
  const { handleSubmit, reset, formState } = formOptions;

  const onSubmit: SubmitHandler<SchemaType> = (values) => {
    saveData(values);
    toast.success("Personal info updated");
  };

  const onReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);
  return (
    <Card className="max-w-xl w-full mb-10 shadow-none">
      <CardHeader>
        <CardDescription>Personal Info</CardDescription>
      </CardHeader>
      <Form {...formOptions}>
        <form onSubmit={handleSubmit(onSubmit)} onReset={onReset}>
          <CardContent>
            <Fields />
          </CardContent>
          <CardFooter className="gap-2 flex-wrap">
            <Button size={"sm"} type="submit">
              Update Details
            </Button>
            <Button
              size={"sm"}
              variant={"outline"}
              type="reset"
              disabled={!formState.isDirty}
            >
              Cancel Changes
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default PersonalInfoSection;
