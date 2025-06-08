import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
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
    <AlertDialog open={!!data} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Complete this expense?</AlertDialogTitle>
          <AlertDialogDescription>
            Confirming will mark the reminder as completed and create a new
            expense record. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isMutating} onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isMutating} onClick={onConfirm}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
