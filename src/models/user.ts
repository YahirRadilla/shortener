

export interface User {
    name: string
    email: string
    role: "admin" | "moderator" | "user"
    isActive: boolean
    registrationDate: string
}