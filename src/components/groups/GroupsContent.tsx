import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Group } from "@/components/groups/GroupCard";
import { GroupsSearchFilter } from "@/components/groups/GroupsSearchFilter";
import { GroupsList } from "@/components/groups/GroupsList";
import { GroupsHeader } from "@/components/groups/GroupsHeader";

export function GroupsContent() {
  const { user } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  
  // Mock data loading
  useEffect(() => {
    // Generate mock groups data
    const mockGroups: Group[] = [
      {
        id: "group1",
        name: "ML Research Team",
        projectId: "project1",
        projectTitle: "Research on Machine Learning Applications",
        members: [
          {
            id: user?.id || "user1",
            name: user?.name || "John Doe",
            role: user?.role === "leader" ? "leader" : "member",
            avatar: user?.avatar || `https://ui-avatars.com/api/?name=John+Doe&background=random`,
          },
          {
            id: "user2",
            name: "Alice Smith",
            role: user?.role === "leader" ? "member" : "leader",
            avatar: `https://ui-avatars.com/api/?name=Alice+Smith&background=random`,
          },
          {
            id: "user3",
            name: "Bob Johnson",
            role: "member",
            avatar: `https://ui-avatars.com/api/?name=Bob+Johnson&background=random`,
          },
          {
            id: "user4",
            name: "Carol Williams",
            role: "member",
            avatar: `https://ui-avatars.com/api/?name=Carol+Williams&background=random`,
          },
        ],
        progress: 35,
        hasUnreadMessages: true,
      },
      {
        id: "group2",
        name: "Sustainable Energy Team",
        projectId: "project2",
        projectTitle: "Sustainable Energy Solutions",
        members: [
          {
            id: "user5",
            name: "Dave Brown",
            role: "leader",
            avatar: `https://ui-avatars.com/api/?name=Dave+Brown&background=random`,
          },
          {
            id: "user6",
            name: "Eve Taylor",
            role: "member",
            avatar: `https://ui-avatars.com/api/?name=Eve+Taylor&background=random`,
          },
          {
            id: "user7",
            name: "Frank White",
            role: "member",
            avatar: `https://ui-avatars.com/api/?name=Frank+White&background=random`,
          },
          {
            id: "user8",
            name: "Grace Lee",
            role: "member",
            avatar: `https://ui-avatars.com/api/?name=Grace+Lee&background=random`,
          },
          {
            id: "user9",
            name: "Harry Wilson",
            role: "member",
            avatar: `https://ui-avatars.com/api/?name=Harry+Wilson&background=random`,
          },
        ],
        progress: 15,
      },
    ];

    setGroups(mockGroups);
  }, [user]);

  const filteredGroups = groups.filter((group) => {
    const matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         group.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesProject = projectFilter === "all" || group.projectId === projectFilter;
    
    return matchesSearch && matchesProject;
  });

  // Unique projects for filter
  const projects = Array.from(new Set(groups.map(group => ({ id: group.projectId, title: group.projectTitle }))))
    .filter((value, index, self) => 
      self.findIndex(proj => proj.id === value.id) === index
    );

  const handleGroupClick = (group: Group) => {
    console.log("Group clicked:", group);
    // This would navigate to group details in a real application
  };

  // Handle project creation
  const handleCreateProject = (projectData: any) => {
    console.log("Creating project:", projectData);
    // Generate a new unique ID
    const newProjectId = `project${groups.length + 1}`;
    
    // Create a list of randomly generated members
    const memberCount = projectData.members || 2;
    const newMembers = Array.from({ length: memberCount }).map((_, index) => {
      const isLeader = index === 0;
      const roleValue = isLeader ? "leader" : "member";
      const name = isLeader 
        ? (projectData.leaderName || "Team Leader") 
        : `Team Member ${index + 1}`;
      
      return {
        id: `user-${newProjectId}-${index}`,
        name: name,
        role: roleValue as "leader" | "member",
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      };
    });

    // Create the new group
    const newGroup: Group = {
      id: `group${groups.length + 1}`,
      name: `${projectData.title} Team`,
      projectId: newProjectId,
      projectTitle: projectData.title,
      members: newMembers,
      progress: 0,
    };

    // Add the new group to the list
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="space-y-6">
      <GroupsHeader />
      
      <GroupsSearchFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        projectFilter={projectFilter}
        setProjectFilter={setProjectFilter}
        projects={projects}
      />
      
      <GroupsList 
        groups={filteredGroups} 
        onGroupClick={handleGroupClick} 
      />
    </div>
  );
}
