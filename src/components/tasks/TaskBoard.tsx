
import { useState } from "react";
import { TaskCard } from "./TaskCard";
import { Task } from "@/services/taskService";

interface TaskBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onTaskStatusChange: (taskId: string, newStatus: Task["status"]) => void;
  onEditClick?: (task: Task) => void;
  onDeleteClick?: (task: Task) => void;
  userRole?: string;
}

export function TaskBoard({ 
  tasks, 
  onTaskClick, 
  onTaskStatusChange,
  onEditClick,
  onDeleteClick, 
  userRole = "student" 
}: TaskBoardProps) {
  const tasksByStatus = {
    todo: tasks.filter(task => task.status === "todo"),
    "in-progress": tasks.filter(task => task.status === "in-progress"),
    review: tasks.filter(task => task.status === "review"),
    completed: tasks.filter(task => task.status === "completed")
  };

  const isUserLeaderOrMentor = userRole === "leader" || userRole === "mentor";

  // Handle drag and drop
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
    if (!isUserLeaderOrMentor) return;
    
    setDraggingTaskId(taskId);
    e.dataTransfer.setData("text/plain", taskId);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
    setDraggingTaskId(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (!isUserLeaderOrMentor) return;
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, status: Task["status"]) => {
    if (!isUserLeaderOrMentor) return;
    
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    onTaskStatusChange(taskId, status);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Todo Column */}
      <div
        className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "todo")}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-sm">To Do</h3>
          <span className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs px-2 py-1 rounded">
            {tasksByStatus.todo.length}
          </span>
        </div>
        <div className="space-y-3">
          {tasksByStatus.todo.length === 0 ? (
            <div className="h-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-400">
              No tasks
            </div>
          ) : (
            tasksByStatus.todo.map((task) => (
              <div
                key={task.id}
                draggable={isUserLeaderOrMentor}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
              >
                <TaskCard
                  task={task}
                  onClick={() => onTaskClick && onTaskClick(task)}
                  onEditClick={() => onEditClick && onEditClick(task)}
                  onDeleteClick={() => onDeleteClick && onDeleteClick(task)}
                  userRole={userRole}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* In Progress Column */}
      <div
        className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "in-progress")}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-sm">In Progress</h3>
          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs px-2 py-1 rounded">
            {tasksByStatus["in-progress"].length}
          </span>
        </div>
        <div className="space-y-3">
          {tasksByStatus["in-progress"].length === 0 ? (
            <div className="h-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-400">
              No tasks
            </div>
          ) : (
            tasksByStatus["in-progress"].map((task) => (
              <div
                key={task.id}
                draggable={isUserLeaderOrMentor}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
              >
                <TaskCard
                  task={task}
                  onClick={() => onTaskClick && onTaskClick(task)}
                  onEditClick={() => onEditClick && onEditClick(task)}
                  onDeleteClick={() => onDeleteClick && onDeleteClick(task)}
                  userRole={userRole}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Column */}
      <div
        className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "review")}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-sm">In Review</h3>
          <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs px-2 py-1 rounded">
            {tasksByStatus.review.length}
          </span>
        </div>
        <div className="space-y-3">
          {tasksByStatus.review.length === 0 ? (
            <div className="h-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-400">
              No tasks
            </div>
          ) : (
            tasksByStatus.review.map((task) => (
              <div
                key={task.id}
                draggable={isUserLeaderOrMentor}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
              >
                <TaskCard
                  task={task}
                  onClick={() => onTaskClick && onTaskClick(task)}
                  onEditClick={() => onEditClick && onEditClick(task)}
                  onDeleteClick={() => onDeleteClick && onDeleteClick(task)}
                  userRole={userRole}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Completed Column */}
      <div
        className="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, "completed")}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-sm">Completed</h3>
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs px-2 py-1 rounded">
            {tasksByStatus.completed.length}
          </span>
        </div>
        <div className="space-y-3">
          {tasksByStatus.completed.length === 0 ? (
            <div className="h-20 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-sm text-gray-400">
              No tasks
            </div>
          ) : (
            tasksByStatus.completed.map((task) => (
              <div
                key={task.id}
                draggable={isUserLeaderOrMentor}
                onDragStart={(e) => handleDragStart(e, task.id)}
                onDragEnd={handleDragEnd}
              >
                <TaskCard
                  task={task}
                  onClick={() => onTaskClick && onTaskClick(task)}
                  onEditClick={() => onEditClick && onEditClick(task)}
                  onDeleteClick={() => onDeleteClick && onDeleteClick(task)}
                  userRole={userRole}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
