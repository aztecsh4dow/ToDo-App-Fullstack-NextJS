export interface Todo {
  id: number;
  userId: number;
  title: string;
  description?: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  subtasks: Subtask[];
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    endDate?: Date;
  };
  timer?: {
    duration: number;
    remaining: number;
    isRunning: boolean;
  };
}

export interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoFilter {
  status: 'all' | 'completed' | 'pending';
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  search?: string;
  tags?: string[];
  dueDate?: {
    from: Date;
    to: Date;
  };
}

export interface TodoSort {
  field: 'dueDate' | 'priority' | 'createdAt' | 'title';
  direction: 'asc' | 'desc';
}

export interface TodoStats {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  completionRate: number;
}