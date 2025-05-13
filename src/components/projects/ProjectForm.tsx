
import { useState, useEffect } from "react";
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
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput, 
  CommandItem 
} from "@/components/ui/command";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Project } from "./ProjectCard";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  teamLeaderId: z.string().optional(),
  teamLeaderName: z.string().min(3, "Team leader name is required."),
});

type ProjectFormValues = z.infer<typeof formSchema>;

// Mock data for team leaders
const mockLeaders = [
  { id: "leader1", name: "Jane Leader" },
  { id: "leader2", name: "Mike Stewart" },
  { id: "leader3", name: "Alex Johnson" },
  { id: "leader4", name: "Sarah Williams" },
  { id: "leader5", name: "Chris Davis" },
];

interface ProjectFormProps {
  initialData?: Project;
  onSubmit: (data: ProjectFormValues) => void;
  onCancel: () => void;
}

export function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [leaders, setLeaders] = useState(mockLeaders);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData 
      ? {
          title: initialData.title,
          description: initialData.description,
          teamLeaderId: initialData.teamLeaderId || "",
          teamLeaderName: initialData.teamLeaderName || "",
        }
      : {
          title: "",
          description: "",
          teamLeaderId: "",
          teamLeaderName: "",
        },
  });

  // Filter leaders based on search term (simulate API search)
  useEffect(() => {
    const fetchLeaders = async () => {
      // This would be an API call in a real application
      if (searchTerm) {
        const filtered = mockLeaders.filter(leader => 
          leader.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setLeaders(filtered);
      } else {
        setLeaders(mockLeaders);
      }
    };

    fetchLeaders();
  }, [searchTerm]);

  const handleSubmit = async (data: ProjectFormValues) => {
    try {
      setLoading(true);
      // In a real app, we'd make an API call here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulates API call
      onSubmit(data);
      toast.success(initialData ? "Project updated" : "Project created");
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter project name" {...field} />
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
                  placeholder="Enter project description" 
                  className="resize-none min-h-[100px]" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teamLeaderName"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Team Leader's Name</FormLabel>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {field.value
                        ? field.value
                        : "Select team leader"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0">
                  <Command>
                    <CommandInput 
                      placeholder="Search leader..." 
                      onValueChange={setSearchTerm}
                    />
                    <CommandEmpty>No team leader found.</CommandEmpty>
                    <CommandGroup>
                      {leaders.map((leader) => (
                        <CommandItem
                          value={leader.name}
                          key={leader.id}
                          onSelect={() => {
                            form.setValue("teamLeaderName", leader.name);
                            form.setValue("teamLeaderId", leader.id);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              leader.name === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {leader.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
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
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={loading}
          >
            {loading ? "Saving..." : initialData ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
