export interface Todo {
  id: number;
  userId: number;
  task: string;
  description?: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
  timer?: number;
}

export type TodoPriority = 'low' | 'medium' | 'high';

export interface TodoFilter {
  status: 'all' | 'completed' | 'pending';
  priority?: TodoPriority;
  category?: string;
  search?: string;
}

export interface TodoSort {
  field: 'dueDate' | 'priority' | 'createdAt';
  direction: 'asc' | 'desc';
}