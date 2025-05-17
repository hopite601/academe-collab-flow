
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GroupsList } from "./GroupsList";
import { GroupsSearchFilter } from "./GroupsSearchFilter";
import { useAuth } from "@/contexts/AuthContext";
import { getGroups } from "@/services/groupService";
import { Group } from "@/types/group";
import { LoadingSpinner } from "../ui/loading-spinner";

interface GroupsContentProps {
  projectId?: string;
}

export function GroupsContent({ projectId }: GroupsContentProps) {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [groups, setGroups] = useState<Group[]>([]);
  const [filteredGroups, setFilteredGroups] = useState<Group[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterProject, setFilterProject] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  
  // Fetch groups from API
  useEffect(() => {
    const fetchGroups = async () => {
      try {
        setLoading(true);
        const data = await getGroups();
        
        // If projectId is provided, filter groups by that project
        const relevantGroups = projectId 
          ? data.filter(group => group.projectId === projectId)
          : data;
        
        setGroups(relevantGroups);
        setFilteredGroups(relevantGroups);
      } catch (error) {
        console.error("Failed to fetch groups:", error);
        toast.error("Failed to load groups");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGroups();
  }, [projectId]);
  
  // Handle search and filter
  useEffect(() => {
    let result = [...groups];
    
    // Apply project filter if not "all"
    if (filterProject !== "all") {
      result = result.filter(group => group.projectId === filterProject);
    }
    
    // Apply search query if any
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        group => 
          group.name.toLowerCase().includes(query) || 
          (group.description?.toLowerCase().includes(query))
      );
    }
    
    setFilteredGroups(result);
  }, [groups, searchQuery, filterProject]);
  
  // Handle group click
  const handleGroupClick = (group: Group) => {
    navigate(`/dashboard/groups/${group.id}`);
  };
  
  // Extract unique projects for filter options
  const projectOptions = Array.from(
    new Set(groups.map(group => ({
      id: group.projectId,
      title: group.projectTitle
    })))
  );

  return (
    <div className="space-y-6">
      {/* Search and filter controls */}
      <GroupsSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterProject={filterProject}
        onFilterChange={setFilterProject}
        projectOptions={projectOptions}
      />
      
      {/* Groups list or loading state */}
      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner />
        </div>
      ) : (
        <GroupsList
          groups={filteredGroups}
          onGroupClick={handleGroupClick}
          emptyMessage={
            projectId
              ? "No groups found for this project"
              : "No groups found"
          }
        />
      )}
    </div>
  );
}
