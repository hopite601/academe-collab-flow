
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Student } from "@/types/group";
import { getAvailableStudents } from "@/services/groupService";

interface AddMemberDialogProps {
  groupId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddMember: (studentId: string) => void;
  existingMemberIds: string[];
}

export function AddMemberDialog({
  groupId,
  open,
  onOpenChange,
  onAddMember,
  existingMemberIds
}: AddMemberDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);

  // Fetch available students
  const { data: students = [], isLoading } = useQuery({
    queryKey: ["availableStudents"],
    queryFn: () => getAvailableStudents(),
  });

  // Filter out students who are already members
  const availableStudents = students.filter(
    student => !existingMemberIds.includes(student.id)
  );

  const handleAddMember = async () => {
    if (!selectedStudentId) return;
    
    try {
      setLoading(true);
      await onAddMember(selectedStudentId);
      onOpenChange(false);
      setSelectedStudentId(null);
    } catch (error) {
      console.error("Failed to add member:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member to Group</DialogTitle>
          <DialogDescription>
            Select a student to add to your group.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {isLoading ? (
            <div className="flex items-center justify-center p-4">
              <div className="text-sm text-muted-foreground">Loading students...</div>
            </div>
          ) : availableStudents.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-sm text-muted-foreground">No available students found</p>
            </div>
          ) : (
            <ScrollArea className="h-[250px] pr-4">
              <div className="space-y-2">
                {availableStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStudentId === student.id
                        ? "bg-primary/10 dark:bg-primary/20"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedStudentId(student.id)}
                  >
                    <Avatar className="h-9 w-9 mr-3">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleAddMember}
            disabled={!selectedStudentId || loading}
            className="bg-academe-500 hover:bg-academe-600"
          >
            {loading ? "Adding..." : "Add Member"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
