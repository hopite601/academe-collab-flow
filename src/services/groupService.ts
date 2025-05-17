
import { Group, GroupMember, Student } from '@/types/group';

// Define input structures
export interface CreateGroupInput {
  name: string;
  description?: string;
  projectId: string;
  projectTitle: string;
  members: GroupMember[];
  leaderId: string;
}

export interface UpdateGroupInput {
  name?: string;
  description?: string;
  members?: GroupMember[];
  leaderId?: string;
}

// Mock API base URL
const API_URL = 'https://api.example.com/groups';

// Simulates creating a new group
export const createGroup = async (data: CreateGroupInput): Promise<Group> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));

    const newGroup: Group = {
      id: `group-${Math.floor(Math.random() * 10000)}`,
      name: data.name,
      description: data.description || '',
      projectId: data.projectId,
      projectTitle: data.projectTitle,
      members: data.members || [],
      progress: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return newGroup;
  } catch (error) {
    console.error('Failed to create group:', error);
    throw error;
  }
};

// Simulates updating an existing group
export const updateGroup = async (id: string, data: UpdateGroupInput): Promise<Group> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock the updated group
    return {
      id,
      name: data.name || 'Updated Group',
      description: data.description || 'This is an updated group description',
      projectId: 'project1',
      projectTitle: 'Research on Machine Learning Applications',
      members: data.members || [
        {
          id: 'user1',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'leader',
          avatar: `https://ui-avatars.com/api/?name=John+Doe&background=random`
        },
        {
          id: 'user2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'member',
          avatar: `https://ui-avatars.com/api/?name=Jane+Smith&background=random`
        }
      ],
      progress: 25,
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to update group ${id}:`, error);
    throw error;
  }
};

// Simulates deleting a group
export const deleteGroup = async (id: string): Promise<boolean> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return true;
  } catch (error) {
    console.error(`Failed to delete group ${id}:`, error);
    throw error;
  }
};

// Simulates fetching all groups
export const getGroups = async (): Promise<Group[]> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data
    const groups: Group[] = [
      {
        id: 'group1',
        name: 'Research Team Alpha',
        description: 'Machine learning research team focused on healthcare applications',
        projectId: 'project1',
        projectTitle: 'Research on Machine Learning Applications',
        members: [
          {
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            role: 'leader',
            avatar: `https://ui-avatars.com/api/?name=John+Doe&background=random`
          },
          {
            id: 'user2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            role: 'member',
            avatar: `https://ui-avatars.com/api/?name=Jane+Smith&background=random`
          },
          {
            id: 'user3',
            name: 'Alice Brown',
            email: 'alice@example.com',
            role: 'member',
            avatar: `https://ui-avatars.com/api/?name=Alice+Brown&background=random`
          }
        ],
        progress: 35,
        createdAt: '2025-05-01T00:00:00Z',
        updatedAt: '2025-05-10T00:00:00Z'
      },
      {
        id: 'group2',
        name: 'Research Team Beta',
        description: 'Data analysis and visualization team',
        projectId: 'project1',
        projectTitle: 'Research on Machine Learning Applications',
        members: [
          {
            id: 'user4',
            name: 'Bob Wilson',
            email: 'bob@example.com',
            role: 'leader',
            avatar: `https://ui-avatars.com/api/?name=Bob+Wilson&background=random`
          },
          {
            id: 'user5',
            name: 'Carol Davis',
            email: 'carol@example.com',
            role: 'member',
            avatar: `https://ui-avatars.com/api/?name=Carol+Davis&background=random`
          }
        ],
        progress: 20,
        createdAt: '2025-05-02T00:00:00Z',
        updatedAt: '2025-05-12T00:00:00Z'
      },
      {
        id: 'group3',
        name: 'Green Energy Team',
        description: 'Team focused on renewable energy research',
        projectId: 'project2',
        projectTitle: 'Sustainable Energy Solutions',
        members: [
          {
            id: 'user6',
            name: 'Daniel Evans',
            email: 'daniel@example.com',
            role: 'leader',
            avatar: `https://ui-avatars.com/api/?name=Daniel+Evans&background=random`
          },
          {
            id: 'user7',
            name: 'Eva Green',
            email: 'eva@example.com',
            role: 'member',
            avatar: `https://ui-avatars.com/api/?name=Eva+Green&background=random`
          },
          {
            id: 'user8',
            name: 'Frank Thomas',
            email: 'frank@example.com',
            role: 'member',
            avatar: `https://ui-avatars.com/api/?name=Frank+Thomas&background=random`
          },
          {
            id: 'user9',
            name: 'Grace Hill',
            email: 'grace@example.com',
            role: 'member',
            avatar: `https://ui-avatars.com/api/?name=Grace+Hill&background=random`
          }
        ],
        progress: 15,
        createdAt: '2025-05-05T00:00:00Z',
        updatedAt: '2025-05-15T00:00:00Z'
      }
    ];
    
    return groups;
  } catch (error) {
    console.error('Failed to fetch groups:', error);
    throw error;
  }
};

// Simulates fetching a single group by its ID
export const getGroupById = async (id: string): Promise<Group> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Return mock data for the specified group
    const groups = await getGroups();
    const group = groups.find(g => g.id === id);
    
    if (!group) {
      throw new Error(`Group with ID ${id} not found`);
    }
    
    return group;
  } catch (error) {
    console.error(`Failed to fetch group ${id}:`, error);
    throw error;
  }
};

// Simulates fetching all available students (for adding to groups)
export const getAvailableStudents = async (): Promise<Student[]> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    const students: Student[] = [
      {
        id: 'student1',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: `https://ui-avatars.com/api/?name=Alex+Johnson&background=random`
      },
      {
        id: 'student2',
        name: 'Beth Miller',
        email: 'beth@example.com',
        avatar: `https://ui-avatars.com/api/?name=Beth+Miller&background=random`
      },
      {
        id: 'student3',
        name: 'Chris Davis',
        email: 'chris@example.com',
        avatar: `https://ui-avatars.com/api/?name=Chris+Davis&background=random`
      },
      {
        id: 'student4',
        name: 'Diana Lee',
        email: 'diana@example.com',
        avatar: `https://ui-avatars.com/api/?name=Diana+Lee&background=random`
      },
      {
        id: 'student5',
        name: 'Ethan White',
        email: 'ethan@example.com',
        avatar: `https://ui-avatars.com/api/?name=Ethan+White&background=random`
      }
    ];
    
    return students;
  } catch (error) {
    console.error('Failed to fetch available students:', error);
    throw error;
  }
};

// Simulates adding a student to a group
export const addMemberToGroup = async (groupId: string, memberId: string): Promise<Group> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the current group
    const group = await getGroupById(groupId);
    
    // Get the student
    const students = await getAvailableStudents();
    const student = students.find(s => s.id === memberId);
    
    if (!student) {
      throw new Error(`Student with ID ${memberId} not found`);
    }
    
    // Add the student as a member
    const newMember: GroupMember = {
      id: student.id,
      name: student.name,
      email: student.email,
      role: 'member',
      avatar: student.avatar
    };
    
    // Create an updated group with the new member
    return {
      ...group,
      members: [...group.members, newMember],
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to add member ${memberId} to group ${groupId}:`, error);
    throw error;
  }
};

// Simulates removing a member from a group
export const removeMemberFromGroup = async (groupId: string, memberId: string): Promise<Group> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the current group
    const group = await getGroupById(groupId);
    
    // Remove the member
    return {
      ...group,
      members: group.members.filter(member => member.id !== memberId),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to remove member ${memberId} from group ${groupId}:`, error);
    throw error;
  }
};

// Simulates changing the group leader
export const changeGroupLeader = async (groupId: string, newLeaderId: string): Promise<Group> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Get the current group
    const group = await getGroupById(groupId);
    
    // Update the member roles
    return {
      ...group,
      members: group.members.map(member => ({
        ...member,
        role: member.id === newLeaderId ? 'leader' : 'member'
      })),
      updatedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error(`Failed to change leader to ${newLeaderId} in group ${groupId}:`, error);
    throw error;
  }
};

// Simulates getting progress data for a group
export const getGroupProgress = async (groupId: string): Promise<any> => {
  try {
    // In a real implementation, this would be an API call
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Return mock progress data
    return {
      totalTasks: 20,
      completedTasks: 8,
      tasksInProgress: 5,
      tasksByMember: [
        { name: 'John Doe', total: 7, completed: 4 },
        { name: 'Jane Smith', total: 6, completed: 2 },
        { name: 'Alice Brown', total: 7, completed: 2 }
      ],
      weeklyProgress: [
        { week: '05/01', completed: 2 },
        { week: '05/08', completed: 3 },
        { week: '05/15', completed: 1 },
        { week: '05/22', completed: 2 }
      ]
    };
  } catch (error) {
    console.error(`Failed to get progress data for group ${groupId}:`, error);
    throw error;
  }
};
