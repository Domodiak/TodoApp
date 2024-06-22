export type Task = { text: string, completed: boolean }
export type Project = { name: string, description: string, deadline: number, tasks: Task[] }

export type ProjectsAction =
  | { type: "CREATE_TASK"; projectIndex: number, data: Task }
  | { type: "UPDATE_TASK"; projectIndex: number, taskIndex: number, data: Task }
  | { type: "DELETE_TASK"; projectIndex: number, taskIndex: number, data: Task }
  | { type: "CREATE_PROJECT"; data: Project}
  | { type: "DELETE_PROJECT"; projectIndex: number }
