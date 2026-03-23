import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import React from "react";

const EditTaskModal = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-lg font-semibold">Add Task</h2>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input placeholder="Enter title..." />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea placeholder="Enter description..." />
          </div>

          <Button className="w-full">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskModal;
