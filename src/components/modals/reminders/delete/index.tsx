import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useDeleteExpenseReminder } from "~/db/hooks";

type Props = {
  data: string | null;
  onClose: () => void;
};

export const ReminderDeleteModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useDeleteExpenseReminder();

  const onConfirm = () => {
    if (!data) return;
    trigger(data, {
      onSuccess: () => {
        toast.success("Reminder deleted successfully");
        onClose();
      },
      onError: () => {
        toast.error("Failed to delete reminder");
      },
    });
  };

  return (
    <ResponsiveModal
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your selected reminder."
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
  );
};
