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
import { Textarea } from "@/components/ui/textarea.jsx";
import { Field, FieldLabel, FieldError } from "@/components/ui/field.jsx";
import { useTask } from "@/context/TaskContext";
import { Spinner } from "./ui/spinner";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./InputField";

const shema = z.object({
  title: z
    .string()
    .trim()
    .refine((title) => title !== "", { error: "Title is required" })
    .min(3, "Title is too short")
    .max(128, "Title is too long"),
  description: z
    .string()
    .trim()
    .refine((title) => title !== "", { error: "Description is required" })
    .min(8, "Description is too short")
    .max(524, "Description is too long"),
  category: z.enum(["Work", "Personal"], {
    error: (iss) =>
      iss.input === "" ? "Category is required." : "Invalid category.",
  }),
  priority: z.enum(["Low", "Medium", "High"], {
    error: (iss) =>
      iss.input === "" ? "Priority is required." : "Invalid priority.",
  }),
  completed: z.boolean().default(false),
  dueDate: z.coerce
    .date({
      error: (iss) => {
        return iss.input === null
          ? "Due Date is required."
          : "Invalid Due Date";
      },
    })
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Date cannot be in the past",
    }),
});

export function TaskFormModal({
  trigger,
  mode = "create",
  task,
  initialTitle = "",
}) {
  const [open, setOpen] = useState(false);
  const { handleAddTask, handleUpdateTask } = useTask();

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(shema),
    defaultValues: {
      title: task?.title || initialTitle || "",
      description: task?.description || "",
      category: task?.category || "",
      priority: task?.priority || "Low",
      completed: task?.completed || false,
      dueDate: task?.dueDate || null,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (mode === "create") await handleAddTask(data);
      if (mode === "edit" && task) await handleUpdateTask(task.id, data);
      reset();
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

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <InputField
            control={control}
            label="Title"
            name="title"
            type="text"
            placeholder="e.g., Design the landing page"
          />

          <Field data-invalid={!!errors.description}>
            <FieldLabel htmlFor="description">
              {errors.description ? errors.description.message : "Description"}
            </FieldLabel>
            <Textarea
              id="description"
              placeholder="Add more details about this task..."
              {...register("description")}
              aria-invalid={!!errors.description}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <SelectOptions
              control={control}
              label="Category"
              name="category"
              options={["Work", "Personal"]}
            />

            <SelectOptions
              control={control}
              label="Priority"
              name="priority"
              options={["Low", "Medium", "High"]}
            />

            <Controller
              control={control}
              name="dueDate"
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={!!fieldState.error}
                  className="mx-auto w-44"
                >
                  <FieldLabel htmlFor="date-picker-simple">
                    {fieldState.error ? fieldState.error.message : "Date"}
                  </FieldLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date-picker-simple"
                        className="justify-start font-normal"
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={field.onChange}
                        defaultMonth={
                          field.value ? new Date(field.value) : undefined
                        }
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

            {isSubmitting ? (
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

const SelectOptions = ({ control, label, name, options = [] }) => (
  <Controller
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Field data-invalid={!!fieldState.error}>
        <FieldLabel htmlFor={name}>
          {fieldState.error ? fieldState.error.message : label}
        </FieldLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <SelectTrigger id={name} aria-invalid={!!fieldState.error}>
            <SelectValue placeholder={`Select ${name}`} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>

              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
    )}
  />
);
