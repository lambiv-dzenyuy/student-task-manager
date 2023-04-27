export interface Task {
  id: string;
  title: string;
  description?: string | undefined;
  status: string;
  priority: string;
  completed: boolean | undefined;
  studentId: number;
  projectId: string;
  endDate: Date;
  startDate: Date;
  createdAt: Date;
}

export interface Project {
  id: string;
  title: string;
  description?: string | undefined;
  studentId: number;
  endDate: Date;
  startDate: Date;
  createdAt: Date;
}

export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  avatar: string;
  email: string;
}
