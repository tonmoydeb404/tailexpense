import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { ResponsiveModal } from "~/components/ui/responsive-modal";
import { useDeleteCategory } from "~/db/hooks";

type Props = {
  data: string | null;
  onClose: () => void;
};

export const CategoryDeleteModal = (props: Props) => {
  const { data, onClose } = props;
  const { trigger, isMutating } = useDeleteCategory();

  const onConfirm = () => {
    if (!data) return;
    trigger(data, {
      onSuccess: () => {
        toast.success("Category deleted successfully");
        onClose();
      },
      onError: () => {
        toast.error("Failed to delete category");
      },
    });
  };

  return (
    <ResponsiveModal
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete your selected category."
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
