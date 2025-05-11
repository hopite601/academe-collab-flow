
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ProjectList } from "@/components/projects/ProjectList";
import { Project } from "@/components/projects/ProjectCard";
import { useAuth } from "@/contexts/AuthContext";
import { ProjectFormDialog } from "@/components/groups/ProjectFormDialog";

const Projects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  
  // Mock data loading
  useEffect(() => {
    // Generate mock project data
    const mockProjects: Project[] = [
      {
        id: "project1",
        title: "Research on Machine Learning Applications",
        description: "A comprehensive study of machine learning applications in healthcare",
        mentorName: "Dr. Smith",
        mentorId: "mentor1",
        teamLeaderId: user?.role === "leader" ? user.id : "leader1",
        teamLeaderName: user?.role === "leader" ? user.name : "Jane Leader",
        members: 4,
        status: "in-progress",
        progress: 35,
        tags: ["Machine Learning", "Healthcare", "Research"]
      },
      {
        id: "project2",
        title: "Sustainable Energy Solutions",
        description: "Exploring renewable energy sources and their implementation in urban settings",
        mentorName: "Dr. Johnson",
        mentorId: "mentor2",
        teamLeaderId: "leader2",
        teamLeaderName: "Mike Stewart",
        members: 5,
        status: "open",
        progress: 0,
        tags: ["Renewable Energy", "Sustainability", "Urban Planning"]
      },
      {
        id: "project3",
        title: "Mobile App Development",
        description: "Creating a mobile application for student mental health support",
        mentorName: user?.role === "mentor" ? user.name : "Dr. Williams",
        mentorId: user?.role === "mentor" ? user.id : "mentor3",
        members: 3,
        status: "open",
        progress: 0,
        tags: ["Mobile Development", "Mental Health", "Student Support"]
      },
      {
        id: "project4",
        title: "Data Analysis of Student Performance",
        description: "Analyzing factors affecting student academic performance",
        mentorName: "Dr. Brown",
        mentorId: "mentor4",
        members: 2,
        status: "completed",
        progress: 100,
        tags: ["Data Analysis", "Education", "Statistics"]
      }
    ];

    setProjects(mockProjects);
  }, [user]);

  const handleProjectClick = (project: Project) => {
    console.log("Project clicked:", project);
    // This would navigate to project details in a real application
  };

  // Handle project creation
  const handleCreateProject = (projectData: any) => {
    console.log("Creating project:", projectData);
    
    // Create new project object
    const newProject: Project = {
      id: `project${projects.length + 1}`,
      title: projectData.title,
      description: projectData.description,
      mentorName: user?.role === "mentor" ? user.name : projectData.mentorName,
      mentorId: user?.role === "mentor" ? user.id : `mentor${projects.length + 1}`,
      teamLeaderName: projectData.leaderName,
      teamLeaderId: `leader${projects.length + 1}`,
      members: projectData.members,
      status: "open",
      progress: 0,
      tags: ["New Project"]
    };
    
    // Add the new project to the list
    setProjects([...projects, newProject]);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              {user?.role === "mentor" 
                ? "Create and manage academic projects" 
                : user?.role === "leader"
                  ? "Lead and organize your project teams"
                  : "Browse and join academic projects"}
            </p>
          </div>
          
          {user?.role === "mentor" && (
            <ProjectFormDialog onCreateProject={handleCreateProject} />
          )}
        </div>
        
        <ProjectList 
          projects={projects}
          onProjectClick={handleProjectClick}
        />
      </div>
    </DashboardLayout>
  );
};

export default Projects;
