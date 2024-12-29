import { useState } from "react";
import { toast } from "sonner";
import { seedData } from "~/db/seed";
import { Button } from "../ui/button";

type Props = {};

const SeedData = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSeed = async () => {
    setIsLoading(true);
    const toastId = toast.loading("Seeding Started");
    try {
      await seedData();

      toast.success("Seeding Complete!", { id: toastId });
    } catch (error) {
      toast.error("Seeding failed!", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  if (import.meta.env.DEV) {
    return (
      <Button className="mt-20" onClick={onSeed} disabled={isLoading}>
        Seed Data
      </Button>
    );
  }

  return null;
};

export default SeedData;
