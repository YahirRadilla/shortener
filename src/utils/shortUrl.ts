import { randomBytes } from 'crypto'
import { urlDAL } from '../db/dal/urlDAL'

const generateCode = () => randomBytes(4).toString('hex')

export const generateUniqueShortUrl = async () => {
    let code = ''
    let exists = true

    while (exists) {
        code = generateCode()
        const found = await urlDAL.findOne({ where: { shortUrl: code } })
        exists = !!found
    }

    return code
}