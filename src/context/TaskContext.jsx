import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  use,
} from "react";
import {
  addTask,
  completeTask,
  deleteTask,
  getTasks,
  searchTasks,
  updateTask,
} from "@/fakeApi";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks();
      setTasks(data);
      setLoading(false);
    };
    fetchTasks();
  }, []);

  const handleSearchTask = useCallback(async (query) => {
    setLoading(true);
    const data = await searchTasks(query);
    setTasks(data);
    setLoading(false);
  }, []);

  const handleAddTask = useCallback(
    async (taskData) => {
      const newTask = await addTask(taskData);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    },
    [tasks],
  );

  const handleUpdateTask = useCallback(async (taskId, taskData) => {
    const updatedTask = await updateTask(taskId, taskData);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  }, []);

  const handleDeleteTask = useCallback(async (taskId) => {
    const deletedTask = await deleteTask(taskId);
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== deletedTask.id));
  }, []);

  const handleCompleteTask = useCallback(async (taskId) => {
    const updatedTask = await completeTask(taskId);
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      loading,
      handleAddTask,
      handleUpdateTask,
      handleDeleteTask,
      handleCompleteTask,
      handleSearchTask,
    }),
    [
      tasks,
      loading,
      handleAddTask,
      handleUpdateTask,
      handleDeleteTask,
      handleCompleteTask,
      handleSearchTask,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = use(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export default TaskProvider;
