import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog.jsx";
import { AlertCircle, Loader2 } from "lucide-react";
import { useTask } from "@/context/TaskContext";

export const DeleteTaskDialog = ({
  trigger,
  task: { title = "this task", id },
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const closeRef = useRef(null);
  const { handleDeleteTask } = useTask();

  const handleDelete = async () => {
    if (!id) return;

    setIsDeleting(true);
    try {
      await handleDeleteTask(id);
      closeRef.current?.click();
    } catch (error) {
      console.error("Failed to delete task:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Delete Task
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground italic">
              "{title}"
            </span>
            ? This action is permanent.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-2">
          <DialogClose asChild>
            <Button ref={closeRef} variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>

          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isDeleting}
            className="min-w-[100px]"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Task"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
