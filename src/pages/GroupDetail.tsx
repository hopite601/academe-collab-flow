
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GroupDetailHeader } from "@/components/groups/GroupDetailHeader";
import { GroupMemberList } from "@/components/groups/GroupMemberList";
import { AddMemberDialog } from "@/components/groups/AddMemberDialog";
import { ChangeLeaderDialog } from "@/components/groups/ChangeLeaderDialog";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getGroupById, 
  addMemberToGroup, 
  removeMemberFromGroup, 
  changeGroupLeader 
} from "@/services/groupService";
import { TaskList } from "@/components/tasks/TaskList";
import { getTasks } from "@/services/taskService";
import { Group, Task } from "@/types/group";

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  const [group, setGroup] = useState<Group | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isChangeLeaderOpen, setIsChangeLeaderOpen] = useState(false);
  
  // Determine if the current user is the group leader
  const isGroupLeader = group?.members.some(
    member => member.id === user?.id && member.role === "leader"
  );
  
  // Get existing member IDs
  const existingMemberIds = group?.members.map(member => member.id) || [];

  // Fetch group data
  useEffect(() => {
    const fetchGroupData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch group details
        const groupData = await getGroupById(id);
        setGroup(groupData);
        
        // Fetch tasks for this group
        const tasksData = await getTasks();
        setTasks(tasksData.filter(task => task.groupId === id));
        
      } catch (error) {
        console.error("Failed to fetch group data:", error);
        toast.error("Failed to load group details");
      } finally {
        setLoading(false);
      }
    };
    
    fetchGroupData();
  }, [id]);

  // Handle adding a member to the group
  const handleAddMember = async (studentId: string) => {
    if (!id) return;
    
    try {
      const updatedGroup = await addMemberToGroup(id, studentId);
      
      setGroup(updatedGroup);
      toast.success("Member added successfully");
    } catch (error) {
      console.error("Failed to add member:", error);
      toast.error("Failed to add member to group");
      throw error; // Re-throw to be caught by the dialog
    }
  };

  // Handle removing a member from the group
  const handleRemoveMember = async (memberId: string) => {
    if (!id || !group) return;
    
    // Prevent removing the last member or the leader
    if (group.members.length === 1) {
      toast.error("Cannot remove the last member of the group");
      return;
    }
    
    const isLeader = group.members.find(m => m.id === memberId)?.role === "leader";
    if (isLeader) {
      toast.error("Cannot remove the group leader. Change the leader first.");
      return;
    }
    
    try {
      const updatedGroup = await removeMemberFromGroup(id, memberId);
      
      setGroup(updatedGroup);
      toast.success("Member removed successfully");
    } catch (error) {
      console.error("Failed to remove member:", error);
      toast.error("Failed to remove member from group");
    }
  };

  // Handle changing the group leader
  const handleChangeLeader = async (memberId: string) => {
    if (!id) return;
    
    try {
      const updatedGroup = await changeGroupLeader(id, memberId);
      
      setGroup(updatedGroup);
      toast.success("Group leader changed successfully");
    } catch (error) {
      console.error("Failed to change leader:", error);
      toast.error("Failed to change group leader");
      throw error; // Re-throw to be caught by the dialog
    }
  };
  
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Group Header */}
        {group && (
          <GroupDetailHeader
            group={group}
            isLoading={loading}
            isLeader={isGroupLeader}
            onAddMember={() => setIsAddMemberOpen(true)}
            onChangeLeader={() => setIsChangeLeaderOpen(true)}
          />
        )}
        
        {/* Group Members List */}
        {group && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <GroupMemberList 
                members={group.members}
                isLoading={loading}
                isLeader={isGroupLeader}
                onRemoveMember={handleRemoveMember}
              />
            </div>
            
            {/* Tasks List */}
            <div className="lg:col-span-2">
              <TaskList 
                tasks={tasks}
                projectId={group.projectId}
                projectTitle={group.projectTitle}
              />
            </div>
          </div>
        )}
        
        {/* Add Member Dialog */}
        {group && (
          <AddMemberDialog
            groupId={id || ""}
            open={isAddMemberOpen}
            onOpenChange={setIsAddMemberOpen}
            onAddMember={handleAddMember}
            existingMemberIds={existingMemberIds}
          />
        )}
        
        {/* Change Leader Dialog */}
        {group && (
          <ChangeLeaderDialog
            open={isChangeLeaderOpen}
            onOpenChange={setIsChangeLeaderOpen}
            members={group.members.filter(m => m.role !== "leader")}
            onChangeLeader={handleChangeLeader}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default GroupDetail;
