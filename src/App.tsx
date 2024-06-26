import { Reducer, useReducer, useState } from "react"
import { Project, ProjectsAction } from "./types"
import Sidebar from "./components/sidebar"
import ProjectView from "./components/projectView"

function projectsReducer(state: Project[], action: ProjectsAction): Project[] {
  var newState: Project[] = JSON.parse(JSON.stringify(state)) // copy

  switch(action.type) {
    case "CREATE_TASK":
      newState[action.projectIndex].tasks.push(action.data)
      break
    case "UPDATE_TASK":
      newState[action.projectIndex].tasks[action.taskIndex] = action.data
      break
    case "DELETE_TASK":
      newState[action.projectIndex].tasks.splice(action.taskIndex, 1)
      break
    case "CREATE_PROJECT":
      newState.push(action.data)
      break
    case "DELETE_PROJECT":
      newState.splice(action.projectIndex, 1)
      break
    case "UPDATE_PROJECT":
      newState[action.projectIndex] = action.data
      break
  }

  return newState
}

function App() {
  const [ projects, dispatchProjects ] = useReducer<Reducer<Project[], ProjectsAction>>(projectsReducer, [])
  const [ selectedProjectId, setSelectedProjectId ] = useState<number>()
  
  return (
      <>
        <Sidebar projects={projects} dispatchProjects={dispatchProjects} selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />
        <ProjectView setSelectedProjectId={setSelectedProjectId} project={selectedProjectId !== undefined ? projects[selectedProjectId] : null} projectsDispatch={dispatchProjects} projectId={selectedProjectId} />
      </>
  )
}

export default App
