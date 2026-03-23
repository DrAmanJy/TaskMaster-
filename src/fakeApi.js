const defaultTasks = [
  {
    id: 1,
    title: "Implement Authentication Flow via OAuth2",
    description: "Integrate Google and GitHub sign-in options, ensuring proper JWT token storage and secure routing.",
    priority: "High",
    category: "Development",
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
    completed: false,
  },
  {
    id: 2,
    title: "Review React Context Refactor PR",
    description: "Go through the pending PR #142 in the frontend repository. Verify state management performance.",
    priority: "Medium",
    category: "Code Review",
    dueDate: new Date(Date.now() + 86400000).toISOString(),
    completed: true,
  },
  {
    id: 3,
    title: "Design Dashboard Architecture",
    description: "Create system diagrams and define the core entity relationships for the upcoming v2.0 release overview.",
    priority: "High",
    category: "Architecture",
    dueDate: new Date(Date.now() + 86400000 * 5).toISOString(),
    completed: false,
  },
  {
    id: 4,
    title: "Prepare Q3 Product Roadmap Presentation",
    description: "Finalize the slide deck and define the key KPIs we'll be presenting to the stakeholders next week.",
    priority: "Medium",
    category: "Planning",
    dueDate: new Date(Date.now() + 86400000 * 7).toISOString(),
    completed: false,
  },
  {
    id: 5,
    title: "Fix Mobile Navigation Bug",
    description: "Resolve the layout shift occurring on screens smaller than 768px in the top header component.",
    priority: "Low",
    category: "Bug Fix",
    dueDate: new Date(Date.now() - 86400000).toISOString(),
    completed: true,
  },
];

const saveTasksToLocal = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTasksFromLocal = () => {
  const saved = localStorage.getItem("tasks");
  if (saved) return JSON.parse(saved);
  saveTasksToLocal(defaultTasks);
  return defaultTasks;
};

export const getTasks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return loadTasksFromLocal();
};

export const searchTasks = async (q) => {
  await new Promise((resolve) => setTimeout(resolve, 100));

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
  await new Promise((resolve) => setTimeout(resolve, 100));

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
  await new Promise((resolve) => setTimeout(resolve, 100));

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
