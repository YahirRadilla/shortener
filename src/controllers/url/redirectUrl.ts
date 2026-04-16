import { urlDAL } from '../../db/dal/urlDAL'
import type { Request, Response } from 'express'

export const redirectUrl = async (req: Request, res: Response) => {
    const { shortUrl } = req.params

    const url = await urlDAL.findOne({ where: { shortUrl: Array.isArray(shortUrl) ? shortUrl[0] : shortUrl } })

    if (!url) return res.status(404).send('No existe')
    if (!url.isActive)
        return res.status(403).send('Desactivada')

    return res.redirect(url.originalUrl)
}