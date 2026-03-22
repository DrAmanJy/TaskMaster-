const defaultTasks = [
  {
    id: 1,
    title: "Design the new landing page",
    description:
      "Create wireframes and high-fidelity mockups for the marketing site.",
    priority: "High",
    category: "Work",
    dueDate: "Sat Mar 28 2026 00:00:00 GMT+0530 (India Standard Time)",
    completed: false,
  },
  {
    id: 2,
    title: "Review pull requests",
    description: "Go through the pending PRs in the frontend repository.",
    priority: "Medium",
    category: "Development",
    dueDate: "Sat Mar 28 2026 00:00:00 GMT+0530 (India Standard Time)",
    completed: true,
  },
  {
    id: 3,
    title: "Buy groceries for the week",
    description: "Milk, eggs, bread, and some fresh vegetables.",
    priority: "Low",
    category: "Personal",
    dueDate: "Sat Mar 28 2026 00:00:00 GMT+0530 (India Standard Time)",
    completed: false,
  },
  {
    id: 4,
    title: "Schedule dentist appointment",
    description: "Call Dr. Smith's office to set up a routine checkup.",
    priority: "Medium",
    category: "Health",
    dueDate: "Sat Mar 28 2026 00:00:00 GMT+0530 (India Standard Time)",
    completed: false,
  },
];

const saveTasksToLocal = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocal = () => {
  const saved = localStorage.getItem("tasks");
  return saved ? JSON.parse(saved) : [];
};

export const getTasks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return loadTasksFromLocal();
};

export const searchTasks = async (q) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const tasks = loadTasksFromLocal();
  if (!q || q.trim() === "") return tasks;
  const query = q.toLowerCase().trim();
  return tasks.filter(
    (task) =>
      task.title?.toLowerCase().includes(query) ||
      task.description?.toLowerCase().includes(query),
  );
};

export const addTask = async (newTask) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const tasks = loadTasksFromLocal();
  const taskWithId = { ...newTask, id: Date.now() };

  saveTasksToLocal([...tasks, taskWithId]);
  return taskWithId;
};

export const updateTask = async (taskId, updatedData) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const tasks = loadTasksFromLocal();
  const updatedTask = { ...updatedData, id: taskId };

  const newTasks = tasks.map((t) => (t.id === taskId ? updatedTask : t));
  saveTasksToLocal(newTasks);

  return updatedTask;
};

export const deleteTask = async (taskId) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const tasks = loadTasksFromLocal();
  const filteredTasks = tasks.filter((t) => t.id !== taskId);

  saveTasksToLocal(filteredTasks);
  return { id: taskId };
};

export const completeTask = async (taskId) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const tasks = loadTasksFromLocal();
  let updatedTask = null;

  const newTasks = tasks.map((t) => {
    if (t.id === taskId) {
      updatedTask = { ...t, completed: !t.completed };
      return updatedTask;
    }
    return t;
  });

  saveTasksToLocal(newTasks);
  return updatedTask;
};
