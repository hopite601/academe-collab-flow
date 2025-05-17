
import { Project } from "@/types/group";
import { toast } from "sonner";

// Define the project input interface
export interface ProjectInput {
  title: string;
  description: string;
  tags: string[];
  mentorName?: string;
  teamLeaderName?: string;
}

// Base API URL - would come from environment variables in a real app
const API_URL = "https://api.example.com/projects";

// Create a new project
export const createProject = async (projectData: ProjectInput): Promise<Project> => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await fetch(API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}` 
    //   },
    //   body: JSON.stringify(projectData)
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }
    // return await response.json();

    // For now, simulate API call with a delay and mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock response
    return {
      id: `project-${Math.floor(Math.random() * 10000)}`,
      title: projectData.title,
      description: projectData.description,
      mentorName: projectData.mentorName || "Dr. Smith",
      mentorId: `mentor-${Math.floor(Math.random() * 1000)}`,
      teamLeaderName: projectData.teamLeaderName,
      teamLeaderId: projectData.teamLeaderName ? `leader-${Math.floor(Math.random() * 1000)}` : undefined,
      members: 0,
      status: "open",
      progress: 0,
      tags: projectData.tags,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Failed to create project:", error);
    throw error;
  }
};

// Update an existing project
export const updateProject = async (id: string, projectData: ProjectInput): Promise<Project> => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await fetch(`${API_URL}/${id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}` 
    //   },
    //   body: JSON.stringify(projectData)
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }
    // return await response.json();

    // For now, simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id,
      title: projectData.title,
      description: projectData.description,
      mentorName: projectData.mentorName || "Dr. Smith",
      mentorId: `mentor-${Math.floor(Math.random() * 1000)}`,
      teamLeaderName: projectData.teamLeaderName,
      teamLeaderId: projectData.teamLeaderName ? `leader-${Math.floor(Math.random() * 1000)}` : undefined,
      members: 0,
      status: "in-progress",
      progress: 50,
      tags: projectData.tags,
      updatedAt: new Date().toISOString(),
      createdAt: "2023-01-01T00:00:00Z" // Mock original creation date
    };
  } catch (error) {
    console.error(`Failed to update project ${id}:`, error);
    throw error;
  }
};

// Delete a project
export const deleteProject = async (id: string): Promise<boolean> => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await fetch(`${API_URL}/${id}`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}` 
    //   }
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }
    // return true;

    // For now, simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return true;
  } catch (error) {
    console.error(`Failed to delete project ${id}:`, error);
    throw error;
  }
};

// Get all projects
export const getProjects = async (): Promise<Project[]> => {
  try {
    // In a real implementation, this would be an actual API call
    // const response = await fetch(API_URL, {
    //   headers: {
    //     'Authorization': `Bearer ${localStorage.getItem('token')}` 
    //   }
    // });
    
    // if (!response.ok) {
    //   throw new Error(`Error: ${response.status}`);
    // }
    // return await response.json();

    // For now, simulate API call with a delay and mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: "project1",
        title: "Research on Machine Learning Applications",
        description: "A comprehensive study of machine learning applications in healthcare",
        mentorName: "Dr. Smith",
        mentorId: "mentor1",
        teamLeaderId: "leader1",
        teamLeaderName: "Jane Leader",
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
        mentorName: "Dr. Williams",
        mentorId: "mentor3",
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
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    throw error;
  }
};
