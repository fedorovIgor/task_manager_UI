import { StatusProject } from "./status_project";


export interface Project {
    id: number;
    name: string;
    description: string;
    startData: Date;
    status: StatusProject;
}