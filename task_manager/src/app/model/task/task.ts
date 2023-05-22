import { Data } from "@angular/router"
import { User } from "../user/user"

export interface Task {
    id: number
    header: string
    description: string 
    linkInfo: string
    status: string
    startData: Data
    finishData: Data
    user: User
}