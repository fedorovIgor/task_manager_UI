import { Data } from "@angular/router"
import { User } from "../user/user"

export interface Task {
    id: number
    header: string
    description: string 
    linkInfo: string
    status: string
    startData?: Date
    finishData?: Date
    userKeycloakId: string
    userName?: string
    userEmail?: string
}