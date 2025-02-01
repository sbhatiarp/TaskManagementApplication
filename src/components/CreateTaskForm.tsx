import React, { useState } from "react";
import {
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { taskService } from "../services/taskService";

interface CreateTaskFormProps {
  onTaskCreated?: () => void;
}

const CreateTaskForm: React.FC<CreateTaskFormProps> = ({ onTaskCreated }) => {
  const [description, setDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handles form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await taskService.createTask({ description, isCompleted });

      // Reset form fields after successful creation
      setDescription("");
      setIsCompleted(false);

      // Notify parent component
      onTaskCreated?.();
    } catch (err) {
      console.error("Error creating task:", err);
      setError("Failed to create task. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
        <TextField
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          required
          disabled={isLoading}
          fullWidth
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isCompleted}
              onChange={({ target }) => setIsCompleted(target.checked)}
              disabled={isLoading}
            />
          }
          label="Is Completed"
        />

        {error && <Alert severity="error">{error}</Alert>}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Creating..." : "Create Task"}
        </Button>
      </Box>
    </form>
  );
};

export default CreateTaskForm;
