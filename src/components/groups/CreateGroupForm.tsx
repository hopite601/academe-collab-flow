
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createGroup, CreateGroupInput } from "@/services/groupService";
import { useAuth } from "@/contexts/AuthContext";
import { Project } from "@/types/group";

// Form schema for validation
const formSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters."),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface CreateGroupFormProps {
  project: Project;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateGroupForm({ project, onSuccess, onCancel }: CreateGroupFormProps) {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a group");
      return;
    }

    try {
      setIsSubmitting(true);

      // Prepare the group data with the current user as the leader
      const groupData: CreateGroupInput = {
        name: values.name,
        description: values.description,
        projectId: project.id,
        projectTitle: project.title,
        leaderId: user.id,
        members: [
          {
            id: user.id,
            name: user.name,
            email: user.email || "user@example.com", // Fallback in case email is not available
            role: "leader",
            avatar: user.avatar,
          },
        ],
      };

      // Create the group
      const newGroup = await createGroup(groupData);
      
      toast.success("Group created successfully!");
      
      // Navigate to the new group or call onSuccess
      if (onSuccess) {
        onSuccess();
      } else {
        router.navigate(`/dashboard/groups/${newGroup.id}`);
      }
    } catch (error) {
      console.error("Failed to create group:", error);
      toast.error("Failed to create group. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Project info section */}
        <div className="bg-secondary/20 p-4 rounded-lg">
          <h3 className="font-medium mb-2">Project Information</h3>
          <div className="text-sm text-muted-foreground mb-2">
            You're creating a group for:
          </div>
          <div className="font-medium">{project.title}</div>
          <div className="text-sm text-muted-foreground mt-1">
            {project.description}
          </div>
        </div>

        {/* Group name field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Group Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter group name"
                  {...field}
                  className="border-academe-300 focus:ring-academe-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Group description field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter group description"
                  className="resize-none min-h-[100px] border-academe-300 focus:ring-academe-400"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Group leader section */}
        <div>
          <div className="mb-2">
            <FormLabel>Group Leader</FormLabel>
          </div>
          {user && (
            <div className="flex items-center p-3 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Avatar className="h-9 w-9 mr-3">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">
                  {user.email || "Your account will be set as the group leader"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Form actions */}
        <div className="flex justify-end gap-2 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-academe-300 hover:bg-academe-50"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-academe-500 hover:bg-academe-600"
          >
            {isSubmitting ? "Creating..." : "Create Group"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
