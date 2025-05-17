
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Task } from "@/services/taskService";
import { Calendar, MoreVertical, Edit, Trash, Eye } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
  onEditClick?: () => void;
  onDeleteClick?: () => void;
  userRole?: string;
}

export function TaskCard({ task, onClick, onEditClick, onDeleteClick, userRole = "student" }: TaskCardProps) {
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
    <Card className="mb-3 cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 mr-2">
            <h3 className="font-medium text-sm line-clamp-2">{task.title}</h3>
          </div>
          
          {canEdit && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onClick && onClick(); }}>
                  <Eye className="h-4 w-4 mr-2" /> View
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); onEditClick && onEditClick(); }}>
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={(e) => { e.stopPropagation(); onDeleteClick && onDeleteClick(); }}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash className="h-4 w-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        <div className="text-xs text-muted-foreground line-clamp-2 mb-3">
          {task.description || "No description"}
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="outline" className={priorityColor[task.priority]}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
          
          {task.projectTitle && (
            <Badge variant="outline" className="bg-slate-100 text-slate-800">
              {task.projectTitle}
            </Badge>
          )}
        </div>

        <div className="flex items-center text-xs text-muted-foreground mb-2">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
        </div>
      </CardContent>

      {(task.assignees && task.assignees.length > 0) && (
        <CardFooter className="pt-0">
          <div className="flex justify-between items-center w-full">
            <div className="flex -space-x-2 overflow-hidden">
              {task.assignees.slice(0, 3).map((assignee) => (
                <Avatar key={assignee.id} className="h-6 w-6 border-2 border-background">
                  <AvatarImage src={assignee.avatar} alt={assignee.name} />
                  <AvatarFallback>{assignee.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              {task.assignees.length > 3 && (
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-muted text-xs">
                  +{task.assignees.length - 3}
                </div>
              )}
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
