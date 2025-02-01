import axios from "axios";

export interface Task {
  id: number;
  description: string;
  createdDate: string;
  isCompleted: boolean;
}

export interface CreateTaskDto {
  description: string;
  isCompleted: boolean;
}

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: "https://localhost:57382/api",
  headers: { "Content-Type": "application/json" },
});

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    try {
      const { data } = await apiClient.get<Task[]>("/Tasks");
      return data;
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks. Please try again.");
    }
  },

  deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/Tasks/${id}`).catch((error) => {
      console.error(`Error deleting task ${id}:`, error);
      throw new Error(`Failed to delete task ${id}. Please try again.`);
    });
  },

  createTask: async (task: CreateTaskDto): Promise<Task> => {
    try {
      const { data } = await apiClient.post<Task>("/Tasks", task);
      return data;
    } catch (error) {
      console.error("Error creating task:", error);
      throw new Error("Failed to create task. Please try again.");
    }
  },
};
