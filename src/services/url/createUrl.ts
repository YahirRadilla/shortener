import { userDAL } from '../../db/dal/userDAL'
import { urlDAL } from '../../db/dal/urlDAL'
import { generateUniqueShortUrl } from '../../utils/shortUrl'
import type { CreateUrlDTO } from '../../types/url.types'

export const createUrl = async ({ email, originalUrl }: CreateUrlDTO) => {
    const user = await userDAL.findOne({ where: { email } })
    if (!user) throw new Error('No existe usuario')

    const shortUrl = await generateUniqueShortUrl()

    const url = urlDAL.create({
        originalUrl,
        shortUrl,
        user,
        isActive: true
    })

    await urlDAL.save(url)

    return { shortUrl }
}