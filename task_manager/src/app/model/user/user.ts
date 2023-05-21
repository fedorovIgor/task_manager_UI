import { Permision } from "./permision"

export interface User {
    id: number
    firstName: string
    lastName: string
    email: string
    password: string
    permisions: Permision[]
}