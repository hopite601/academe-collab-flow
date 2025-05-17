
import { useState, useEffect, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TaskBoard } from "@/components/tasks/TaskBoard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, List, Grid } from "lucide-react";
import { toast } from "sonner";
import { Task, getTasks } from "@/services/taskService";
import { TaskActions, TaskActionsRef } from "@/components/tasks/TaskActions";
import { TaskList } from "@/components/tasks/TaskList";

const Tasks = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [groupFilter, setGroupFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"board" | "list">("board");
  
  const taskActionsRef = useRef<TaskActionsRef>(null);
  
  // Fetch tasks from API on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        toast.error("Failed to load tasks");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTasks();
  }, []);

  // Handle task status change
  const handleTaskStatusChange = (taskId: string, newStatus: Task["status"]) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  // Handle task click to view details or edit
  const handleTaskClick = (task: Task) => {
    taskActionsRef.current?.openEditDialog(task);
  };

  // Open create task dialog
  const handleCreateClick = () => {
    taskActionsRef.current?.openCreateDialog();
  };

  // Open edit task dialog
  const handleEditClick = (task: Task) => {
    taskActionsRef.current?.openEditDialog(task);
  };

  // Open delete task dialog
  const handleDeleteClick = (task: Task) => {
    taskActionsRef.current?.openDeleteDialog(task);
  };

  // Handle task created event
  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  // Handle task updated event
  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  // Handle task deleted event
  const handleTaskDeleted = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  // Extract unique projects, groups, and statuses for filters
  const projects = Array.from(new Set(tasks.map(task => ({
    id: task.projectId || "",
    title: task.projectTitle || "Unnamed Project"
  })))).filter(project => project.id);
  
  const groups = Array.from(new Set(tasks.map(task => ({
    id: task.groupId || "",
    name: task.groupName || "Unnamed Group"
  })))).filter(group => group.id);

  // Filter tasks based on search term, project, group, and status filters
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProject = projectFilter === "all" || task.projectId === projectFilter;
    const matchesGroup = groupFilter === "all" || task.groupId === groupFilter;
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    
    return matchesSearch && matchesProject && matchesGroup && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
            <p className="text-muted-foreground">
              {user?.role === "leader" 
                ? "Assign and manage tasks for your team members" 
                : "Track and update your assigned tasks"}
            </p>
          </div>
          
          {(user?.role === "leader" || user?.role === "mentor") && (
            <Button onClick={handleCreateClick} className="bg-academe-500 hover:bg-academe-600">
              <Plus className="h-4 w-4 mr-2" /> Create Task
            </Button>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="grid grid-cols-3 sm:flex gap-2">
            <div className="w-full sm:w-48">
              <Select 
                value={projectFilter} 
                onValueChange={setProjectFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Projects</SelectItem>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-48">
              <Select 
                value={groupFilter} 
                onValueChange={setGroupFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Groups</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full sm:w-40">
              <Select 
                value={statusFilter} 
                onValueChange={setStatusFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* View toggle */}
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "board" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("board")}
                className="rounded-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
                className="rounded-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {viewMode === "board" ? (
          <TaskBoard 
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
            onTaskStatusChange={handleTaskStatusChange}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            userRole={user?.role || "student"}
          />
        ) : (
          <TaskList 
            tasks={filteredTasks} 
            onTaskClick={handleTaskClick}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            userRole={user?.role || "student"}
            loading={loading}
          />
        )}
        
        <TaskActions
          ref={taskActionsRef}
          onTaskCreated={handleTaskCreated}
          onTaskUpdated={handleTaskUpdated}
          onTaskDeleted={handleTaskDeleted}
        />
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
