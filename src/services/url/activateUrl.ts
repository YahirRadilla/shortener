import { urlDAL } from '../../db/dal/urlDAL'
import type { ToggleUrlDTO } from '../../types/url.types'

export const activateUrl = async ({ id }: ToggleUrlDTO) => {
    const url = await urlDAL.findOne({ where: { id } })
    if (!url) throw new Error('No existe')

    url.isActive = true
    await urlDAL.save(url)

    return { message: 'Activada' }
}