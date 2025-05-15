
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
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ProjectInput } from "@/services/projectService";

// Update the form schema for server validation
const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  teamLeaderName: z.string().optional(),
  // Tags are handled separately, not in the form schema
});

type ProjectFormValues = z.infer<typeof formSchema>;

interface ProjectFormProps {
  initialData?: any; // We'll type-cast internally
  onSubmit: (data: ProjectInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function ProjectForm({ initialData, onSubmit, onCancel, isSubmitting = false }: ProjectFormProps) {
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [tagInput, setTagInput] = useState("");

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData 
      ? {
          title: initialData.title,
          description: initialData.description,
          teamLeaderName: initialData.teamLeaderName || "",
        }
      : {
          title: "",
          description: "",
          teamLeaderName: "",
        },
  });

  const handleSubmit = async (data: ProjectFormValues) => {
    // Combine form data with tags
    const formData: ProjectInput = {
      ...data,
      tags: tags,
    };
    
    onSubmit(formData);
  };

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
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
                <Input 
                  placeholder="Enter project name" 
                  {...field} 
                  className="border-academe-300 focus:ring-academe-400"
                  disabled={isSubmitting}
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
                  placeholder="Enter project description" 
                  className="resize-none min-h-[100px] border-academe-300 focus:ring-academe-400" 
                  {...field} 
                  disabled={isSubmitting}
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
            <FormItem>
              <FormLabel>Team Leader's Name</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Enter team leader's name" 
                  {...field} 
                  className="border-academe-300 focus:ring-academe-400"
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Tags</FormLabel>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                className="bg-academe-100 text-academe-800 hover:bg-academe-200 px-3 py-1"
              >
                {tag}
                <button 
                  type="button" 
                  onClick={() => removeTag(tag)} 
                  className="ml-2 text-academe-700 hover:text-academe-900"
                  disabled={isSubmitting}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex">
            <Input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInputKeyDown}
              onBlur={addTag}
              placeholder="Enter tags separated by commas"
              className="border-academe-300 focus:ring-academe-400"
              disabled={isSubmitting}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Press Enter or comma to add a tag
          </p>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onCancel}
            disabled={isSubmitting}
            className="border-academe-300 hover:bg-academe-50"
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-academe-500 hover:bg-academe-600"
          >
            {isSubmitting 
              ? "Saving..." 
              : initialData 
                ? "Update Project" 
                : "Create Project"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
