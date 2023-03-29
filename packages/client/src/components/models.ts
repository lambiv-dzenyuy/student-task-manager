export interface Task { id: number; title: string; description: string; status: string; completed : boolean; }

export interface Meta {
  totalCount: number;
}

export interface Todo { id: number; value: string; list: string; }
