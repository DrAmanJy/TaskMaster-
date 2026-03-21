import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  addTask,
  completeTask,
  deleteTask,
  getTasks,
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

  const handleAddTask = useCallback(async (taskData) => {
    const newTask = await addTask(taskData);
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }, []);

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
    }),
    [
      tasks,
      loading,
      handleAddTask,
      handleUpdateTask,
      handleDeleteTask,
      handleCompleteTask,
    ],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

export default TaskProvider;
