import type { Request, Response, NextFunction } from "express"

export const tokenMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    if (req.method !== "GET") {

        const token = req.headers.token

        if (!token || token !== "HIZe4D32twWOUP9h0I1IVTlr") {
            return res.status(403).json({ message: "Invalid token" })
        }

    }

    next()
}

