export interface Task {
  id: string;
  title: string;
  description?: string | undefined;
  status: string;
  priority: string;
  completed?: boolean | undefined;
  studentId: number;
  projectId: string;
  endDate?: Date;
  startDate?: Date;
  createdAt?: Date;
}
