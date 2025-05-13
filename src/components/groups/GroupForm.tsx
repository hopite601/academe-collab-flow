
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Group } from "./GroupCard";

const formSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  leaderName: z.string().min(3, "Team leader name is required."),
});

type GroupFormValues = z.infer<typeof formSchema>;

interface GroupFormProps {
  initialData?: Partial<Group>;
  projectId: string;
  projectTitle: string;
  onSubmit: (data: GroupFormValues) => void;
  onCancel: () => void;
}

export function GroupForm({ initialData, projectId, projectTitle, onSubmit, onCancel }: GroupFormProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      leaderName: initialData?.members?.find(m => m.role === "leader")?.name || "",
    },
  });

  const handleSubmit = async (data: GroupFormValues) => {
    try {
      setLoading(true);
      // In a real app, we'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulates API call
      onSubmit(data);
      toast.success(initialData ? "Group updated" : "Group created");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
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

        <FormField
          control={form.control}
          name="leaderName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Team Leader's Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter team leader name" 
                  {...field}
                  className="border-academe-300 focus:ring-academe-400"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={loading}
            className="border-academe-300 hover:bg-academe-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
            className="bg-academe-500 hover:bg-academe-600"
          >
            {loading ? "Saving..." : initialData ? "Update Group" : "Create Group"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
