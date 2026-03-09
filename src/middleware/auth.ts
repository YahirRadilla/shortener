import type { Request, Response, NextFunction } from "express"

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const auth = req.headers.authorization

    if (!auth || auth !== "fha5HpDXSXSjKU0QCbdXiz1a") {
        return res.status(401).json({ message: "Unauthorized" })
    }

    next()
}


