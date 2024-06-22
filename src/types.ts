export type Task = { text: String, completed: Boolean }
export type Project = { name: String, description: String, deadline: number, tasks: Task[] }

export type ProjectsAction =
  | { type: "CREATE_TASK"; projectIndex: number, data: Task }
  | { type: "UPDATE_TASK"; projectIndex: number, taskIndex: number, data: Task }
  | { type: "DELETE_TASK"; projectIndex: number, taskIndex: number, data: Task }
  | { type: "CREATE_PROJECT"; data: Project}
  | { type: "DELETE_PROJECT"; projectIndex: number }
