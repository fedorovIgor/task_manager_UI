import { Task } from "../task/task"
import { Project } from "./project"

export interface ProjectInfo {
    id: number
    name: string
    fullDescription: string
    tasks: Task[]
}