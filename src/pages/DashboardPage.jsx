import React, { useState } from "react";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs.jsx";

import { useTask } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard.jsx";
import Header from "@/components/Header";
import TaskQuickStats from "@/components/TaskQuickStats";

export default function DashboardPage() {
  const [_, setActiveTab] = useState("all");
  const { tasks } = useTask();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header Section */}
        {<Header length={tasks.filter((t) => !t.completed).length} />}

        {/* Quick Stats Grid */}
        <TaskQuickStats
          totalTasks={tasks.length}
          completedTasks={tasks.filter((t) => t.completed).length}
          pendingTasks={tasks.filter((t) => !t.completed).length}
        />

        {/* Main Content Area */}
        <div className="">
          <div className="space-y-6">
            {/* Tasks List Container */}
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-muted/50 border">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="all" className="space-y-3 mt-0">
                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </TabsContent>
              <TabsContent value="active" className="space-y-3 mt-0">
                {tasks
                  .filter((t) => !t.completed)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </TabsContent>
              <TabsContent value="completed" className="space-y-3 mt-0">
                {tasks
                  .filter((t) => t.completed)
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
