import { Checkbox } from "./ui/checkbox";
import { Card, CardContent } from "./ui/card";
import { TaskFormModal } from "./TaskFormModal";
import { Button } from "./ui/button";
import { CalendarIcon, Edit2, Trash2 } from "lucide-react";
import { DeleteTaskDialog } from "./DeleteTaskDialog";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import { useTask } from "@/context/TaskContext";

export default function TaskCard({ task }) {
  const { handleCompleteTask } = useTask();
  const handleComplete = () => {
    handleCompleteTask(task.id);
  };
  const { completed, title, description, category, priority, dueDate } = task;
  return (
    <Card
      className={`group transition-all hover:shadow-md ${completed ? "bg-muted/30" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Checkbox
            checked={completed}
            onCheckedChange={handleComplete}
            className={`mt-1 h-5 w-5 rounded-full ${completed ? "data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" : " cursor-pointer"}`}
          />
          <div className="grid gap-1.5 flex-1">
            <div className="flex items-start justify-between gap-4">
              <h3
                className={`font-semibold text-base ${completed ? "line-through text-muted-foreground" : ""}`}
              >
                {title}
              </h3>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <TaskFormModal
                  mode="edit"
                  task={task}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                  }
                />
                <DeleteTaskDialog
                  task={task}
                  trigger={
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  }
                />
              </div>
            </div>

            {task.description && (
              <p
                className={`text-sm ${completed ? "text-muted-foreground/70 line-through" : "text-muted-foreground"}`}
              >
                {description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <Badge
                variant={completed ? "outline" : "secondary"}
                className="text-xs font-normal"
              >
                {category}
              </Badge>
              {priority === "High" && (
                <Badge
                  variant="destructive"
                  className="bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-normal border-none"
                >
                  High Priority
                </Badge>
              )}
              {dueDate && (
                <div className="flex items-center text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-md ml-auto">
                  <CalendarIcon className="mr-1 h-3 w-3" />
                  {dueDate instanceof Date
                    ? format(dueDate, "PPP")
                    : (typeof dueDate === "string" && !isNaN(new Date(dueDate).getTime())
                      ? format(new Date(dueDate), "PPP")
                      : String(dueDate))}
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
