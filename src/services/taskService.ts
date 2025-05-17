
import { toast } from "sonner";

// Task interfaces
export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
  projectId?: string;
  projectTitle?: string;
  groupId?: string;
  groupName?: string;
  assignees: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskInput {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  projectId?: string;
  groupId?: string;
  assigneeIds?: string[];
}

// Base API URL - would come from environment variables in a real app
const API_URL = "https://api.example.com/tasks";

// Create a new task
export const createTask = async (taskData: TaskInput): Promise<Task> => {
  try {
    // In a real implementation, this would be an actual API call
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Generate mock response
    return {
      id: `task-${Math.floor(Math.random() * 10000)}`,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status as "todo" | "in-progress" | "review" | "completed",
      priority: taskData.priority as "low" | "medium" | "high",
      dueDate: new Date(taskData.dueDate).toISOString(),
      projectId: taskData.projectId,
      projectTitle: "Mock Project Title",
      groupId: taskData.groupId,
      groupName: "Mock Group Name",
      assignees: (taskData.assigneeIds || []).map((id) => ({
        id,
        name: `User ${id}`,
        avatar: `https://ui-avatars.com/api/?name=User+${id}&background=random`,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Failed to create task:", error);
    throw error;
  }
};

// Update an existing task
export const updateTask = async (id: string, taskData: TaskInput): Promise<Task> => {
  try {
    // In a real implementation, this would be an actual API call
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      id,
      title: taskData.title,
      description: taskData.description,
      status: taskData.status as "todo" | "in-progress" | "review" | "completed",
      priority: taskData.priority as "low" | "medium" | "high",
      dueDate: new Date(taskData.dueDate).toISOString(),
      projectId: taskData.projectId,
      projectTitle: "Mock Project Title",
      groupId: taskData.groupId,
      groupName: "Mock Group Name",
      assignees: (taskData.assigneeIds || []).map((id) => ({
        id,
        name: `User ${id}`,
        avatar: `https://ui-avatars.com/api/?name=User+${id}&background=random`,
      })),
      updatedAt: new Date().toISOString(),
      createdAt: "2023-01-01T00:00:00Z" // Mock original creation date
    };
  } catch (error) {
    console.error(`Failed to update task ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id: string): Promise<boolean> => {
  try {
    // In a real implementation, this would be an actual API call
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return true;
  } catch (error) {
    console.error(`Failed to delete task ${id}:`, error);
    throw error;
  }
};

// Get all tasks
export const getTasks = async (): Promise<Task[]> => {
  try {
    // In a real implementation, this would be an actual API call
    // Simulate API call with a delay and mock data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return [
      {
        id: "task1",
        title: "Literature Review",
        description: "Review existing research papers on the topic and create a summary",
        status: "in-progress",
        priority: "high",
        dueDate: "2025-05-20",
        projectId: "project1",
        projectTitle: "Research on Machine Learning Applications",
        groupId: "group1",
        groupName: "Research Team Alpha",
        assignees: [
          {
            id: "user1",
            name: "John Doe",
            avatar: `https://ui-avatars.com/api/?name=John+Doe&background=random`,
          }
        ],
      },
      {
        id: "task2",
        title: "Data Collection",
        description: "Collect dataset from the provided sources",
        status: "todo",
        priority: "medium",
        dueDate: "2025-05-25",
        projectId: "project1",
        projectTitle: "Research on Machine Learning Applications",
        groupId: "group1",
        groupName: "Research Team Alpha",
        assignees: [
          {
            id: "user1",
            name: "John Doe",
            avatar: `https://ui-avatars.com/api/?name=John+Doe&background=random`,
          },
          {
            id: "user2",
            name: "Jane Smith",
            avatar: `https://ui-avatars.com/api/?name=Jane+Smith&background=random`,
          }
        ],
      },
      {
        id: "task3",
        title: "Methodology Design",
        description: "Design research methodology and framework",
        status: "review",
        priority: "high",
        dueDate: "2025-05-15",
        projectId: "project1",
        projectTitle: "Research on Machine Learning Applications",
        groupId: "group2",
        groupName: "Research Team Beta",
        assignees: [
          {
            id: "user2",
            name: "Alice Smith",
            avatar: `https://ui-avatars.com/api/?name=Alice+Smith&background=random`,
          }
        ],
      },
      {
        id: "task4",
        title: "Survey Creation",
        description: "Create survey questions for data collection",
        status: "completed",
        priority: "low",
        dueDate: "2025-05-10",
        projectId: "project1",
        projectTitle: "Research on Machine Learning Applications",
        groupId: "group1",
        groupName: "Research Team Alpha",
        assignees: [
          {
            id: "user1",
            name: "John Doe",
            avatar: `https://ui-avatars.com/api/?name=John+Doe&background=random`,
          }
        ],
      },
      {
        id: "task5",
        title: "Energy Audit",
        description: "Conduct energy audit of campus buildings",
        status: "todo",
        priority: "medium",
        dueDate: "2025-06-05",
        projectId: "project2",
        projectTitle: "Sustainable Energy Solutions",
        groupId: "group3",
        groupName: "Green Energy Team",
        assignees: [],
      }
    ];
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

// Get available students for task assignment
export const getAvailableStudents = async (): Promise<{id: string, name: string, avatar?: string}[]> => {
  try {
    // In a real implementation, this would be an actual API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: "user1", name: "John Doe", avatar: `https://ui-avatars.com/api/?name=John+Doe&background=random` },
      { id: "user2", name: "Jane Smith", avatar: `https://ui-avatars.com/api/?name=Jane+Smith&background=random` },
      { id: "user3", name: "Alice Brown", avatar: `https://ui-avatars.com/api/?name=Alice+Brown&background=random` },
      { id: "user4", name: "Robert Wilson", avatar: `https://ui-avatars.com/api/?name=Robert+Wilson&background=random` },
      { id: "user5", name: "Emily Davis", avatar: `https://ui-avatars.com/api/?name=Emily+Davis&background=random` },
    ];
  } catch (error) {
    console.error("Failed to fetch available students:", error);
    throw error;
  }
};

// Get project groups for task assignment
export const getProjectGroups = async (projectId?: string): Promise<{id: string, name: string}[]> => {
  try {
    // In a real implementation, this would filter by project ID
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return [
      { id: "group1", name: "Research Team Alpha" },
      { id: "group2", name: "Research Team Beta" },
      { id: "group3", name: "Green Energy Team" },
      { id: "group4", name: "Data Analysis Team" },
    ];
  } catch (error) {
    console.error("Failed to fetch project groups:", error);
    throw error;
  }
};
