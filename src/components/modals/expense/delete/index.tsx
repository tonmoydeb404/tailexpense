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
import { useDeleteExpense } from "~/db/hooks/expense";

type Props = {
  data: string | null;
  onClose: () => void;
};

export const ExpenseDeleteModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useDeleteExpense();

  const onConfirm = () => {
    if (!data) return;
    trigger(data, {
      onSuccess: () => {
        toast.success("Transaction deleted successfully");
        onClose();
      },
      onError: () => {
        toast.error("Failed to delete transaction");
      },
    });
  };

  return (
    <AlertDialog open={!!data} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            selected transaction.
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
