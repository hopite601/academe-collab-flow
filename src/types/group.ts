
export interface GroupMember {
  id: string;
  name: string;
  email: string;
  role: "leader" | "member";
  avatar?: string;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  projectId: string;
  projectTitle: string;
  members: GroupMember[];
  progress?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  mentorName?: string;
  mentorId?: string;
  teamLeaderName?: string;
  teamLeaderId?: string;
  members?: number;
  status?: "open" | "in-progress" | "completed";
  progress?: number;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

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
