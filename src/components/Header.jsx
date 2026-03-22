import React, { useEffect, useRef, useState } from "react";
import { TaskFormModal } from "./TaskFormModal";
import { Button } from "./ui/button";
import { ListTodo, Search } from "lucide-react";
import { Input } from "./ui/input";
import { useTask } from "@/context/TaskContext";

const Header = ({ length = 0 }) => {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="space-y-1.5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <ListTodo className="h-8 w-8 text-primary" />
          My Tasks
        </h1>
        <p className="text-muted-foreground">
          You have {length} pending tasks for today.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <SearchInput />
        <TaskFormModal
          mode="create"
          trigger={
            <Button size="lg" className="cursor-pointer">
              Add Task
            </Button>
          }
        />
      </div>
    </header>
  );
};

export default Header;

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { handleSearchTask } = useTask();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => {
      handleSearchTask(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, handleSearchTask]);
  return (
    <div className="relative">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="w-full pl-9 md:w-[250px] bg-background"
      />
    </div>
  );
};
