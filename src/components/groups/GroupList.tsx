
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Users, Eye, Edit, Trash } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

type Group = {
  id: string;
  name: string;
  description: string;
  leaderId: string;
  leaderName: string;
  members: number | { id: string, name: string }[];
  projectId: string;
  projectTitle: string;
};

interface GroupListProps {
  groups: Group[];
  projectId: string;
}

export function GroupList({ groups, projectId }: GroupListProps) {
  const { user } = useAuth();
  const [deleteGroupId, setDeleteGroupId] = useState<string | null>(null);
  
  const isMentor = user?.role === "mentor";

  const handleDeleteGroup = (groupId: string) => {
    // In a real app, this would be an API call
    toast.success("Group deleted successfully");
    setDeleteGroupId(null);
  };

  const getMemberCount = (group: Group) => {
    if (typeof group.members === 'number') {
      return group.members;
    }
    return group.members.length;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Project Groups</h3>
        {isMentor && (
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Group
          </Button>
        )}
      </div>
      
      {groups.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No groups found for this project.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <Card key={group.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{getMemberCount(group)}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">
                  {group.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Team Leader: </span>
                    <span>{group.leaderName}</span>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    {isMentor && (
                      <>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setDeleteGroupId(group.id)}
                        >
                          <Trash className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <AlertDialog open={!!deleteGroupId} onOpenChange={() => setDeleteGroupId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the group and remove all members from it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={() => deleteGroupId && handleDeleteGroup(deleteGroupId)}
              className="bg-destructive text-destructive-foreground"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
