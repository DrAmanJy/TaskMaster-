import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
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
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Field, FieldLabel, FieldError } from "@/components/ui/field.jsx";
import { useTask } from "@/context/TaskContext";
import { Spinner } from "./ui/spinner";

export function TaskFormModal({
  trigger,
  mode = "create",
  task,
  initialTitle = "",
}) {
  const [open, setOpen] = useState(false);
  const { handleAddTask, handleUpdateTask } = useTask();

  const form = useForm({
    defaultValues: {
      title: task?.title || initialTitle || "",
      description: task?.description || "",
      category: task?.category || "work",
      priority: task?.priority || "Medium",
      completed: task?.completed || false,
      dueDate: task?.dueDate || null,
    },
  });

  const onSubmit = async (data) => {
    console.log(data)
    try {
      if (mode === "create") await handleAddTask(data);
      if (mode === "edit" && task) await handleUpdateTask(task.id, data);
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Task" : "Edit Task"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Add a new task to your list. Fill out the details below."
              : "Make changes to your task here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>

        {/* Standard HTML form, no Shadcn <Form> wrapper needed */}
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-4 py-4"
        >
          {/* TITLE FIELD (Using standard register) */}
          <Field data-invalid={!!form.formState.errors.title}>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="e.g., Design the landing page"
              {...form.register("title", { required: "Title is required" })}
              aria-invalid={!!form.formState.errors.title}
            />
            {form.formState.errors.title && (
              <FieldError>{form.formState.errors.title.message}</FieldError>
            )}
          </Field>

          {/* DESCRIPTION FIELD (Using standard register) */}
          <Field data-invalid={!!form.formState.errors.description}>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Add more details about this task..."
              {...form.register("description")}
              aria-invalid={!!form.formState.errors.description}
            />
            {form.formState.errors.description && (
              <FieldError>
                {form.formState.errors.description.message}
              </FieldError>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            {/* CATEGORY FIELD (Controlled via Controller) */}
            <Controller
              control={form.control}
              name="category"
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel htmlFor="category">Category</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id="category"
                      className="w-full"
                      aria-invalid={!!fieldState.error}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Category</SelectLabel>
                        <SelectItem value="work">Work</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />

            {/* PRIORITY FIELD (Controlled via Controller) */}
            <Controller
              control={form.control}
              name="priority"
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.error}>
                  <FieldLabel htmlFor="priority">Priority</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      id="priority"
                      className="w-full"
                      aria-invalid={!!fieldState.error}
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        <SelectItem value="Low">Low</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.error && (
                    <FieldError>{fieldState.error.message}</FieldError>
                  )}
                </Field>
              )}
            />
            <Controller
              control={form.control}
              name="dueDate"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={!!fieldState.error}
                  className="mx-auto w-44"
                >
                  <FieldLabel htmlFor="date-picker-simple">Date</FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal"
                      >
                        {field.value ? format(new Date(field.value), "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value ? new Date(field.value) : undefined}
                        onSelect={field.onChange}
                        defaultMonth={field.value ? new Date(field.value) : undefined}
                      />
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />
          </div>

          <DialogFooter className=" gap-2  mt-4 ">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>

            {form.formState?.isSubmitting ? (
              <Button variant="outline" disabled>
                <Spinner data-icon="inline-start" />
                {mode === "create" ? "Creating" : "Saving"}
              </Button>
            ) : (
              <Button type="submit">
                {mode === "create" ? "Create Task" : "Save changes"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
