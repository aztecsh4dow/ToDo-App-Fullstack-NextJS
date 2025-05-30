import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
  Typography,
  Chip,
  Box,
  Paper,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import { Todo } from '../types/todo';

interface TaskListProps {
  tasks: Todo[];
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Todo) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
  onStartTimer: (taskId: number) => void;
}

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
  onReorder,
  onStartTimer,
}: TaskListProps) {
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return '#ff4d4d';
      case 'medium':
        return '#ffd700';
      default:
        return '#90ee90';
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="taskList">
        {(provided) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <ListItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    component={Paper}
                    elevation={2}
                    sx={{
                      mb: 1,
                      borderLeft: `4px solid ${getPriorityColor(task.priority)}`,
                    }}
                  >
                    <Checkbox
                      checked={task.completed}
                      onChange={() => onToggleComplete(task.id)}
                    />
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          style={{
                            textDecoration: task.completed ? 'line-through' : 'none',
                          }}
                        >
                          {task.title}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="textSecondary">
                            {task.description}
                          </Typography>
                          {task.dueDate && (
                            <Typography variant="caption" color="textSecondary">
                              Due: {format(new Date(task.dueDate), 'PPp')}
                            </Typography>
                          )}
                          <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {task.tags.map((tag) => (
                              <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="timer"
                        onClick={() => onStartTimer(task.id)}
                      >
                        <TimerIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onEdit(task)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
}