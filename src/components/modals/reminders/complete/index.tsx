import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useCompleteExpenseReminder } from "~/db/hooks";

type Props = {
  data: string | null;
  onClose: () => void;
};

export const ReminderCompleteModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useCompleteExpenseReminder();

  const onConfirm = () => {
    if (!data) return;
    trigger(data, {
      onSuccess: () => {
        toast.success("Expense reminder completed and expense record added.");
        onClose();
      },
      onError: () => {
        toast.error("Failed to complete expense reminder.");
      },
    });
  };

  return (
    <ResponsiveModal
      title="Complete this expense?"
      description="Confirming will mark the reminder as completed and create a new expense record. This action cannot be undone."
      contentProps={{ className: "md:max-w-[425px]" }}
      open={!!data}
      onOpenChange={onClose}
    >
      <div className="flex flex-col gap-1 md:flex-row-reverse w-full">
        <Button disabled={isMutating} onClick={onConfirm} variant={"default"}>
          Confirm
        </Button>
        <Button disabled={isMutating} onClick={onClose} variant={"secondary"}>
          Cancel
        </Button>
      </div>
    </ResponsiveModal>
  );
};
