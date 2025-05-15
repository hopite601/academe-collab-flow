
import { Group, GroupMember, Project, Student } from '@/types/group';

// Mock Projects and Students for testing
const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'Machine Learning for Healthcare',
    description: 'Applying ML algorithms to healthcare data for predictive analytics',
    mentorName: 'Dr. Alan Smith',
    mentorId: 'mentor-1',
    status: 'in-progress',
    progress: 30,
    tags: ['Machine Learning', 'Healthcare', 'Data Science'],
  },
  {
    id: 'project-2',
    title: 'Sustainable Urban Design',
    description: 'Researching sustainable practices for urban development',
    mentorName: 'Dr. Maria Johnson',
    mentorId: 'mentor-2',
    status: 'open',
    tags: ['Urban Planning', 'Sustainability', 'Architecture'],
  },
  {
    id: 'project-3',
    title: 'Quantum Computing Algorithms',
    description: 'Development of new algorithms for quantum computers',
    mentorName: 'Dr. Raj Patel',
    mentorId: 'mentor-3',
    teamLeaderName: 'Sarah Chen',
    teamLeaderId: 'student-3',
    status: 'in-progress',
    progress: 45,
    tags: ['Quantum Computing', 'Algorithms', 'Computer Science'],
  },
];

const mockStudents: Student[] = [
  {
    id: 'student-1',
    name: 'John Davis',
    email: 'john.davis@university.edu',
    avatar: '/placeholder.svg',
  },
  {
    id: 'student-2',
    name: 'Emily Wilson',
    email: 'emily.wilson@university.edu',
    avatar: '/placeholder.svg',
  },
  {
    id: 'student-3',
    name: 'Sarah Chen',
    email: 'sarah.chen@university.edu',
    avatar: '/placeholder.svg',
  },
  {
    id: 'student-4',
    name: 'Michael Brown',
    email: 'michael.brown@university.edu',
    avatar: '/placeholder.svg',
  },
  {
    id: 'student-5',
    name: 'Jessica Lopez',
    email: 'jessica.lopez@university.edu',
    avatar: '/placeholder.svg',
  },
];

// Initial mock groups
let mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Data Explorers',
    description: 'Focused on healthcare data analysis',
    projectId: 'project-1',
    projectTitle: 'Machine Learning for Healthcare',
    members: [
      {
        id: 'student-1',
        name: 'John Davis',
        email: 'john.davis@university.edu',
        role: 'leader',
        avatar: '/placeholder.svg',
      },
      {
        id: 'student-2',
        name: 'Emily Wilson',
        email: 'emily.wilson@university.edu',
        role: 'member',
        avatar: '/placeholder.svg',
      },
    ],
    progress: 30,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-02-20T14:15:00Z',
  },
  {
    id: 'group-2',
    name: 'Urban Innovators',
    description: 'Working on sustainable urban planning solutions',
    projectId: 'project-2',
    projectTitle: 'Sustainable Urban Design',
    members: [
      {
        id: 'student-3',
        name: 'Sarah Chen',
        email: 'sarah.chen@university.edu',
        role: 'leader',
        avatar: '/placeholder.svg',
      },
    ],
    progress: 10,
    createdAt: '2023-02-01T09:45:00Z',
    updatedAt: '2023-02-25T11:20:00Z',
  },
];

// Delay function to simulate network requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Get all groups
export const getGroups = async (): Promise<Group[]> => {
  await delay(800);
  return [...mockGroups];
};

// Get a single group by ID
export const getGroupById = async (groupId: string): Promise<Group | null> => {
  await delay(600);
  const group = mockGroups.find(g => g.id === groupId);
  return group || null;
};

// Create a new group
export interface CreateGroupInput {
  name: string;
  description?: string;
  projectId: string;
  leaderId: string;
}

export const createGroup = async (groupData: CreateGroupInput): Promise<Group> => {
  await delay(1000);
  
  // Find the project
  const project = mockProjects.find(p => p.id === groupData.projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  
  // Find the leader
  const leader = mockStudents.find(s => s.id === groupData.leaderId);
  if (!leader) {
    throw new Error('Student not found');
  }
  
  // Create the new group
  const newGroup: Group = {
    id: `group-${Date.now()}`,
    name: groupData.name,
    description: groupData.description,
    projectId: project.id,
    projectTitle: project.title,
    members: [
      {
        id: leader.id,
        name: leader.name,
        email: leader.email,
        role: 'leader',
        avatar: leader.avatar,
      },
    ],
    progress: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  mockGroups = [...mockGroups, newGroup];
  return newGroup;
};

// Update a group
export interface UpdateGroupInput {
  name?: string;
  description?: string;
}

export const updateGroup = async (
  groupId: string,
  groupData: UpdateGroupInput
): Promise<Group> => {
  await delay(800);
  
  const groupIndex = mockGroups.findIndex(g => g.id === groupId);
  if (groupIndex === -1) {
    throw new Error('Group not found');
  }
  
  const updatedGroup = {
    ...mockGroups[groupIndex],
    ...groupData,
    updatedAt: new Date().toISOString(),
  };
  
  mockGroups = mockGroups.map(g => (g.id === groupId ? updatedGroup : g));
  return updatedGroup;
};

// Delete a group
export const deleteGroup = async (groupId: string): Promise<boolean> => {
  await delay(700);
  
  const initialLength = mockGroups.length;
  mockGroups = mockGroups.filter(g => g.id !== groupId);
  
  return mockGroups.length < initialLength;
};

// Add a member to a group
export const addGroupMember = async (
  groupId: string,
  studentId: string
): Promise<Group> => {
  await delay(800);
  
  const groupIndex = mockGroups.findIndex(g => g.id === groupId);
  if (groupIndex === -1) {
    throw new Error('Group not found');
  }
  
  const student = mockStudents.find(s => s.id === studentId);
  if (!student) {
    throw new Error('Student not found');
  }
  
  // Check if student is already a member
  const isMember = mockGroups[groupIndex].members.some(m => m.id === studentId);
  if (isMember) {
    throw new Error('Student is already a member of this group');
  }
  
  const newMember: GroupMember = {
    id: student.id,
    name: student.name,
    email: student.email,
    role: 'member',
    avatar: student.avatar,
  };
  
  const updatedGroup = {
    ...mockGroups[groupIndex],
    members: [...mockGroups[groupIndex].members, newMember],
    updatedAt: new Date().toISOString(),
  };
  
  mockGroups = mockGroups.map(g => (g.id === groupId ? updatedGroup : g));
  return updatedGroup;
};

// Remove a member from a group
export const removeGroupMember = async (
  groupId: string,
  memberId: string
): Promise<Group> => {
  await delay(700);
  
  const groupIndex = mockGroups.findIndex(g => g.id === groupId);
  if (groupIndex === -1) {
    throw new Error('Group not found');
  }
  
  // Check if member is the leader
  const isLeader = mockGroups[groupIndex].members.some(
    m => m.id === memberId && m.role === 'leader'
  );
  
  if (isLeader) {
    throw new Error('Cannot remove the group leader');
  }
  
  const updatedGroup = {
    ...mockGroups[groupIndex],
    members: mockGroups[groupIndex].members.filter(m => m.id !== memberId),
    updatedAt: new Date().toISOString(),
  };
  
  mockGroups = mockGroups.map(g => (g.id === groupId ? updatedGroup : g));
  return updatedGroup;
};

// Change the group leader
export const changeGroupLeader = async (
  groupId: string,
  newLeaderId: string
): Promise<Group> => {
  await delay(900);
  
  const groupIndex = mockGroups.findIndex(g => g.id === groupId);
  if (groupIndex === -1) {
    throw new Error('Group not found');
  }
  
  // Find the new leader in the members
  const memberIndex = mockGroups[groupIndex].members.findIndex(m => m.id === newLeaderId);
  if (memberIndex === -1) {
    throw new Error('The selected student is not a member of this group');
  }
  
  // Update members roles
  const updatedMembers = mockGroups[groupIndex].members.map(member => ({
    ...member,
    role: member.id === newLeaderId ? 'leader' : 'member',
  }));
  
  const updatedGroup = {
    ...mockGroups[groupIndex],
    members: updatedMembers,
    updatedAt: new Date().toISOString(),
  };
  
  mockGroups = mockGroups.map(g => (g.id === groupId ? updatedGroup : g));
  return updatedGroup;
};

// Get all available projects (for creating a group)
export const getAvailableProjects = async (): Promise<Project[]> => {
  await delay(600);
  return [...mockProjects];
};

// Get all available students (for adding to a group)
export const getAvailableStudents = async (groupId?: string): Promise<Student[]> => {
  await delay(500);
  
  if (!groupId) {
    return [...mockStudents];
  }
  
  // If group ID is provided, filter out students who are already members
  const group = mockGroups.find(g => g.id === groupId);
  if (!group) {
    throw new Error('Group not found');
  }
  
  const memberIds = group.members.map(m => m.id);
  return mockStudents.filter(student => !memberIds.includes(student.id));
};
