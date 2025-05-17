import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Project } from "@/types/group";
import { getProjects } from "@/services/projectService";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TaskList } from "@/components/tasks/TaskList";
import { getTasks } from "@/services/taskService";
import { Task } from "@/types/group";
import { TaskActions, TaskActionsRef } from "@/components/tasks/TaskActions";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { GroupsContent } from "@/components/groups/GroupsContent";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const taskActionsRef = useRef<TaskActionsRef>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const projects = await getProjects();
        const foundProject = projects.find(p => p.id === projectId);
        
        if (foundProject) {
          setProject(foundProject);
          
          // Fetch tasks for this project
          const tasksData = await getTasks();
          setTasks(tasksData.filter(task => task.projectId === projectId));
        }
      } catch (error) {
        console.error("Failed to fetch project data:", error);
        toast.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectData();
  }, [projectId]);

  const handleCreateTask = () => {
    taskActionsRef.current?.openCreateDialog();
  };

  const handleEditTask = (task: Task) => {
    taskActionsRef.current?.openEditDialog(task);
  };

  const handleDeleteTask = (task: Task) => {
    taskActionsRef.current?.openDeleteDialog(task);
  };

  const handleTaskCreated = (newTask: Task) => {
    setTasks(prev => [...prev, newTask]);
  };

  const handleTaskUpdated = (updatedTask: Task) => {
    setTasks(prev => 
      prev.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  const handleTaskDeleted = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const isUserLeaderOrMentor = user?.role === "leader" || user?.role === "mentor";
  const isUserProjectLeader = user?.id === project?.teamLeaderId;
  const isUserProjectMentor = user?.id === project?.mentorId;
  const canManageTasks = isUserLeaderOrMentor || isUserProjectLeader || isUserProjectMentor;

  return (
    <DashboardLayout>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      ) : project ? (
        <div className="space-y-6">
          {/* Project Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            {canManageTasks && (
              <Button onClick={handleCreateTask} className="bg-academe-500 hover:bg-academe-600">
                Create Task
              </Button>
            )}
          </div>
          
          {/* Project Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge className={
                    project.status === "open" 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" 
                      : project.status === "in-progress"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                  }>
                    {project.status === "in-progress" 
                      ? "In Progress" 
                      : project.status?.charAt(0).toUpperCase() + project.status?.slice(1) || "Open"}
                  </Badge>
                  <span className="text-2xl font-bold">{project.members || 0}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Members</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="w-full">
                    <div className="flex justify-between text-xs mb-1">
                      <span>{project.progress || 0}% Complete</span>
                    </div>
                    <Progress value={project.progress || 0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground w-20">Mentor:</span>
                    <span>{project.mentorName || "Unassigned"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground w-20">Leader:</span>
                    <span>{project.teamLeaderName || "Unassigned"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Project Content Tabs */}
          <Tabs defaultValue="tasks" className="w-full">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="groups">Groups</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tasks" className="mt-4">
              <TaskList 
                tasks={tasks}
                onTaskClick={handleEditTask}
                onEditClick={handleEditTask}
                onDeleteClick={handleDeleteTask}
                userRole={user?.role || "student"}
                loading={loading}
              />
            </TabsContent>
            
            <TabsContent value="groups" className="mt-4">
              <GroupsContent projectId={projectId} />
            </TabsContent>
          </Tabs>
          
          {/* Task Actions Component */}
          <TaskActions
            ref={taskActionsRef}
            onTaskCreated={handleTaskCreated}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold">Project not found</h2>
          <p className="text-muted-foreground mt-2">
            The project you're looking for doesn't exist or you don't have access to it.
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ProjectDetail;
