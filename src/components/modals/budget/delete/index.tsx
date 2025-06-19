import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useDeleteBudget } from "~/db/hooks";

type Props = {
  data: string | null;
  onClose: () => void;
};

export const BudgetDeleteModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useDeleteBudget();

  const onConfirm = () => {
    if (!data) return;
    trigger(data, {
      onSuccess: () => {
        toast.success("Budget deleted successfully");
        onClose();
      },
      onError: () => {
        toast.error("Failed to delete budget");
      },
    });
  };

  return (
    <>
      <ResponsiveModal
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently delete your selected budget."
        contentProps={{ className: "md:max-w-[425px]" }}
        open={!!data}
        onOpenChange={onClose}
      >
        <div className="flex flex-col gap-1 md:flex-row-reverse w-full">
          <Button
            disabled={isMutating}
            onClick={onConfirm}
            variant={"destructive"}
          >
            Confirm
          </Button>
          <Button disabled={isMutating} onClick={onClose} variant={"secondary"}>
            Cancel
          </Button>
        </div>
      </ResponsiveModal>
    </>
  );
};
