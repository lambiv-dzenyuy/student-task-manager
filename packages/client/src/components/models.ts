export interface Task {
  id: string;
  title: string;
  description?: string | undefined;
  status: string;
  priority: string;
  completed?: boolean | undefined;
  studentId: number;
  projectId: string;
}

export interface Meta {
  totalCount: number;
}

export interface Todo { id: number; value: string; list: string; }
