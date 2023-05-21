import { Permision } from "./permision"

export interface User {
    id: number
    firstName: string
    lastName: string
    permisions: Permision[]
}