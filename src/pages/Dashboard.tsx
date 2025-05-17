import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { getProjects } from "@/services/projectService";
import { getTasks } from "@/services/taskService";
import { Project, Task } from "@/types/group";

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [projectsData, tasksData] = await Promise.all([
          getProjects(),
          getTasks()
        ]);
        
        setProjects(projectsData);
        setTasks(tasksData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        {/* Dashboard content goes here */}
        <p className="text-muted-foreground">Welcome to your academic project management dashboard.</p>
        
        {/* Add dashboard widgets, charts, etc. */}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
