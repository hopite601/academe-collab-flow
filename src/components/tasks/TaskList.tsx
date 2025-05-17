
import { useState } from "react";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit, Eye, Trash } from "lucide-react";
import { Task } from "@/services/taskService";

interface TaskListProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onEditClick?: (task: Task) => void;
  onDeleteClick?: (task: Task) => void;
  userRole?: string;
  loading?: boolean;
}

export function TaskList({
  tasks,
  onTaskClick,
  onEditClick,
  onDeleteClick,
  userRole = "student",
  loading = false,
}: TaskListProps) {
  // Status and priority color mappings
  const statusColor = {
    "todo": "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    "in-progress": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    "review": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    "completed": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  };

  const priorityColor = {
    "low": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    "medium": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    "high": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

  const canEdit = userRole === "leader" || userRole === "mentor";

  return (
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Assignees</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Loading tasks...
                </TableCell>
              </TableRow>
            ) : tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-medium">
                    <div className="max-w-[200px] truncate" title={task.title}>
                      {task.title}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColor[task.status]}>
                      {task.status === "in-progress"
                        ? "In Progress"
                        : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={priorityColor[task.priority]}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(task.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="max-w-[150px] truncate" title={task.projectTitle}>
                      {task.projectTitle}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[150px] truncate" title={task.groupName}>
                      {task.groupName || "-"}
                    </div>
                  </TableCell>
                  <TableCell>
                    {task.assignees && task.assignees.length > 0 ? (
                      <div className="flex -space-x-2 overflow-hidden">
                        {task.assignees.slice(0, 3).map((assignee) => (
                          <Avatar
                            key={assignee.id}
                            className="h-6 w-6 border-2 border-background"
                            title={assignee.name}
                          >
                            <AvatarImage src={assignee.avatar} alt={assignee.name} />
                            <AvatarFallback>
                              {assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {task.assignees.length > 3 && (
                          <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                            +{task.assignees.length - 3}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onTaskClick && onTaskClick(task);
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>

                      {canEdit && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onEditClick && onEditClick(task);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteClick && onDeleteClick(task);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
