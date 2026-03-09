import express, { Request, Response } from "express"
import fs from "fs"
import type { User } from "./models/user"
import { authMiddleware } from "./middleware/auth"
import { tokenMiddleware } from "./middleware/token"

const app = express()

const usersData = require("./data/users.json")

app.use(express.json())

app.use(authMiddleware)
app.use(tokenMiddleware)



app.get("/users", (req: Request, res: Response) => {
    res.json(usersData.users)
})



app.get("/users/:email", (req: Request, res: Response) => {

    const email = req.params.email

    const user = usersData.users.find((u: User) => u.email === email)

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    res.json(user)
})



app.post("/users", (req: Request, res: Response) => {

    const newUser: User = req.body

    usersData.users.push(newUser)

    fs.writeFileSync(
        "./src/data/users.json",
        JSON.stringify(usersData, null, 2)
    )

    res.status(201).json(newUser)
})



app.put("/users/:email", (req: Request, res: Response) => {

    const email = req.params.email

    const index = usersData.users.findIndex((u: User) => u.email === email)

    if (index === -1) {
        return res.status(404).json({ message: "User not found" })
    }

    const updatedUser: User = {
        ...usersData.users[index],
        ...req.body
    }

    usersData.users[index] = updatedUser

    fs.writeFileSync(
        "./src/data/users.json",
        JSON.stringify(usersData, null, 2)
    )

    res.json(updatedUser)
})



app.delete("/users/:email", (req: Request, res: Response) => {

    const email = req.params.email

    const user = usersData.users.find((u: User) => u.email === email)

    if (!user) {
        return res.status(404).json({ message: "User not found" })
    }

    usersData.users = usersData.users.filter((u: User) => u.email !== email)

    fs.writeFileSync(
        "./src/data/users.json",
        JSON.stringify(usersData, null, 2)
    )

    res.json({ message: "User deleted" })
})

app.listen(3000, () => {
    console.log("Server running on port 3000")
})