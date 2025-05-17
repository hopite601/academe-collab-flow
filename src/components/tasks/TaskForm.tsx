
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

import { TaskInput, Task } from "@/services/taskService";
import { getProjectGroups, getAvailableStudents } from "@/services/taskService";
import { getProjects } from "@/services/projectService";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Schema validation for form inputs
const taskFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters."),
  description: z.string().min(10, "Description must be at least 10 characters."),
  status: z.string({
    required_error: "Please select a task status.",
  }),
  priority: z.string({
    required_error: "Please select a priority level.",
  }),
  dueDate: z.date({
    required_error: "Please select a due date.",
  }),
  projectId: z.string().optional(),
  groupId: z.string().optional(),
  assigneeIds: z.array(z.string()).optional(),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: TaskInput) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function TaskForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: TaskFormProps) {
  // State for selected assignees management
  const [selectedAssigneeIds, setSelectedAssigneeIds] = useState<string[]>(
    initialData?.assignees?.map((a) => a.id) || []
  );

  // Fetch projects
  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  // Fetch groups based on selected project
  const { data: groups = [], refetch: refetchGroups } = useQuery({
    queryKey: ["groups", form.watch("projectId")],
    queryFn: () => getProjectGroups(form.watch("projectId")),
    enabled: !!form.watch("projectId"),
  });

  // Fetch available students for assignment
  const { data: students = [] } = useQuery({
    queryKey: ["students"],
    queryFn: getAvailableStudents,
  });

  // Parse dueDate from string to Date if it exists
  const initialDueDate = initialData?.dueDate
    ? new Date(initialData.dueDate)
    : new Date();

  // Setup form with react-hook-form and zod validation
  const form = useForm<TaskFormSchema>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      status: initialData?.status || "todo",
      priority: initialData?.priority || "medium",
      dueDate: initialDueDate,
      projectId: initialData?.projectId || "",
      groupId: initialData?.groupId || "",
      assigneeIds: initialData?.assignees?.map((a) => a.id) || [],
    },
  });

  // Handle form submission
  const handleSubmit = async (data: TaskFormSchema) => {
    // Prepare data for API
    const taskData: TaskInput = {
      ...data,
      assigneeIds: selectedAssigneeIds,
    };
    
    onSubmit(taskData);
  };

  // Update groups when project changes
  useEffect(() => {
    if (form.watch("projectId")) {
      refetchGroups();
      // Clear group selection when project changes
      if (!initialData) {
        form.setValue("groupId", "");
      }
    }
  }, [form.watch("projectId")]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter task title"
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
                  placeholder="Enter task description"
                  className="resize-none min-h-[100px] border-academe-300 focus:ring-academe-400"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="projectId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="border-academe-300 focus:ring-academe-400">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {projects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="groupId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Group</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!form.watch("projectId") || isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="border-academe-300 focus:ring-academe-400">
                      <SelectValue placeholder="Select group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {groups.map((group) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="border-academe-300 focus:ring-academe-400">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="todo">To Do</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="border-academe-300 focus:ring-academe-400">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Due Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full pl-3 text-left font-normal border-academe-300 focus:ring-academe-400",
                        !field.value && "text-muted-foreground"
                      )}
                      disabled={isSubmitting}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assigneeIds"
          render={() => (
            <FormItem>
              <FormLabel>Assign To</FormLabel>
              <div>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between border-academe-300 focus:ring-academe-400",
                          !selectedAssigneeIds.length && "text-muted-foreground"
                        )}
                        disabled={isSubmitting}
                      >
                        {selectedAssigneeIds.length > 0
                          ? `${selectedAssigneeIds.length} student${
                              selectedAssigneeIds.length > 1 ? "s" : ""
                            } selected`
                          : "Select students"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search students..." />
                      <CommandEmpty>No student found.</CommandEmpty>
                      <CommandGroup className="max-h-60 overflow-y-auto">
                        {students.map((student) => {
                          const isSelected = selectedAssigneeIds.includes(
                            student.id
                          );
                          return (
                            <CommandItem
                              key={student.id}
                              value={student.id}
                              onSelect={() => {
                                setSelectedAssigneeIds((current) =>
                                  isSelected
                                    ? current.filter((id) => id !== student.id)
                                    : [...current, student.id]
                                );
                              }}
                              className="flex items-center gap-2"
                            >
                              <div
                                className={cn(
                                  "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                  isSelected
                                    ? "bg-primary text-primary-foreground"
                                    : "opacity-50"
                                )}
                              >
                                {isSelected && <Check className="h-3 w-3" />}
                              </div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <img
                                    src={
                                      student.avatar ||
                                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        student.name
                                      )}&background=random`
                                    }
                                    alt={student.name}
                                  />
                                </Avatar>
                                <span>{student.name}</span>
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              {/* Display selected assignees */}
              {selectedAssigneeIds.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {students
                    .filter((student) => selectedAssigneeIds.includes(student.id))
                    .map((student) => (
                      <Badge
                        key={student.id}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-1"
                      >
                        <Avatar className="h-4 w-4">
                          <img
                            src={
                              student.avatar ||
                              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                student.name
                              )}&background=random`
                            }
                            alt={student.name}
                          />
                        </Avatar>
                        <span className="text-xs">{student.name}</span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedAssigneeIds((current) =>
                              current.filter((id) => id !== student.id)
                            );
                          }}
                          className="ml-1 text-muted-foreground/70 hover:text-muted-foreground"
                          disabled={isSubmitting}
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                </div>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        
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
              ? "Update Task"
              : "Create Task"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
